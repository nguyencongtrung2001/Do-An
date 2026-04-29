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

  async getMyCourts(userId: string) {
    // 1. Tìm các địa điểm của owner này
    const locations = await prisma.diadiem.findMany({
      where: { ma_nguoi_dung: userId },
      include: {
        san: {
          include: {
            anhsan: true
          }
        }
      }
    });

    // 2. Gộp tất cả các sân từ các địa điểm
    const allCourts = locations.flatMap(loc => loc.san);
    return allCourts;
  }

  async addCourt(userId: string, data: any, images: { url: string; public_id: string }[]) {
    const { ten_san, loai_the_thao, gia_thue_30p, trang_thai_san } = data;

    // 1. Tìm địa điểm đầu tiên của owner này (giả sử họ đang quản lý địa điểm này)
    const location = await prisma.diadiem.findFirst({
      where: { ma_nguoi_dung: userId }
    });

    if (!location) {
      throw new ApiError(404, "Không tìm thấy địa điểm của bạn. Vui lòng liên hệ admin.");
    }

    // 2. Tạo mã sân (S001, S002...)
    const lastSan = await prisma.san.findFirst({
      orderBy: { ma_san: 'desc' }
    });
    let newSanId = "S001";
    if (lastSan && lastSan.ma_san.startsWith("S")) {
      const lastNumber = parseInt(lastSan.ma_san.replace("S", ""), 10);
      if (!isNaN(lastNumber)) newSanId = `S${String(lastNumber + 1).padStart(3, '0')}`;
    }

    // 3. Tạo sân và ảnh sân
    return prisma.$transaction(async (tx) => {
      const san = await tx.san.create({
        data: {
          ma_san: newSanId,
          ma_dia_diem: location.ma_dia_diem,
          ten_san,
          loai_the_thao,
          gia_thue_30p: parseFloat(gia_thue_30p),
          trang_thai_san: trang_thai_san || "Đang hoạt động"
        }
      });

      if (images && images.length > 0) {
        await tx.anhsan.createMany({
          data: images.map(img => ({
            ma_anh_san: `IMG_${Math.random().toString(36).substr(2, 9)}`,
            ma_san: newSanId,
            duong_dan_anh: img.url,
            ma_cloudinary: img.public_id || "manual_upload"
          }))
        });
      }

      return san;
    });
  }

  async updateCourt(userId: string, maSan: string, data: any) {
    const { ten_san, loai_the_thao, gia_thue_30p, trang_thai_san } = data;

    // Kiểm tra xem sân có thuộc về owner này không
    const court = await prisma.san.findFirst({
      where: {
        ma_san: maSan,
        diadiem: { ma_nguoi_dung: userId }
      }
    });

    if (!court) {
      throw new ApiError(404, "Không tìm thấy sân hoặc bạn không có quyền chỉnh sửa.");
    }

    return prisma.san.update({
      where: { ma_san: ma_san },
      data: {
        ten_san,
        loai_the_thao,
        gia_thue_30p: parseFloat(gia_thue_30p),
        trang_thai_san
      }
    });
  }

  async getMyBookings(userId: string) {
    return prisma.datsanchitiet.findMany({
      where: {
        san: {
          diadiem: {
            ma_nguoi_dung: userId
          }
        }
      },
      include: {
        san: true,
        datsan: {
          include: {
            nguoidung: true
          }
        }
      },
      orderBy: {
        ngay_dat: 'desc'
      }
    });
  }

  async updateBookingStatus(userId: string, bookingDetailId: string, status: string) {
    // Kiểm tra xem booking này có thuộc về owner này không
    const booking = await prisma.datsanchitiet.findFirst({
      where: {
        ma_dat_san_chi_tiet: bookingDetailId,
        san: {
          diadiem: {
            ma_nguoi_dung: userId
          }
        }
      }
    });

    if (!booking) {
      throw new ApiError(404, "Không tìm thấy lịch đặt hoặc bạn không có quyền.");
    }

    return prisma.datsanchitiet.update({
      where: { ma_dat_san_chi_tiet: bookingDetailId },
      data: { trang_thai_dat: status }
    });
  }
}

export const ownerService = new OwnerService();
