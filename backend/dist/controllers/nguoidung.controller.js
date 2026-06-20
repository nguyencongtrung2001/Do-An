import { userService } from '../services/nguoidung.service.js';
import { ApiError } from '../utils/ApiError.js';
import cloudinary from '../config/cloudinary.config.js';
export const DangKyNguoiDung = async (req, res) => {
    const user = await userService.DangKyNguoiDung(req.body);
    res.status(201).json(user);
};
export const DangNhapNguoiDung = async (req, res) => {
    const user = await userService.DangNhapNguoiDung(req.body);
    res.status(200).json(user);
};
export const LayThongTinCaNhan = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(401, 'Unauthorized');
        }
        const user = await userService.LayThongTinCaNhan(userId);
        res.json({ success: true, user });
    }
    catch (error) {
        next(error);
    }
};
export const CapNhatAnhDaiDien = async (req, res, next) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            throw new ApiError(401, 'Unauthorized');
        }
        const file = req.file;
        if (!file) {
            throw new ApiError(400, 'Vui lòng chọn ảnh đại diện');
        }
        const result = await cloudinary.uploader.upload(file.path, {
            folder: 'bookingsport/avatars',
            transformation: [
                { width: 400, height: 400, crop: 'fill', gravity: 'face' }
            ]
        });
        const updatedUser = await userService.CapNhatAnhDaiDien(userId, result.secure_url, result.public_id);
        res.json({
            success: true,
            message: 'Cập nhật ảnh đại diện thành công',
            user: updatedUser,
        });
    }
    catch (error) {
        next(error);
    }
};
//# sourceMappingURL=nguoidung.controller.js.map