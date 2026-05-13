import bcrypt from "bcryptjs";
import { ApiError } from '../utils/ApiError.js';
import { userRepository } from '../repositories/user.repository.js';
import { locationRepository } from '../repositories/location.repository.js';
export class AdminService {
    // ── Users ──────────────────────────────────────────────
    async getAllUsers() {
        return userRepository.findAll();
    }
    async getUserById(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }
    async toggleUserStatus(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        const newStatus = !user.trang_thai;
        const updatedUser = await userRepository.updateStatus(id, newStatus);
        // Nếu tài khoản bị khóa (false) và là Chủ sân, thì khóa luôn tất cả địa điểm của họ
        if (!newStatus && user.vai_tro === 'Chủ sân') {
            await locationRepository.updateStatusByOwnerId(id, false);
        }
        return updatedUser;
    }
    async deleteUser(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        return userRepository.delete(id);
    }
    // ── Owner Approval ────────────────────────────────────
    async getPendingOwners() {
        return userRepository.findOwnersPending();
    }
    async approveOwner(id) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        if (user.vai_tro !== 'Chủ sân') {
            throw new ApiError(400, "Người dùng này không phải chủ sân");
        }
        return userRepository.approveOwner(id);
    }
    async createOwner(data) {
        const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau } = data;
        const existingUser = await userRepository.findByEmailOrPhone(email, so_dien_thoai);
        if (existingUser) {
            if (existingUser.email === email) {
                throw new ApiError(400, "Email đã tồn tại trong hệ thống");
            }
            if (existingUser.so_dien_thoai === so_dien_thoai) {
                throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
            }
        }
        const newId = await userRepository.generateNextUserId();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mat_khau, salt);
        return userRepository.create({
            ma_nguoi_dung: newId,
            ho_ten,
            email,
            so_dien_thoai,
            mat_khau: hashedPassword,
            anh_cccd_truoc,
            anh_cccd_sau,
            trang_thai: false,
        });
    }
    // ── Location Approval ─────────────────────────────────
    async getAllLocations() {
        return locationRepository.findAll();
    }
    async getPendingLocations() {
        return locationRepository.findPending();
    }
    async approveLocation(id) {
        return locationRepository.approve(id);
    }
    async rejectLocation(id) {
        return locationRepository.reject(id);
    }
}
export const adminService = new AdminService();
//# sourceMappingURL=admin.service.js.map