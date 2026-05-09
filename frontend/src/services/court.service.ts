import { apiGet, apiPost, apiPut, apiPatch } from './api';
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

  /**
   * Update a court. Accepts either FormData (with images) or a plain JSON object.
   * When FormData is passed, multipart/form-data is sent and the backend
   * upload middleware processes the images.
   */
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

  async getLocationBySlug(slug: string): Promise<LocationDetail> {
    return apiGet<LocationDetail>(`/field/slug/${slug}`);
  },
};
