import { apiGet, apiPatch } from './api';
import type { OwnerBookingsResponse, UpdateBookingStatusResponse } from '@/types/booking.types';

export const bookingService = {
  async getOwnerBookings(token: string): Promise<OwnerBookingsResponse> {
    return apiGet<OwnerBookingsResponse>("/owner/my-bookings", token);
  },

  async updateBookingStatus(token: string, id: string, status: string): Promise<UpdateBookingStatusResponse> {
    return apiPatch<UpdateBookingStatusResponse>(`/owner/update-booking-status/${id}`, { status }, token);
  },

  async getPendingCount(token: string): Promise<{ success: boolean; count: number }> {
    return apiGet<{ success: boolean; count: number }>("/owner/pending-count", token);
  },
};
