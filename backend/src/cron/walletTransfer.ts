import cron from 'node-cron';
import prisma from '../config/prisma.js';

export const initWalletTransferCron = () => {
  // Chạy mỗi phút 1 lần
  cron.schedule('* * * * *', async () => {
    try {
      const thirtyMinsAgo = new Date(Date.now() - 30 * 60 * 1000);

      // Tìm các đơn đặt sân thanh toán bằng Ví nội bộ, tạo cách đây >= 30 phút
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
          giaodich: true // Lấy giao dịch để check xem đã chuyển cho chủ sân chưa
        }
      });

      for (const booking of bookings) {
        // Kiểm tra xem đơn đã bị hủy toàn bộ chưa
        const isAllCancelled = booking.datsanchitiet.every(d => d.trang_thai_dat === 'Đã hủy');
        if (isAllCancelled) continue;

        // Tính tổng tiền cọc từ các chi tiết không bị hủy
        const tongTienCoc = booking.datsanchitiet
          .filter(d => d.trang_thai_dat !== 'Đã hủy')
          .reduce((sum, d) => sum + Number(d.tien_coc), 0);

        if (tongTienCoc <= 0) continue;

        // Check xem đã có giao dịch chuyển tiền cho chủ sân ứng với đơn này chưa
        const hasTransferred = booking.giaodich.some(
          gd => gd.noi_dung_thanh_toan === "Chuyển tiền cọc cho chủ sân"
        );

        if (hasTransferred) continue;

        // Tìm mã người dùng của chủ sân
        const ownerId = booking.datsanchitiet[0]?.san?.diadiem?.ma_nguoi_dung;
        if (!ownerId) continue;

        // Thực hiện chuyển tiền cho chủ sân bằng transaction
        await prisma.$transaction(async (tx) => {
          // Cộng tiền vào ví chủ sân
          await tx.nguoidung.update({
            where: { ma_nguoi_dung: ownerId },
            data: { so_vi_du: { increment: tongTienCoc } }
          });

          // Tạo record giao dịch để đánh dấu đã chuyển
          await tx.giaodich.create({
            data: {
              ma_giao_dich: `GD_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
              ma_dat_san: booking.ma_dat_san,
              ma_nguoi_dung: ownerId,
              so_tien_tt: tongTienCoc,
              trang_thai_giao_dich: "Hoàn thành",
              noi_dung_thanh_toan: "Chuyển tiền cọc cho chủ sân",
            }
          });
        });

        console.log(`[Cron] Đã chuyển ${tongTienCoc} tiền cọc của đơn ${booking.ma_dat_san} cho chủ sân ${ownerId}`);
      }
    } catch (error) {
      console.error("[Cron] Lỗi khi chuyển tiền cọc cho chủ sân:", error);
    }
  });
};
