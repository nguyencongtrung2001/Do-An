import { apiGet, apiPost, apiPut, apiPatch } from './api';
import type { FieldListResponse, OwnerCourtsResponse, AddCourtResponse, UpdateCourtResponse } from '@/types/court.types';

export const courtService = {
  async getFields(): Promise<FieldListResponse> {
    return apiGet<FieldListResponse>("/field");
  },

  async getOwnerCourts(token: string): Promise<OwnerCourtsResponse> {
    return apiGet<OwnerCourtsResponse>("/owner/my-courts", token);
  },

  async addCourt(token: string, data: FormData): Promise<AddCourtResponse> {
    return apiPost<AddCourtResponse>("/owner/add-court", data, token, false);
  },

  async updateCourt(token: string, ma_san: string, data: Record<string, unknown>, isJSON: boolean = true): Promise<UpdateCourtResponse> {
    const body = isJSON ? JSON.stringify(data) : (data as unknown as BodyInit);
    return apiPut<UpdateCourtResponse>(`/owner/update-court/${ma_san}`, body, token, isJSON);
  },

  async updateCourtStatus(token: string, ma_san: string, trang_thai_san: string): Promise<UpdateCourtResponse> {
    return apiPatch<UpdateCourtResponse>(`/owner/update-court-status/${ma_san}`, JSON.stringify({ trang_thai_san }), token);
  },
};
