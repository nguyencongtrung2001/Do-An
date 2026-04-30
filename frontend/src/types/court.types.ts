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

// Owner court type from API
export interface OwnerCourt {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  trang_thai_san: string;
  gia_thue_30p: number;
  anhsan?: { duong_dan_anh: string }[];
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
