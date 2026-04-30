import bcrypt from 'bcryptjs';
import type { CreateOwner } from '../types/owner.type.js';
import { ApiError } from '../utils/ApiError.js';
import { generateToken } from '../utils/jwt.js';
import { userRepository } from '../repositories/user.repository.js';
import { locationRepository } from '../repositories/location.repository.js';
import { courtRepository } from '../repositories/court.repository.js';
import { bookingRepository } from '../repositories/booking.repository.js';
import prisma from '../config/prisma.js';

export class OwnerService {
  async registerOwner(data: CreateOwner) {
    const { ho_ten, email, so_dien_thoai, mat_khau, anh_cccd_truoc, anh_cccd_sau, ten_dia_diem, dia_chi } = data;

    // 1. Check if email or phone already exists
    const existingUser = await userRepository.findByEmailOrPhone(email, so_dien_thoai);

    if (existingUser) {
      if (existingUser.email === email) throw new ApiError(400, "Email đã tồn tại trong hệ thống");
      if (existingUser.so_dien_thoai === so_dien_thoai) throw new ApiError(400, "Số điện thoại đã tồn tại trong hệ thống");
    }

    // 2. Generate next IDs
    const newUserId = await userRepository.generateNextUserId();
    const newLocationId = await locationRepository.generateNextLocationId();

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(mat_khau, salt);

    // 4. Transaction: Save User and Location atomically
    const result = await prisma.$transaction(async (tx) => {
      const user = await tx.nguoidung.create({
        data: {
          ma_nguoi_dung: newUserId,
          ho_ten,
          email,
          so_dien_thoai,
          mat_khau: hashedPassword,
          vai_tro: "Chủ sân",
          trang_thai: false, // Wait for admin approval
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

    // 5. Return token and user info
    const token = generateToken({ id: result.user.ma_nguoi_dung, role: result.user.vai_tro });
    return { user: result.user, location: result.location, token };
  }

  async getMyCourts(userId: string) {
    const locations = await locationRepository.findByOwnerId(userId);
    const allCourts = locations.flatMap(loc => loc.san);
    return allCourts;
  }

  async addCourt(userId: string, data: any, images: { url: string; public_id: string }[]) {
    const { ten_san, loai_the_thao, gia_thue_30p, trang_thai_san } = data;

    // 1. Find owner's location
    const location = await locationRepository.findFirstByOwnerId(userId);

    if (!location) {
      throw new ApiError(404, "Không tìm thấy địa điểm của bạn. Vui lòng liên hệ admin.");
    }

    // 2. Generate next court ID
    const newSanId = await courtRepository.generateNextCourtId();

    // 3. Create court and images in transaction
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

    // Check if court belongs to this owner
    const court = await courtRepository.findByIdAndOwnerId(maSan, userId);

    if (!court) {
      throw new ApiError(404, "Không tìm thấy sân hoặc bạn không có quyền chỉnh sửa.");
    }

    return courtRepository.update(maSan, {
      ten_san,
      loai_the_thao,
      gia_thue_30p: parseFloat(gia_thue_30p),
      trang_thai_san
    });
  }

  async getMyBookings(userId: string) {
    return bookingRepository.findByOwnerId(userId);
  }

  async updateBookingStatus(userId: string, bookingDetailId: string, status: string) {
    // Check if booking belongs to this owner
    const booking = await bookingRepository.findByIdAndOwnerId(bookingDetailId, userId);

    if (!booking) {
      throw new ApiError(404, "Không tìm thấy lịch đặt hoặc bạn không có quyền.");
    }

    return bookingRepository.updateStatus(bookingDetailId, status);
  }
}

export const ownerService = new OwnerService();
