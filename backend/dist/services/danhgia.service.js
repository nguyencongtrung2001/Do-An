import { danhgiaRepository } from '../repositories/danhgia.repository.js';
export const ratingService = {
    async TaoDanhGia(data) {
        const bookingDetail = await danhgiaRepository.TimDatSanChiTiet(data.ma_dat_san_chi_tiet);
        if (!bookingDetail) {
            throw new Error("Chi tiết đặt sân không tồn tại");
        }
        if (bookingDetail.datsan?.ma_nguoi_dung !== data.ma_nguoi_dung) {
            throw new Error("Bạn không có quyền đánh giá đơn đặt sân này");
        }
        const existingRating = await danhgiaRepository.TimDanhGiaCuaNguoiDung(data.ma_nguoi_dung, data.ma_dat_san_chi_tiet);
        if (existingRating) {
            return danhgiaRepository.CapNhatDanhGia(existingRating.ma_danh_gia, data.so_sao);
        }
        const ma_danh_gia = `DG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
        return danhgiaRepository.TaoDanhGia({
            ma_danh_gia,
            ma_nguoi_dung: data.ma_nguoi_dung,
            ma_dat_san_chi_tiet: data.ma_dat_san_chi_tiet,
            so_sao: data.so_sao
        });
    },
    async LayDiemDanhGiaDiaDiem(ma_dia_diem) {
        const ratings = await danhgiaRepository.TimDanhGiaTheoDiaDiem(ma_dia_diem);
        if (ratings.length === 0) {
            return { average: 0, count: 0 };
        }
        const totalStars = ratings.reduce((sum, r) => sum + (r.so_sao || 0), 0);
        const average = totalStars / ratings.length;
        return {
            average: Number(average.toFixed(1)),
            count: ratings.length
        };
    },
    async LayDiemDanhGiaSan(ma_san) {
        const ratings = await danhgiaRepository.TimDanhGiaTheoSan(ma_san);
        if (ratings.length === 0) {
            return { average: 0, count: 0 };
        }
        const totalStars = ratings.reduce((sum, r) => sum + (r.so_sao || 0), 0);
        const average = totalStars / ratings.length;
        return {
            average: Number(average.toFixed(1)),
            count: ratings.length
        };
    },
    async LayDanhGiaCuaToi(ma_nguoi_dung, ma_dat_san_chi_tiet) {
        return danhgiaRepository.TimDanhGiaCuaNguoiDung(ma_nguoi_dung, ma_dat_san_chi_tiet);
    }
};
//# sourceMappingURL=danhgia.service.js.map