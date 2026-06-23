import { apiGet, apiPost, apiPut, apiPatch, apiDelete } from './api';
import type {
  FieldListResponse,
  OwnerCourtsResponse,
  AddCourtResponse,
  UpdateCourtResponse,
  LocationDetail,
} from '@/types/court.types';

export const courtService = {
  async getFields(): Promise<FieldListResponse> {
    return apiGet<FieldListResponse>('/field');
  },

  async getMapLocations(sportType: string): Promise<unknown> {
    return apiGet<unknown>(`/field/map-locations?sport=${encodeURIComponent(sportType)}`);
  },

  async getOwnerCourts(token: string): Promise<OwnerCourtsResponse> {
    return apiGet<OwnerCourtsResponse>('/owner/my-courts', token);
  },

  async addCourt(token: string, data: FormData): Promise<AddCourtResponse> {
    return apiPost<AddCourtResponse>('/owner/add-court', data, token, false);
  },

    async updateCourt(
    token: string,
    ma_san: string,
    data: FormData | Record<string, unknown>,
  ): Promise<UpdateCourtResponse> {
    const isFormData = data instanceof FormData;
    return apiPut<UpdateCourtResponse>(
      `/owner/update-court/${ma_san}`,
      data,
      token,
      !isFormData,
    );
  },

  async updateCourtStatus(
    token: string,
    ma_san: string,
    trang_thai_san: string,
  ): Promise<UpdateCourtResponse> {
    return apiPatch<UpdateCourtResponse>(
      `/owner/update-court-status/${ma_san}`,
      { trang_thai_san },
      token,
    );
  },

  async deleteCourt(token: string, ma_san: string): Promise<{ success: boolean; message: string }> {
    return apiDelete<{ success: boolean; message: string }>(
      `/owner/delete-court/${ma_san}`,
      token
    );
  },

  async getLocationBySlug(slug: string): Promise<LocationDetail> {
    return apiGet<LocationDetail>(`/field/slug/${slug}`);
  },

  async getBookedSlots(maSan: string, ngayDat: string): Promise<{ success: boolean; data: { gio_bat_dau: string; gio_ket_thuc: string }[] }> {
    return apiGet(`/field/courts/${maSan}/booked-slots?ngay_dat=${ngayDat}`);
  },
};
