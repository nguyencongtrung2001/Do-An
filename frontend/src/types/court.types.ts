export interface Court {
  ma_san: string;
  ten_san: string;
  trang_thai_san: 'Đang hoạt động' | 'Đang bảo trì' | 'Đã khóa';
  loai_the_thao: string;
  gia_thue_30p: number;
  anh_san?: {
    duong_dan_anh: string;
  }[];
}

// API response type for GET /field
export interface CourtApiItem {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  so_sao: number;
  ten_dia_diem: string;
  dia_chi: string;
  anh_dai_dien?: string;
  kinh_do?: number | null;
  vi_do?: number | null;
  gia_thue_30p?: number;
}

// Mapped court item used in CourtGrid
export interface CourtGridItem {
  id: string | number;
  name: string;
  sport: string;
  rating: number;
  location: string;
  address: string;
  imageUrl: string;
  slug: string;
}

// Mapped court item used in MapClient
export interface CourtMapData {
  id: number;
  name: string;
  sport: string;
  lat: number;
  lng: number;
  distance: string;
  address: string;
  price: string;
  rating: string;
  image: string;
  slug: string;
}

// Data for locations in the map
export interface LocationMapData {
  ma_dia_diem: string;
  ten_dia_diem: string;
  dia_chi: string;
  lat: number;
  lng: number;
  sports: string[];
  image: string;
}

// Owner court type from API
export interface OwnerCourt {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  trang_thai_san: string;
  gia_thue_30p: number;
  anhsan?: {
    ma_anh_san: string;
    duong_dan_anh: string;
    ma_cloudinary: string;
  }[];
}

// API response types
export type FieldListResponse = CourtApiItem[];

export interface OwnerCourtsResponse {
  success: boolean;
  courts: OwnerCourt[];
}

export interface AddCourtResponse {
  success: boolean;
  message: string;
  court: unknown;
}

export interface UpdateCourtResponse {
  success: boolean;
  message: string;
  court: unknown;
}

// Detail court within a location
export interface DetailCourt {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  gia_thue_30p: number;
  trang_thai_san: string;
  so_sao: number;
  so_danh_gia: number;
  anhsan: {
    ma_anh_san: string;
    duong_dan_anh: string;
    ma_cloudinary: string;
  }[];
}

// Location detail response from GET /field/slug/:slug
export interface LocationDetail {
  ma_dia_diem: string;
  ten_dia_diem: string;
  dia_chi: string;
  mo_ta: string | null;
  kinh_do: number;
  vi_do: number;
  so_dien_thoai: string | null;
  anh_dai_dien: string | null;
  danh_gia_tb: number;
  so_danh_gia: number;
  sports: string[];
  hinh_anh: string[];
  sans: DetailCourt[];
}

export interface SelectedSlot {
  ma_san: string;
  ten_san: string;
  ngay_dat: string;
  gio_bat_dau: string;
  gio_ket_thuc: string;
  gia_thue: number;
}

export interface GroupedSlot extends SelectedSlot {
  slots: SelectedSlot[];
}
