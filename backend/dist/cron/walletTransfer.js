import cron from 'node-cron';
import prisma from '../config/prisma.js';
export const initWalletTransferCron = () => {
    cron.schedule('* * * * *', async () => {
        try {
            const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);
            const bookings = await prisma.datsan.findMany({
                where: {
                    phuong_thuc_thanh_toan: "Ví nội bộ",
                    ngay_tao: {
                        lte: thirtyMinsAgo
                    }
                },
                include: {
                    datsanchitiet: {
                        include: {
                            san: {
                                include: {
                                    diadiem: true
                                }
                            }
                        }
                    },
                    giaodich: true
                }
            });
            for (const booking of bookings) {
                const isAllCancelled = booking.datsanchitiet.every(d => d.trang_thai_dat === 'Đã hủy');
                if (isAllCancelled)
                    continue;
                const tongTienCoc = booking.datsanchitiet
                    .filter(d => d.trang_thai_dat !== 'Đã hủy')
                    .reduce((sum, d) => sum + Number(d.tien_coc), 0);
                if (tongTienCoc <= 0)
                    continue;
                const hasTransferred = booking.giaodich.some(gd => gd.noi_dung_thanh_toan === "Chuyển tiền cọc cho chủ sân");
                if (hasTransferred)
                    continue;
                const ownerId = booking.datsanchitiet[0]?.san?.diadiem?.ma_nguoi_dung;
                if (!ownerId)
                    continue;
                await prisma.$transaction(async (tx) => {
                    await tx.nguoidung.update({
                        where: { ma_nguoi_dung: ownerId },
                        data: { so_vi_du: { increment: tongTienCoc } }
                    });
                    await tx.giaodich.create({
                        data: {
                            ma_giao_dich: `GD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
                            ma_dat_san: booking.ma_dat_san,
                            ma_nguoi_dung: ownerId,
                            so_tien_tt: tongTienCoc,
                            trang_thai_giao_dich: "Thành công",
                            noi_dung_thanh_toan: "Chuyển tiền cọc cho chủ sân",
                        }
                    });
                });
                console.log(`[Cron] Đã chuyển ${tongTienCoc} tiền cọc của đơn ${booking.ma_dat_san} cho chủ sân ${ownerId}`);
            }
        }
        catch (error) {
            console.error("[Cron] Lỗi khi chuyển tiền cọc cho chủ sân:", error);
        }
    });
};
//# sourceMappingURL=walletTransfer.js.map