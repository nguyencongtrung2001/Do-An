export declare class FieldService {
    getFields(): Promise<{
        ma_san: string;
        ten_san: string;
        so_sao: number;
        loai_the_thao: string;
        ten_dia_diem: string;
        dia_chi: string;
        anh_dai_dien: string;
        kinh_do: number | null;
        vi_do: number | null;
        gia_thue_30p: number;
    }[]>;
    getMapLocations(sportType: string): Promise<{
        ma_dia_diem: string;
        ten_dia_diem: string;
        dia_chi: string;
        lat: number;
        lng: number;
        sports: string[];
        image: string;
    }[]>;
    getLocationBySlug(slug: string): Promise<{
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
        sans: {
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
        }[];
    } | null>;
}
export declare const fieldService: FieldService;
//# sourceMappingURL=field.service.d.ts.map