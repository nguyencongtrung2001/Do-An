import bcrypt from "bcryptjs";
import type { CreateOwner } from "../types/owner.type.js";
import { ApiError } from '../utils/ApiError.js';
import { userRepository } from '../repositories/user.repository.js';
import { locationRepository } from '../repositories/location.repository.js';

export class AdminService {
    // ── Users ──────────────────────────────────────────────

    async getAllUsers() {
        return userRepository.findAll();
    }

    async getUserById(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }

    async toggleUserStatus(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        const newStatus = !user.trang_thai;
        return userRepository.updateStatus(id, newStatus);
    }

    // ── Owner Approval ────────────────────────────────────

    async getPendingOwners() {
        return userRepository.findOwnersPending();
    }

    async approveOwner(id: string) {
        const user = await userRepository.findById(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        if (user.vai_tro !== 'Chủ sân') {
            throw new ApiError(400, "Người dùng này không phải chủ sân");
        }
        return userRepository.approveOwner(id);
    }

    async createOwner(data: CreateOwner) {
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

    async approveLocation(id: string) {
        return locationRepository.approve(id);
    }

    async rejectLocation(id: string) {
        return locationRepository.reject(id);
    }
}

export const adminService = new AdminService();
