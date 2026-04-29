import prisma from '../config/prisma.js';
import bcrypt from 'bcryptjs';
import type { CreateOwner } from '../typescript/owner.type.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';

export class OwnerService {
  async registerOwner(data: CreateOwner) {
    const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau, ten_dia_diem, dia_chi } = data;

    // 1. Kiểm tra email hoặc sđt đã tồn tại chưa
    const existingUser = await prisma.nguoidung.findFirst({
      where: {
        OR: [{ email }, { so_dien_thoai }]
      }
    });

    if (existingUser) {
      if (existingUser.email === email) throw new ApiError(400, "Email đã tồn tại trong hệ thống");
      if (existingUser.so_dien_thoai === so_dien_thoai) throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
    }

    // 2. Tạo mã người dùng (U001, U002...)
    const lastUser = await prisma.nguoidung.findFirst({
      orderBy: { ma_nguoi_dung: 'desc' }
    });
    let newUserId = "U001";
    if (lastUser && lastUser.ma_nguoi_dung.startsWith("U")) {
      const lastNumber = parseInt(lastUser.ma_nguoi_dung.replace("U", ""), 10);
      if (!isNaN(lastNumber)) newUserId = `U${String(lastNumber + 1).padStart(3, '0')}`;
    }

    // 3. Tạo mã địa điểm (DD001, DD002...)
    const lastLocation = await prisma.diadiem.findFirst({
      orderBy: { ma_dia_diem: 'desc' }
    });
    let newLocationId = "DD001";
    if (lastLocation && lastLocation.ma_dia_diem.startsWith("DD")) {
      const lastLocNumber = parseInt(lastLocation.ma_dia_diem.replace("DD", ""), 10);
      if (!isNaN(lastLocNumber)) newLocationId = `DD${String(lastLocNumber + 1).padStart(3, '0')}`;
    }

    // 4. Mã hóa mật khẩu
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    // 5. Transaction: Lưu User và Diadiem đồng thời
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.nguoidung.create({
        data: {
          ma_nguoi_dung: newUserId,
          ho_ten,
          email,
          so_dien_thoai,
          mat_khau: hashedPassword,
          vai_tro: "Chủ sân",
          trang_thai: false, // Chờ admin duyệt
          anh_cccd_truoc,
          anh_cccd_sau
        }
      });

      const location = await tx.diadiem.create({
        data: {
          ma_dia_diem: newLocationId,
          ten_dia_diem,
          dia_chi,
          kinh_do: 108.2022,
          vi_do: 16.0544,
          ma_nguoi_dung: newUserId
        }
      });

      return { user, location };
    });

    // 6. Trả về token và thông tin user
    const token = generateToken({ id: result.user.ma_nguoi_dung, role: result.user.vai_tro });
    return { user: result.user, location: result.location, token };
  }
}

export const ownerService = new OwnerService();
