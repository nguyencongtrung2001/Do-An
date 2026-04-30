import bcrypt from "bcryptjs";
import type { CreateOwner } from "../types/owner.type.js";
import { ApiError } from '../utils/ApiError.js';
import { userRepository } from '../repositories/user.repository.js';

export class AdminService {
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

    async createOwner(data: CreateOwner) {
        const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau } = data;

        // 1. Check if email or phone already exists
        const existingUser = await userRepository.findByEmailOrPhone(email, so_dien_thoai);

        if (existingUser) {
            if (existingUser.email === email) {
                throw new ApiError(400, "Email đã tồn tại trong hệ thống");
            }
            if (existingUser.so_dien_thoai === so_dien_thoai) {
                throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
            }
        }

        // 2. Generate next user ID
        const newId = await userRepository.generateNextUserId();

        // 3. Hash password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mat_khau, salt);

        // 4. Save to database via repository
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
}
export const adminService = new AdminService();
