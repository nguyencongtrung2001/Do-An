import bcrypt from "bcryptjs";
import prisma from "../config/prisma.js";
import type { CreateOwner } from "../typescript/owner.type.js";
import { ApiError } from '../utils/ApiError.js';

export class AdminService {
    async getAllUsers() {
        return prisma.nguoidung.findMany();
    }

    async getUserById(id: string) {
    const user = await prisma.nguoidung.findUnique({
      where: { ma_nguoi_dung: id }
    });

    if (!user) {
      throw new ApiError(404, "User not found");
    }

    return user;
  }

  async createOwner(data:CreateOwner) {
    const {ho_ten,email,so_dien_thoai,mat_khau,anh_cccd_truoc,anh_cccd_sau} = data;

    // 1. kiểm tra email hoặc sdt đã tồn tại
    const existingUser = await prisma.nguoidung.findFirst({
      where: {
        OR: [
          { email },
          { so_dien_thoai }
        ]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) {
        throw new ApiError(400, "Email đã tồn tại trong hệ thống");
      }
      if (existingUser.so_dien_thoai === so_dien_thoai) {
        throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
      }
    }

    // 2. tạo id như U001, U002...
    const lastUser = await prisma.nguoidung.findFirst({
      orderBy: { ma_nguoi_dung: 'desc' }
    });

    let newId = "U001";
    if (lastUser && lastUser.ma_nguoi_dung.startsWith("U")) {
      const lastNumber = parseInt(lastUser.ma_nguoi_dung.replace("U", ""), 10);
      if (!isNaN(lastNumber)) {
        newId = `U${String(lastNumber + 1).padStart(3, '0')}`;
      }
    }

    // 3. mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    // 4. lưu vào database
    return prisma.nguoidung.create({
      data: {
        ma_nguoi_dung: newId,
        ho_ten,
        email,
        so_dien_thoai,
        mat_khau: hashedPassword,
        anh_cccd_truoc:anh_cccd_truoc,
        anh_cccd_sau:anh_cccd_sau,
        trang_thai: false,
      }
    });
  }
}
export const adminService = new AdminService();