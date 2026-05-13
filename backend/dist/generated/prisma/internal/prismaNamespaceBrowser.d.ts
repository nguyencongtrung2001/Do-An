import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models.js';
export type * from './prismaNamespace.js';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly anhsan: "anhsan";
    readonly danhgia: "danhgia";
    readonly datsan: "datsan";
    readonly datsanchitiet: "datsanchitiet";
    readonly diadiem: "diadiem";
    readonly giaodich: "giaodich";
    readonly nguoidung: "nguoidung";
    readonly san: "san";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AnhsanScalarFieldEnum: {
    readonly ma_anh_san: "ma_anh_san";
    readonly ma_san: "ma_san";
    readonly duong_dan_anh: "duong_dan_anh";
    readonly ma_cloudinary: "ma_cloudinary";
    readonly ngay_tao: "ngay_tao";
};
export type AnhsanScalarFieldEnum = (typeof AnhsanScalarFieldEnum)[keyof typeof AnhsanScalarFieldEnum];
export declare const DanhgiaScalarFieldEnum: {
    readonly ma_danh_gia: "ma_danh_gia";
    readonly ma_nguoi_dung: "ma_nguoi_dung";
    readonly ma_dat_san_chi_tiet: "ma_dat_san_chi_tiet";
    readonly so_sao: "so_sao";
    readonly ngay_danh_gia: "ngay_danh_gia";
};
export type DanhgiaScalarFieldEnum = (typeof DanhgiaScalarFieldEnum)[keyof typeof DanhgiaScalarFieldEnum];
export declare const DatsanScalarFieldEnum: {
    readonly ma_dat_san: "ma_dat_san";
    readonly ma_nguoi_dung: "ma_nguoi_dung";
    readonly tong_tien: "tong_tien";
    readonly phuong_thuc_thanh_toan: "phuong_thuc_thanh_toan";
    readonly ngay_tao: "ngay_tao";
};
export type DatsanScalarFieldEnum = (typeof DatsanScalarFieldEnum)[keyof typeof DatsanScalarFieldEnum];
export declare const DatsanchitietScalarFieldEnum: {
    readonly ma_dat_san_chi_tiet: "ma_dat_san_chi_tiet";
    readonly ma_dat_san: "ma_dat_san";
    readonly ma_san: "ma_san";
    readonly ngay_dat: "ngay_dat";
    readonly gio_bat_dau: "gio_bat_dau";
    readonly gio_ket_thuc: "gio_ket_thuc";
    readonly tien_coc: "tien_coc";
    readonly tien_con_lai: "tien_con_lai";
    readonly trang_thai_dat: "trang_thai_dat";
};
export type DatsanchitietScalarFieldEnum = (typeof DatsanchitietScalarFieldEnum)[keyof typeof DatsanchitietScalarFieldEnum];
export declare const DiadiemScalarFieldEnum: {
    readonly ma_dia_diem: "ma_dia_diem";
    readonly ma_nguoi_dung: "ma_nguoi_dung";
    readonly ten_dia_diem: "ten_dia_diem";
    readonly dia_chi: "dia_chi";
    readonly mo_ta: "mo_ta";
    readonly kinh_do: "kinh_do";
    readonly vi_do: "vi_do";
    readonly trang_thai_duyet: "trang_thai_duyet";
    readonly ngay_tao: "ngay_tao";
};
export type DiadiemScalarFieldEnum = (typeof DiadiemScalarFieldEnum)[keyof typeof DiadiemScalarFieldEnum];
export declare const GiaodichScalarFieldEnum: {
    readonly ma_giao_dich: "ma_giao_dich";
    readonly ma_dat_san: "ma_dat_san";
    readonly ma_nguoi_dung: "ma_nguoi_dung";
    readonly duong_dan_thanh_toan: "duong_dan_thanh_toan";
    readonly so_tien_tt: "so_tien_tt";
    readonly ma_tham_chieu: "ma_tham_chieu";
    readonly ma_gd_vnpay: "ma_gd_vnpay";
    readonly ma_phan_hoi: "ma_phan_hoi";
    readonly ma_ngan_hang: "ma_ngan_hang";
    readonly thoi_gian_tt_vnpay: "thoi_gian_tt_vnpay";
    readonly trang_thai_giao_dich: "trang_thai_giao_dich";
    readonly noi_dung_thanh_toan: "noi_dung_thanh_toan";
    readonly ngay_tao: "ngay_tao";
};
export type GiaodichScalarFieldEnum = (typeof GiaodichScalarFieldEnum)[keyof typeof GiaodichScalarFieldEnum];
export declare const NguoidungScalarFieldEnum: {
    readonly ma_nguoi_dung: "ma_nguoi_dung";
    readonly ho_ten: "ho_ten";
    readonly email: "email";
    readonly so_dien_thoai: "so_dien_thoai";
    readonly mat_khau: "mat_khau";
    readonly ma_google: "ma_google";
    readonly anh_dai_dien: "anh_dai_dien";
    readonly anh_cloudinary: "anh_cloudinary";
    readonly vai_tro: "vai_tro";
    readonly so_vi_du: "so_vi_du";
    readonly anh_cccd_truoc: "anh_cccd_truoc";
    readonly anh_cccd_sau: "anh_cccd_sau";
    readonly trang_thai: "trang_thai";
    readonly ngay_tao: "ngay_tao";
};
export type NguoidungScalarFieldEnum = (typeof NguoidungScalarFieldEnum)[keyof typeof NguoidungScalarFieldEnum];
export declare const SanScalarFieldEnum: {
    readonly ma_san: "ma_san";
    readonly ma_dia_diem: "ma_dia_diem";
    readonly ten_san: "ten_san";
    readonly loai_the_thao: "loai_the_thao";
    readonly gia_thue_30p: "gia_thue_30p";
    readonly trang_thai_san: "trang_thai_san";
    readonly ngay_tao: "ngay_tao";
};
export type SanScalarFieldEnum = (typeof SanScalarFieldEnum)[keyof typeof SanScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map