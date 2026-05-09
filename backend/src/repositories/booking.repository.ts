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

  async checkSlotsAvailability(slots: { ma_san: string; ngay_dat: Date; gio_bat_dau: Date; gio_ket_thuc: Date }[]) {
    const OR = slots.map(s => ({
      ma_san: s.ma_san,
      ngay_dat: s.ngay_dat,
      gio_bat_dau: { lt: s.gio_ket_thuc },
      gio_ket_thuc: { gt: s.gio_bat_dau },
      trang_thai_dat: { notIn: ["Đã hủy", "Hủy", "Thất bại"] }
    }));

    return prisma.datsanchitiet.findMany({
      where: { OR }
    });
  }

  async createBooking(bookingData: any, detailsData: any[], walletDeduction?: { userId: string, amount: number }) {
    return prisma.$transaction(async (tx) => {
      // 1. Deduct wallet if provided
      if (walletDeduction) {
        const user = await tx.nguoidung.findUnique({
          where: { ma_nguoi_dung: walletDeduction.userId }
        });

        if (!user) throw new Error("Người dùng không tồn tại");
        
        const balance = Number(user.so_vi_du);
        if (balance < walletDeduction.amount) {
          throw new Error("Số dư ví không đủ để thực hiện giao dịch này");
        }

        await tx.nguoidung.update({
          where: { ma_nguoi_dung: walletDeduction.userId },
          data: { so_vi_du: { decrement: walletDeduction.amount } }
        });
      }

      // 2. Create booking
      const newBooking = await tx.datsan.create({
        data: bookingData
      });

      // 3. Create details
      await tx.datsanchitiet.createMany({
        data: detailsData.map(d => ({
          ...d,
          ma_dat_san: newBooking.ma_dat_san
        }))
      });

      return newBooking;
    });
  }

  async findByUserId(userId: string) {
    return prisma.datsan.findMany({
      where: { ma_nguoi_dung: userId },
      include: {
        datsanchitiet: {
          include: {
            san: {
              include: {
                diadiem: true,
                anhsan: true
              }
            }
          }
        }
      },
      orderBy: {
        ngay_tao: 'desc'
      }
    });
  }
}

export const bookingRepository = new BookingRepository();
