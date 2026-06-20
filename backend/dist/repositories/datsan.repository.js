import prisma from '../config/prisma.js';
export class BookingRepository {
    async TimTheoChuSan(userId) {
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
    async TimTheoIdVaChuSan(bookingDetailId, userId) {
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
    async CapNhatTrangThai(bookingDetailId, status) {
        return prisma.datsanchitiet.update({
            where: { ma_dat_san_chi_tiet: bookingDetailId },
            data: { trang_thai_dat: status }
        });
    }
    async DemChoXuLyTheoChuSan(userId) {
        return prisma.datsanchitiet.count({
            where: {
                trang_thai_dat: { in: ["Chờ xử lý", "Đã hủy"] },
                san: {
                    diadiem: {
                        ma_nguoi_dung: userId
                    }
                }
            }
        });
    }
    async KiemTraKhungGioTrong(slots) {
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
    async TaoDonDatSan(bookingData, detailsData, walletDeduction) {
        return prisma.$transaction(async (tx) => {
            if (walletDeduction) {
                const user = await tx.nguoidung.findUnique({
                    where: { ma_nguoi_dung: walletDeduction.userId }
                });
                if (!user)
                    throw new Error("Người dùng không tồn tại");
                const balance = Number(user.so_vi_du);
                if (balance < walletDeduction.amount) {
                    throw new Error("Số dư ví không đủ để thực hiện giao dịch này");
                }
                await tx.nguoidung.update({
                    where: { ma_nguoi_dung: walletDeduction.userId },
                    data: { so_vi_du: { decrement: walletDeduction.amount } }
                });
            }
            const newBooking = await tx.datsan.create({
                data: bookingData
            });
            await tx.datsanchitiet.createMany({
                data: detailsData.map(d => ({
                    ...d,
                    ma_dat_san: newBooking.ma_dat_san
                }))
            });
            return newBooking;
        });
    }
    async TimTheoNguoiDung(userId) {
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
    async HuyDonVaHoanTien(bookingId, userId, refundAmount) {
        return prisma.$transaction(async (tx) => {
            await tx.datsanchitiet.updateMany({
                where: { ma_dat_san: bookingId },
                data: { trang_thai_dat: "Đã hủy" }
            });
            if (refundAmount > 0) {
                await tx.nguoidung.update({
                    where: { ma_nguoi_dung: userId },
                    data: { so_vi_du: { increment: refundAmount } }
                });
                await tx.giaodich.create({
                    data: {
                        ma_giao_dich: `RF_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                        ma_dat_san: bookingId,
                        ma_nguoi_dung: userId,
                        so_tien_tt: refundAmount,
                        noi_dung_thanh_toan: "Hoàn tiền hủy đặt sân",
                        trang_thai_giao_dich: "Thành công",
                        ngay_tao: new Date()
                    }
                });
            }
            return { success: true };
        });
    }
}
export const bookingRepository = new BookingRepository();
//# sourceMappingURL=datsan.repository.js.map