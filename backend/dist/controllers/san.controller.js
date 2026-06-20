import { sanService } from "../services/san.service.js";
import { ApiError } from "../utils/ApiError.js";
export const LayDanhSachSan = async (req, res, next) => {
    try {
        const fields = await sanService.LayDanhSachSan();
        res.status(200).json(fields);
    }
    catch (error) {
        next(error);
    }
};
export const LayDiaDiemTrenBanDo = async (req, res, next) => {
    try {
        const sportType = req.query.sport || 'all';
        const locations = await sanService.LayDiaDiemTrenBanDo(sportType);
        res.status(200).json(locations);
    }
    catch (error) {
        next(error);
    }
};
export const LayDiaDiemTheoSlug = async (req, res, next) => {
    try {
        const slug = req.params.slug;
        const location = await sanService.LayDiaDiemTheoSlug(slug);
        if (!location) {
            throw new ApiError(404, "Không tìm thấy địa điểm");
        }
        res.status(200).json(location);
    }
    catch (error) {
        next(error);
    }
};
export const LayKhungGioDaDat = async (req, res, next) => {
    try {
        const ma_san = req.params.ma_san;
        const ngay_dat = req.query.ngay_dat;
        if (!ngay_dat) {
            throw new ApiError(400, "Thiếu tham số ngay_dat");
        }
        const bookedSlots = await sanService.LayKhungGioDaDat(ma_san, ngay_dat);
        res.status(200).json({ success: true, data: bookedSlots });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=san.controller.js.map