import prisma from '../config/prisma.js';

export class BookingRepository {
  async findByOwnerId(userId: string) {
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

  async findByIdAndOwnerId(bookingDetailId: string, userId: string) {
    return prisma.datsanchitiet.findFirst({
      where: {
        ma_dat_san_chi_tiet: bookingDetailId,
        san: {
          diadiem: {
            ma_nguoi_dung: userId
          }
        }
      }
    });
  }

  async updateStatus(bookingDetailId: string, status: string) {
    return prisma.datsanchitiet.update({
      where: { ma_dat_san_chi_tiet: bookingDetailId },
      data: { trang_thai_dat: status }
    });
  }
}

export const bookingRepository = new BookingRepository();
