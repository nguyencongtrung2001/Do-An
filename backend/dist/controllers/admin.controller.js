import { adminService } from '../services/admin.service.js';
// ── Users ──────────────────────────────────────────────
export const getAllUsers = async (req, res, next) => {
    try {
        const users = await adminService.getAllUsers();
        res.status(200).json({ success: true, users });
    }
    catch (err) {
        next(err);
    }
};
export const getUserById = async (req, res, next) => {
    try {
        const user = await adminService.getUserById(req.params.id);
        res.status(200).json({ success: true, user });
    }
    catch (err) {
        next(err);
    }
};
export const toggleUserStatus = async (req, res, next) => {
    try {
        const user = await adminService.toggleUserStatus(req.params.id);
        res.status(200).json({ success: true, message: `Tài khoản đã ${user.trang_thai ? 'mở khóa' : 'bị khóa'}`, user });
    }
    catch (err) {
        next(err);
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        await adminService.deleteUser(req.params.id);
        res.status(200).json({ success: true, message: 'Đã xóa người dùng thành công' });
    }
    catch (err) {
        next(err);
    }
};
// ── Owner Approval ────────────────────────────────────
export const getPendingOwners = async (_req, res, next) => {
    try {
        const owners = await adminService.getPendingOwners();
        res.status(200).json({ success: true, owners });
    }
    catch (err) {
        next(err);
    }
};
export const approveOwner = async (req, res, next) => {
    try {
        const user = await adminService.approveOwner(req.params.id);
        res.status(200).json({ success: true, message: 'Đã duyệt chủ sân thành công', user });
    }
    catch (err) {
        next(err);
    }
};
// ── Location Approval ─────────────────────────────────
export const getAllLocations = async (_req, res, next) => {
    try {
        const locations = await adminService.getAllLocations();
        res.status(200).json({ success: true, locations });
    }
    catch (err) {
        next(err);
    }
};
export const getPendingLocations = async (_req, res, next) => {
    try {
        const locations = await adminService.getPendingLocations();
        res.status(200).json({ success: true, locations });
    }
    catch (err) {
        next(err);
    }
};
export const approveLocation = async (req, res, next) => {
    try {
        const location = await adminService.approveLocation(req.params.id);
        res.status(200).json({ success: true, message: 'Đã duyệt địa điểm thành công', location });
    }
    catch (err) {
        next(err);
    }
};
export const rejectLocation = async (req, res, next) => {
    try {
        const location = await adminService.rejectLocation(req.params.id);
        res.status(200).json({ success: true, message: 'Đã từ chối địa điểm', location });
    }
    catch (err) {
        next(err);
    }
};
//# sourceMappingURL=admin.controller.js.map