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
  anh_cccd_truoc: File | null;
  anh_cccd_sau: File | null;
}

export interface AuthResponse {
  success: boolean;
  message?: string;
  user: UserData;
  token: string;
  location?: unknown;
}
