import type { Request, Response, NextFunction } from 'express';
import { adminService } from '../services/quantrivien.service.js';



export const LayTatCaNguoiDung = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const users = await adminService.LayTatCaNguoiDung();
    res.status(200).json({ success: true, users });
  } catch (err) { next(err); }
};

export const LayNguoiDungTheoId = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await adminService.LayNguoiDungTheoId(req.params.id);
    res.status(200).json({ success: true, user });
  } catch (err) { next(err); }
};

export const DoiTrangThaiNguoiDung = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await adminService.DoiTrangThaiNguoiDung(req.params.id);
    res.status(200).json({ success: true, message: `Tài khoản đã ${user.trang_thai ? 'mở khóa' : 'bị khóa'}`, user });
  } catch (err) { next(err); }
};

export const XoaNguoiDung = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    await adminService.XoaNguoiDung(req.params.id);
    res.status(200).json({ success: true, message: 'Đã xóa người dùng thành công' });
  } catch (err) { next(err); }
};


export const LayChuSanChoDuyet = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const owners = await adminService.LayChuSanChoDuyet();
    res.status(200).json({ success: true, owners });
  } catch (err) { next(err); }
};

export const DuyetChuSan = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const user = await adminService.DuyetChuSan(req.params.id);
    res.status(200).json({ success: true, message: 'Đã duyệt chủ sân thành công', user });
  } catch (err) { next(err); }
};


export const LayTatCaDiaDiem = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await adminService.LayTatCaDiaDiem();
    res.status(200).json({ success: true, locations });
  } catch (err) { next(err); }
};

export const LayDiaDiemChoDuyet = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const locations = await adminService.LayDiaDiemChoDuyet();
    res.status(200).json({ success: true, locations });
  } catch (err) { next(err); }
};

export const DuyetDiaDiem = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const location = await adminService.DuyetDiaDiem(req.params.id);
    res.status(200).json({ success: true, message: 'Đã duyệt địa điểm thành công', location });
  } catch (err) { next(err); }
};

export const TuChoiDiaDiem = async (req: Request<{ id: string }>, res: Response, next: NextFunction) => {
  try {
    const { mo_ta } = req.body || {};
    const location = await adminService.TuChoiDiaDiem(req.params.id, mo_ta);
    res.status(200).json({ success: true, message: 'Đã từ chối địa điểm', location });
  } catch (err) { next(err); }
};