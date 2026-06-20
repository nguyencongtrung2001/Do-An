import bcrypt from 'bcryptjs';
import type * as User from '../types/user.type.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/nguoidung.repository.js';
import cloudinary from '../config/cloudinary.config.js';
import prisma from '../config/prisma.js';

export class UserService {
  async DangKyNguoiDung(data: User.UserClient) {
    const { ho_ten, email, so_dien_thoai, mat_khau } = data;

    
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

    
    const user = await userRepository.TaoMoi({
      ma_nguoi_dung: newId,
      ho_ten,
      email,
      so_dien_thoai,
      mat_khau: hashedPassword,
      trang_thai: true,
    });

    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });
    return { user, token };
  }

  async DangNhapNguoiDung(data: User.LoginUserClient) {
    const { so_dien_thoai, email, mat_khau } = data;
    console.log("Login attempt for email:", email);

    const user = await userRepository.TimTheoEmailHoacSdt(email, so_dien_thoai);

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    
    if (user.ma_google && !user.mat_khau) {
      throw new ApiError(400, "Tài khoản này được đăng ký qua Google. Vui lòng đăng nhập bằng Google");
    }

    if (!user.mat_khau) {
      throw new ApiError(400, "Tài khoản chưa được thiết lập mật khẩu (có thể đăng nhập bằng phương thức khác).");
    }

    const isMatch = await bcrypt.compare(mat_khau, user.mat_khau);
    if (!isMatch) {
      throw new ApiError(400, "Invalid password");
    }

    const token = generateToken({ id: user.ma_nguoi_dung, role: user.vai_tro });

    return { user, token };
  }

  async LayThongTinCaNhan(userId: string) {
    const user = await prisma.nguoidung.findUnique({
      where: { ma_nguoi_dung: userId },
      include: { diadiem: true }
    });
    if (!user) {
      throw new ApiError(404, "Không tìm thấy người dùng");
    }

    
    return {
      ma_nguoi_dung: user.ma_nguoi_dung,
      ho_ten: user.ho_ten,
      email: user.email,
      so_dien_thoai: user.so_dien_thoai,
      vai_tro: user.vai_tro,
      anh_dai_dien: user.anh_dai_dien,
      so_vi_du: user.so_vi_du,
      ngay_tao: user.ngay_tao,
      trang_thai: user.trang_thai,
      diadiem: user.diadiem,
    };
  }

  async CapNhatAnhDaiDien(userId: string, avatarUrl: string, cloudinaryId: string) {
    const user = await userRepository.TimTheoId(userId);
    if (!user) {
      throw new ApiError(404, "Không tìm thấy người dùng");
    }

    
    if (user.anh_cloudinary) {
      try {
        await cloudinary.uploader.destroy(user.anh_cloudinary);
      } catch (err) {
        console.warn("Could not delete old avatar from Cloudinary:", err);
      }
    }

    
    const updatedUser = await userRepository.CapNhat(userId, {
      anh_dai_dien: avatarUrl,
      anh_cloudinary: cloudinaryId,
    });

    return {
      ma_nguoi_dung: updatedUser.ma_nguoi_dung,
      ho_ten: updatedUser.ho_ten,
      email: updatedUser.email,
      so_dien_thoai: updatedUser.so_dien_thoai,
      vai_tro: updatedUser.vai_tro,
      anh_dai_dien: updatedUser.anh_dai_dien,
      so_vi_du: updatedUser.so_vi_du,
      ngay_tao: updatedUser.ngay_tao,
    };
  }
}

export const userService = new UserService();
