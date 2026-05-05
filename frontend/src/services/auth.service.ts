import { apiPost } from './api';
import type { AuthResponse, LoginRequest, RegisterRequest, OwnerRegisterRequest } from '@/types/auth.types';

export const authService = {
  async loginUser(data: LoginRequest): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/user/login", JSON.stringify({
      email: data.contact,
      so_dien_thoai: data.contact,
      mat_khau: data.mat_khau,
    }));
  },

  async registerUser(data: RegisterRequest): Promise<AuthResponse> {
    return apiPost<AuthResponse>("/user/register", JSON.stringify({
      ho_ten: data.ho_ten,
      email: data.email,
      so_dien_thoai: data.so_dien_thoai,
      mat_khau: data.mat_khau,
    }));
  },

  async registerOwner(data: OwnerRegisterRequest): Promise<AuthResponse> {
    const formData = new FormData();
    formData.append("ho_ten", data.ho_ten);
    formData.append("email", data.email);
    formData.append("so_dien_thoai", data.so_dien_thoai);
    formData.append("mat_khau", data.mat_khau);
    formData.append("ten_dia_diem", data.ten_dia_diem);
    formData.append("dia_chi", data.dia_chi);
    if (data.anh_cccd_truoc) formData.append("anh_cccd_truoc", data.anh_cccd_truoc);
    if (data.anh_cccd_sau) formData.append("anh_cccd_sau", data.anh_cccd_sau);
    if (data.anh_dai_dien) formData.append("anh_dai_dien", data.anh_dai_dien);

    return apiPost<AuthResponse>("/owner/register", formData, null, false);
  },
};
