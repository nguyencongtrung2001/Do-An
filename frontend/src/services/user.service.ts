import { apiGet, apiPatch } from './api';

export interface UserProfile {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  anh_dai_dien: string | null;
  so_vi_du: number;
  ngay_tao: string | null;
}

interface ProfileResponse {
  success: boolean;
  user: UserProfile;
  message?: string;
}

export const userService = {
  async getProfile(token: string): Promise<ProfileResponse> {
    return apiGet<ProfileResponse>("/user/profile", token);
  },

  async updateAvatar(token: string, file: File): Promise<ProfileResponse> {
    const formData = new FormData();
    formData.append("anh_dai_dien", file);
    return apiPatch<ProfileResponse>("/user/update-avatar", formData, token, false);
  },
};
