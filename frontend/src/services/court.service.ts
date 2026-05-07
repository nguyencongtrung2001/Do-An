import { apiGet, apiPost, apiPatch, API_BASE_URL } from './api';
import type {
  FieldListResponse,
  OwnerCourtsResponse,
  AddCourtResponse,
  UpdateCourtResponse,
} from '@/types/court.types';

export const courtService = {
  async getFields(): Promise<FieldListResponse> {
    return apiGet<FieldListResponse>('/field');
  },

  async getMapLocations(sportType: string): Promise<any> {
    return apiGet<any>(`/field/map-locations?sport=${encodeURIComponent(sportType)}`);
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

    const headers: Record<string, string> = {
      Authorization: `Bearer ${token}`,
    };
    // Do NOT set Content-Type for FormData — browser sets it automatically with boundary
    if (!isFormData) {
      headers['Content-Type'] = 'application/json';
    }

    const body = isFormData ? data : JSON.stringify(data);

    const res = await fetch(`${API_BASE_URL}/owner/update-court/${ma_san}`, {
      method: 'PUT',
      headers,
      body: body as BodyInit,
    });

    const json = await res.json();
    if (!res.ok) throw new Error(json.message || 'Cập nhật sân thất bại');
    return json;
  },

  async updateCourtStatus(
    token: string,
    ma_san: string,
    trang_thai_san: string,
  ): Promise<UpdateCourtResponse> {
    return apiPatch<UpdateCourtResponse>(
      `/owner/update-court-status/${ma_san}`,
      JSON.stringify({ trang_thai_san }),
      token,
    );
  },
};
