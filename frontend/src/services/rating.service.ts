import { apiGet, apiPost } from './api';

export interface RatingStats {
  average: number;
  count: number;
}

export interface RatingData {
  ma_danh_gia: string;
  ma_nguoi_dung: string;
  ma_dat_san_chi_tiet: string;
  so_sao: number;
  ngay_danh_gia: string;
}

export const ratingService = {
  async getAverageRatingForLocation(ma_dia_diem: string): Promise<{ success: boolean; data: RatingStats }> {
    return apiGet(`/rating/location/${ma_dia_diem}`);
  },

  async getAverageRatingForCourt(ma_san: string): Promise<{ success: boolean; data: RatingStats }> {
    return apiGet(`/rating/court/${ma_san}`);
  },

  async getMyRatingForBooking(ma_dat_san_chi_tiet: string, token: string): Promise<{ success: boolean; data: RatingData | null }> {
    return apiGet(`/rating/my-rating/${ma_dat_san_chi_tiet}`, token);
  },

  async createRating(data: { ma_dat_san_chi_tiet: string; so_sao: number }, token: string): Promise<{ success: boolean; data: RatingData }> {
    return apiPost('/rating', data, token);
  }
};
