export interface Court {
  ma_san: string;
  ten_san: string;
  trang_thai_san: 'Đang hoạt động' | 'Đang bảo trì' | 'Đang khóa';
  loai_the_thao: string;
  gia_thue_30p: number;
  anh_san?: {
    duong_dan_anh: string;
  }[];
}