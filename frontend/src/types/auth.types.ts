export interface UserData {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  anh_dai_dien: string | null;
}

export interface LoginRequest {
  contact: string;
  mat_khau: string;
}

export interface RegisterRequest {
  ho_ten: string;
  email: string;
  so_dien_thoai: string;
  mat_khau: string;
}

export interface OwnerRegisterRequest {
  ho_ten: string;
  email: string;
  so_dien_thoai: string;
  mat_khau: string;
  ten_dia_diem: string;
  dia_chi: string;
  kinh_do: number | null;
  vi_do: number | null;
  anh_cccd_truoc: File | null;
  anh_cccd_sau: File | null;
  anh_dai_dien: File | null;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: UserData;
  token: string;
  location?: unknown;
}

export type AuthTab = 'login' | 'register'; 

export enum Role {
  CUSTOMER = 'KHACH_HANG',
  OWNER = 'CHỦ_SÂN',
  ADMIN = 'ADMIN',
}