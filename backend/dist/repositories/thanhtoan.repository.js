import prisma from '../config/prisma.js';
export class ThanhToanRepository {
    async TimGiaoDichThanhCongTheoDatSan(ma_dat_san) {
        return prisma.giaodich.findFirst({
            where: { ma_dat_san, trang_thai_giao_dich: 'Thành công' },
        });
    }
    async TaoGiaoDichThanhCong(data) {
        return prisma.$transaction(async (tx) => {
            await tx.datsanchitiet.updateMany({
                where: { ma_dat_san: data.ma_dat_san },
                data: { trang_thai_dat: 'Đã xác nhận' },
            });
            const giaodich = await tx.giaodich.create({
                data: {
                    ma_giao_dich: `GD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                    ma_dat_san: data.ma_dat_san,
                    ma_nguoi_dung: data.ma_nguoi_dung,
                    ma_gd_vnpay: data.ma_gd_vnpay,
                    so_tien_tt: data.so_tien_tt,
                    trang_thai_giao_dich: 'Thành công',
                    ngay_tao: new Date(),
                    noi_dung_thanh_toan: data.noi_dung_thanh_toan,
                    ma_ngan_hang: data.ma_ngan_hang,
                    ma_phan_hoi: data.ma_phan_hoi,
                    thoi_gian_tt_vnpay: data.thoi_gian_tt_vnpay,
                },
            });
            return giaodich;
        });
    }
    async CapNhatTrangThaiHuy(ma_dat_san) {
        return prisma.datsanchitiet.updateMany({
            where: { ma_dat_san },
            data: { trang_thai_dat: 'Đã hủy' },
        });
    }
}
export const thanhToanRepository = new ThanhToanRepository();
//# sourceMappingURL=thanhtoan.repository.js.map