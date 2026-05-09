export type BookingStatus = "Chờ xử lý" | "Đã xác nhận" | "Đã nhận sân" | "Hoàn thành" | "Đã hủy";

export interface BookingDetail {
  ma_dat_san_chi_tiet: string;
  ma_dat_san: string;
  ma_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  tien_coc: number;
  tien_con_lai: number;
  trang_thai_dat: BookingStatus;
  san: {
    ten_san: string;
    ma_san: string;
  };
  datsan: {
    tong_tien: number;
    nguoidung: {
      ho_ten: string;
      so_dien_thoai: string;
    };
    ngay_tao: string;
  };
}

export interface OwnerBookingsResponse {
  success: boolean;
  bookings: BookingDetail[];
}

export interface UpdateBookingStatusResponse {
  success: boolean;
  message: string;
  booking: unknown;
}
