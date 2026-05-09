import { apiGet, apiPut, apiDelete } from './api';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type ApiResponse = { success: boolean; [key: string]: any };

export const adminService = {
  // ── Users ──────────────────────────────────────────────

  async getAllUsers(token: string): Promise<ApiResponse> {
    return apiGet<ApiResponse>('/admin/users', token);
  },

  async getUserById(token: string, id: string): Promise<ApiResponse> {
    return apiGet<ApiResponse>(`/admin/users/${id}`, token);
  },

  async toggleUserStatus(token: string, id: string): Promise<ApiResponse> {
    return apiPut<ApiResponse>(`/admin/users/${id}/toggle-status`, {}, token);
  },

  async deleteUser(token: string, id: string): Promise<ApiResponse> {
    return apiDelete<ApiResponse>(`/admin/users/${id}`, token);
  },

  // ── Owner Approval ────────────────────────────────────

  async getPendingOwners(token: string): Promise<ApiResponse> {
    return apiGet<ApiResponse>('/admin/owners/pending', token);
  },

  async approveOwner(token: string, id: string): Promise<ApiResponse> {
    return apiPut<ApiResponse>(`/admin/owners/${id}/approve`, {}, token);
  },

  // ── Location Approval ─────────────────────────────────

  async getAllLocations(token: string): Promise<ApiResponse> {
    return apiGet<ApiResponse>('/admin/locations', token);
  },

  async getPendingLocations(token: string): Promise<ApiResponse> {
    return apiGet<ApiResponse>('/admin/locations/pending', token);
  },

  async approveLocation(token: string, id: string): Promise<ApiResponse> {
    return apiPut<ApiResponse>(`/admin/locations/${id}/approve`, {}, token);
  },

  async rejectLocation(token: string, id: string): Promise<ApiResponse> {
    return apiPut<ApiResponse>(`/admin/locations/${id}/reject`, {}, token);
  },
};
