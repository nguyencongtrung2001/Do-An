import bcrypt from 'bcryptjs';
import type { CreateOwner } from '../types/chusan.type.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/nguoidung.repository.js';
import { locationRepository } from '../repositories/diadiem.repository.js';
import { courtRepository } from '../repositories/san.repository.js';
import { bookingRepository } from '../repositories/datsan.repository.js';
import prisma from '../config/prisma.js';
import cloudinary from '../config/cloudinary.config.js';

export class OwnerService {
  async DangKyChuSan(data: CreateOwner) {
    const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau, ten_dia_diem, dia_chi, kinh_do, vi_do, anh_dai_dien } = data;

    
    const existingUser = await userRepository.TimTheoEmailHoacSdt(email, so_dien_thoai);

    if (existingUser) {
      if (existingUser.email === email) throw new ApiError(400, "Email đã tồn tại");
      if (existingUser.so_dien_thoai === so_dien_thoai) throw new ApiError(400, "Số điện thoại đã tồn tại");
    }

    
    const newUserId = await userRepository.TaoMaNguoiDungTiepTheo();
    const newLocationId = await locationRepository.TaoMaDiaDiemTiepTheo();

    
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.nguoidung.create({
        data: {
          ma_nguoi_dung: newUserId,
          ho_ten,
          email,
          so_dien_thoai,
          mat_khau: hashedPassword,
          vai_tro: "Chủ sân",
          trang_thai: false, 
          anh_cccd_truoc,
          anh_cccd_sau,
          anh_dai_dien: anh_dai_dien || null
        }
      });

      const location = await tx.diadiem.create({
        data: {
          ma_dia_diem: newLocationId,
          ten_dia_diem,
          dia_chi,
          kinh_do,
          vi_do,
          ma_nguoi_dung: newUserId
        }
      });

      return { user, location };
    });

    
    const token = generateToken({ id: result.user.ma_nguoi_dung, role: result.user.vai_tro });
    return { user: result.user, location: result.location, token };
  }

  async LaySanCuaToi(userId: string) {
    const locations = await locationRepository.TimTheoChuSan(userId);
    const allCourts = locations.flatMap(loc => loc.san);
    return allCourts;
  }

  async ThemSan(userId: string, data: any, images: { url: string; public_id: string }[]) {
    const { ten_san, loai_the_thao, gia_thue_30p, trang_thai_san } = data;

    
    const user = await userRepository.TimTheoId(userId);
    if (!user || !user.trang_thai) {
      throw new ApiError(403, "Tài khoản của bạn chưa được duyệt, không thể thêm sân.");
    }

    
    const location = await locationRepository.TimDauTienTheoChuSan(userId);

    if (!location) {
      throw new ApiError(404, "Không tìm thấy địa điểm của bạn. Vui lòng liên hệ admin.");
    }
    
    if (!location.trang_thai_duyet) {
      throw new ApiError(403, "Địa điểm của bạn chưa được duyệt, không thể thêm sân.");
    }

    
    const newSanId = await courtRepository.TaoMaSanTiepTheo();

    
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
        
        const lastImg = await tx.anhsan.findFirst({ orderBy: { ma_anh_san: 'desc' } });
        let nextNum = 1;
        if (lastImg && lastImg.ma_anh_san.startsWith("IMG")) {
          const parsed = parseInt(lastImg.ma_anh_san.replace("IMG", ""), 10);
          if (!isNaN(parsed)) nextNum = parsed + 1;
        }

        await tx.anhsan.createMany({
          data: images.map((img, idx) => ({
            ma_anh_san: `IMG${String(nextNum + idx).padStart(3, '0')}`,
            ma_san: newSanId,
            duong_dan_anh: img.url,
            ma_cloudinary: img.public_id || "manual_upload"
          }))
        });
      }

      return san;
    });
  }

  async CapNhatSan(userId: string, maSan: string, data: any, images?: { url: string; public_id: string }[]) {
    const { ten_san, loai_the_thao, gia_thue_30p, trang_thai_san } = data;


    const court = await courtRepository.TimTheoIdVaChuSan(maSan, userId);

    if (!court) {
      throw new ApiError(404, "Không tìm thấy sân hoặc bạn không có quyền chỉnh sửa.");
    }

    let oldImages: { ma_cloudinary: string }[] = [];
    if (images && images.length > 0) {
      oldImages = await courtRepository.TimAnhTheoSan(maSan);
    }


    const updatedCourt = await prisma.$transaction(async (tx) => {
      const updated = await tx.san.update({
        where: { ma_san: maSan },
        data: {
          ten_san,
          loai_the_thao,
          gia_thue_30p: gia_thue_30p !== undefined ? parseFloat(gia_thue_30p) : undefined,
          trang_thai_san: trang_thai_san ? trang_thai_san.trim() : undefined
        }
      });

      if (images && images.length > 0) {

        await tx.anhsan.deleteMany({ where: { ma_san: maSan } });


        const lastImg = await tx.anhsan.findFirst({ orderBy: { ma_anh_san: 'desc' } });
        let nextNum = 1;
        if (lastImg && lastImg.ma_anh_san.startsWith("IMG")) {
          const parsed = parseInt(lastImg.ma_anh_san.replace("IMG", ""), 10);
          if (!isNaN(parsed)) nextNum = parsed + 1;
        }

        await tx.anhsan.createMany({
          data: images.map((img, idx) => ({
            ma_anh_san: `IMG${String(nextNum + idx).padStart(3, '0')}`,
            ma_san: maSan,
            duong_dan_anh: img.url,
            ma_cloudinary: img.public_id || "manual_upload"
          }))
        });
      }

      return updated;
    });

   
    if (oldImages.length > 0) {
      await Promise.all(
        oldImages
          .filter(img => img.ma_cloudinary && img.ma_cloudinary !== "manual_upload")
          .map(img =>cloudinary.uploader.destroy(img.ma_cloudinary).catch(() => null))
      );
    }

    return updatedCourt;
  }

  async XoaSan(userId: string, maSan: string) {
    const court = await courtRepository.TimTheoIdVaChuSan(maSan, userId);
    if (!court) {
      throw new ApiError(404, "Không tìm thấy sân hoặc bạn không có quyền xóa.");
    }

    const activeBookings = await prisma.datsanchitiet.count({
      where: {
        ma_san: maSan,
        trang_thai_dat: { in: ['Chờ xử lý', 'Đã xác nhận'] },
        ngay_dat: { gte: new Date() }
      }
    });

    if (activeBookings > 0) {
      throw new ApiError(400, "Không thể xóa sân đang có đơn đặt chưa hoàn thành.");
    }

    return courtRepository.CapNhat(maSan, { trang_thai_san: "Đã xóa" });
  }

  async LayLichDatCuaToi(userId: string) {
    return bookingRepository.TimTheoChuSan(userId);
  }

  async CapNhatTrangThaiDatSan(userId: string, bookingDetailId: string, status: string) {
   
    const booking = await bookingRepository.TimTheoIdVaChuSan(bookingDetailId, userId);

    if (!booking) {
      throw new ApiError(404, "Không tìm thấy lịch đặt hoặc bạn không có quyền.");
    }

    return bookingRepository.CapNhatTrangThai(bookingDetailId, status);
  }

  async LaySoLuongChoXuLy(userId: string) {
    return bookingRepository.DemChoXuLyTheoChuSan(userId);
  }
}

export const ownerService = new OwnerService();
