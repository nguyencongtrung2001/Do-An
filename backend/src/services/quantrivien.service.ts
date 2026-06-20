import bcrypt from "bcryptjs";
import type { CreateOwner } from "../types/owner.type.js";
import { ApiError } from '../utils/ApiError.js';
import { userRepository } from '../repositories/nguoidung.repository.js';
import { locationRepository } from '../repositories/diadiem.repository.js';

export class AdminService {
    

    async LayTatCaNguoiDung() {
        return userRepository.LayTatCa();
    }

    async LayNguoiDungTheoId(id: string) {
        const user = await userRepository.TimTheoId(id);
        if (!user) {
            throw new ApiError(404, "User not found");
        }
        return user;
    }

    async DoiTrangThaiNguoiDung(id: string) {
        const user = await userRepository.TimTheoId(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        const newStatus = !user.trang_thai;
        
        const updatedUser = await userRepository.CapNhatTrangThai(id, newStatus);

        
        if (!newStatus && user.vai_tro === 'Chủ sân') {
            await locationRepository.CapNhatTrangThaiTheoChuSan(id, false);
        }

        return updatedUser;
    }

    async XoaNguoiDung(id: string) {
        const user = await userRepository.TimTheoId(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        return userRepository.Xoa(id);
    }

    

    async LayChuSanChoDuyet() {
        return userRepository.TimChuSanChoDuyet();
    }

    async DuyetChuSan(id: string) {
        const user = await userRepository.TimTheoId(id);
        if (!user) {
            throw new ApiError(404, "Không tìm thấy người dùng");
        }
        if (user.vai_tro !== 'Chủ sân') {
            throw new ApiError(400, "Người dùng này không phải chủ sân");
        }
        return userRepository.DuyetChuSan(id);
    }

    async TaoChuSan(data: CreateOwner) {
        const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau } = data;

        const existingUser = await userRepository.TimTheoEmailHoacSdt(email, so_dien_thoai);
        if (existingUser) {
            if (existingUser.email === email) {
                throw new ApiError(400, "Email đã tồn tại trong hệ thống");
            }
            if (existingUser.so_dien_thoai === so_dien_thoai) {
                throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
            }
        }

        const newId = await userRepository.TaoMaNguoiDungTiepTheo();
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(mat_khau, salt);

        return userRepository.TaoMoi({
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

    

    async LayTatCaDiaDiem() {
        return locationRepository.LayTatCa();
    }

    async LayDiaDiemChoDuyet() {
        return locationRepository.TimChoDuyet();
    }

    async DuyetDiaDiem(id: string) {
        return locationRepository.Duyet(id);
    }

    async TuChoiDiaDiem(id: string, mo_ta?: string) {
        return locationRepository.TuChoi(id, mo_ta);
    }
}

export const adminService = new AdminService();
