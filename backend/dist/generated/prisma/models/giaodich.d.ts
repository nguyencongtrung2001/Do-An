import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model giaodich
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type giaodichModel = runtime.Types.Result.DefaultSelection<Prisma.$giaodichPayload>;
export type AggregateGiaodich = {
    _count: GiaodichCountAggregateOutputType | null;
    _avg: GiaodichAvgAggregateOutputType | null;
    _sum: GiaodichSumAggregateOutputType | null;
    _min: GiaodichMinAggregateOutputType | null;
    _max: GiaodichMaxAggregateOutputType | null;
};
export type GiaodichAvgAggregateOutputType = {
    so_tien_tt: runtime.Decimal | null;
};
export type GiaodichSumAggregateOutputType = {
    so_tien_tt: runtime.Decimal | null;
};
export type GiaodichMinAggregateOutputType = {
    ma_giao_dich: string | null;
    ma_dat_san: string | null;
    ma_nguoi_dung: string | null;
    duong_dan_thanh_toan: string | null;
    so_tien_tt: runtime.Decimal | null;
    ma_tham_chieu: string | null;
    ma_gd_vnpay: string | null;
    ma_phan_hoi: string | null;
    ma_ngan_hang: string | null;
    thoi_gian_tt_vnpay: string | null;
    trang_thai_giao_dich: string | null;
    noi_dung_thanh_toan: string | null;
    ngay_tao: Date | null;
};
export type GiaodichMaxAggregateOutputType = {
    ma_giao_dich: string | null;
    ma_dat_san: string | null;
    ma_nguoi_dung: string | null;
    duong_dan_thanh_toan: string | null;
    so_tien_tt: runtime.Decimal | null;
    ma_tham_chieu: string | null;
    ma_gd_vnpay: string | null;
    ma_phan_hoi: string | null;
    ma_ngan_hang: string | null;
    thoi_gian_tt_vnpay: string | null;
    trang_thai_giao_dich: string | null;
    noi_dung_thanh_toan: string | null;
    ngay_tao: Date | null;
};
export type GiaodichCountAggregateOutputType = {
    ma_giao_dich: number;
    ma_dat_san: number;
    ma_nguoi_dung: number;
    duong_dan_thanh_toan: number;
    so_tien_tt: number;
    ma_tham_chieu: number;
    ma_gd_vnpay: number;
    ma_phan_hoi: number;
    ma_ngan_hang: number;
    thoi_gian_tt_vnpay: number;
    trang_thai_giao_dich: number;
    noi_dung_thanh_toan: number;
    ngay_tao: number;
    _all: number;
};
export type GiaodichAvgAggregateInputType = {
    so_tien_tt?: true;
};
export type GiaodichSumAggregateInputType = {
    so_tien_tt?: true;
};
export type GiaodichMinAggregateInputType = {
    ma_giao_dich?: true;
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    duong_dan_thanh_toan?: true;
    so_tien_tt?: true;
    ma_tham_chieu?: true;
    ma_gd_vnpay?: true;
    ma_phan_hoi?: true;
    ma_ngan_hang?: true;
    thoi_gian_tt_vnpay?: true;
    trang_thai_giao_dich?: true;
    noi_dung_thanh_toan?: true;
    ngay_tao?: true;
};
export type GiaodichMaxAggregateInputType = {
    ma_giao_dich?: true;
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    duong_dan_thanh_toan?: true;
    so_tien_tt?: true;
    ma_tham_chieu?: true;
    ma_gd_vnpay?: true;
    ma_phan_hoi?: true;
    ma_ngan_hang?: true;
    thoi_gian_tt_vnpay?: true;
    trang_thai_giao_dich?: true;
    noi_dung_thanh_toan?: true;
    ngay_tao?: true;
};
export type GiaodichCountAggregateInputType = {
    ma_giao_dich?: true;
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    duong_dan_thanh_toan?: true;
    so_tien_tt?: true;
    ma_tham_chieu?: true;
    ma_gd_vnpay?: true;
    ma_phan_hoi?: true;
    ma_ngan_hang?: true;
    thoi_gian_tt_vnpay?: true;
    trang_thai_giao_dich?: true;
    noi_dung_thanh_toan?: true;
    ngay_tao?: true;
    _all?: true;
};
export type GiaodichAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which giaodich to aggregate.
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of giaodiches to fetch.
     */
    orderBy?: Prisma.giaodichOrderByWithRelationInput | Prisma.giaodichOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.giaodichWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` giaodiches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` giaodiches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned giaodiches
    **/
    _count?: true | GiaodichCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: GiaodichAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: GiaodichSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: GiaodichMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: GiaodichMaxAggregateInputType;
};
export type GetGiaodichAggregateType<T extends GiaodichAggregateArgs> = {
    [P in keyof T & keyof AggregateGiaodich]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateGiaodich[P]> : Prisma.GetScalarType<T[P], AggregateGiaodich[P]>;
};
export type giaodichGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.giaodichWhereInput;
    orderBy?: Prisma.giaodichOrderByWithAggregationInput | Prisma.giaodichOrderByWithAggregationInput[];
    by: Prisma.GiaodichScalarFieldEnum[] | Prisma.GiaodichScalarFieldEnum;
    having?: Prisma.giaodichScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: GiaodichCountAggregateInputType | true;
    _avg?: GiaodichAvgAggregateInputType;
    _sum?: GiaodichSumAggregateInputType;
    _min?: GiaodichMinAggregateInputType;
    _max?: GiaodichMaxAggregateInputType;
};
export type GiaodichGroupByOutputType = {
    ma_giao_dich: string;
    ma_dat_san: string | null;
    ma_nguoi_dung: string | null;
    duong_dan_thanh_toan: string | null;
    so_tien_tt: runtime.Decimal;
    ma_tham_chieu: string | null;
    ma_gd_vnpay: string | null;
    ma_phan_hoi: string | null;
    ma_ngan_hang: string | null;
    thoi_gian_tt_vnpay: string | null;
    trang_thai_giao_dich: string;
    noi_dung_thanh_toan: string | null;
    ngay_tao: Date | null;
    _count: GiaodichCountAggregateOutputType | null;
    _avg: GiaodichAvgAggregateOutputType | null;
    _sum: GiaodichSumAggregateOutputType | null;
    _min: GiaodichMinAggregateOutputType | null;
    _max: GiaodichMaxAggregateOutputType | null;
};
export type GetGiaodichGroupByPayload<T extends giaodichGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<GiaodichGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof GiaodichGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], GiaodichGroupByOutputType[P]> : Prisma.GetScalarType<T[P], GiaodichGroupByOutputType[P]>;
}>>;
export type giaodichWhereInput = {
    AND?: Prisma.giaodichWhereInput | Prisma.giaodichWhereInput[];
    OR?: Prisma.giaodichWhereInput[];
    NOT?: Prisma.giaodichWhereInput | Prisma.giaodichWhereInput[];
    ma_giao_dich?: Prisma.StringFilter<"giaodich"> | string;
    ma_dat_san?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    duong_dan_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    so_tien_tt?: Prisma.DecimalFilter<"giaodich"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_gd_vnpay?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_phan_hoi?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_ngan_hang?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    thoi_gian_tt_vnpay?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    trang_thai_giao_dich?: Prisma.StringFilter<"giaodich"> | string;
    noi_dung_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"giaodich"> | Date | string | null;
    datsan?: Prisma.XOR<Prisma.DatsanNullableScalarRelationFilter, Prisma.datsanWhereInput> | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
};
export type giaodichOrderByWithRelationInput = {
    ma_giao_dich?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    duong_dan_thanh_toan?: Prisma.SortOrderInput | Prisma.SortOrder;
    so_tien_tt?: Prisma.SortOrder;
    ma_tham_chieu?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_gd_vnpay?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_phan_hoi?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_ngan_hang?: Prisma.SortOrderInput | Prisma.SortOrder;
    thoi_gian_tt_vnpay?: Prisma.SortOrderInput | Prisma.SortOrder;
    trang_thai_giao_dich?: Prisma.SortOrder;
    noi_dung_thanh_toan?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    datsan?: Prisma.datsanOrderByWithRelationInput;
    nguoidung?: Prisma.nguoidungOrderByWithRelationInput;
};
export type giaodichWhereUniqueInput = Prisma.AtLeast<{
    ma_giao_dich?: string;
    ma_gd_vnpay?: string;
    AND?: Prisma.giaodichWhereInput | Prisma.giaodichWhereInput[];
    OR?: Prisma.giaodichWhereInput[];
    NOT?: Prisma.giaodichWhereInput | Prisma.giaodichWhereInput[];
    ma_dat_san?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    duong_dan_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    so_tien_tt?: Prisma.DecimalFilter<"giaodich"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_phan_hoi?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_ngan_hang?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    thoi_gian_tt_vnpay?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    trang_thai_giao_dich?: Prisma.StringFilter<"giaodich"> | string;
    noi_dung_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"giaodich"> | Date | string | null;
    datsan?: Prisma.XOR<Prisma.DatsanNullableScalarRelationFilter, Prisma.datsanWhereInput> | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
}, "ma_giao_dich" | "ma_gd_vnpay">;
export type giaodichOrderByWithAggregationInput = {
    ma_giao_dich?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    duong_dan_thanh_toan?: Prisma.SortOrderInput | Prisma.SortOrder;
    so_tien_tt?: Prisma.SortOrder;
    ma_tham_chieu?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_gd_vnpay?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_phan_hoi?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_ngan_hang?: Prisma.SortOrderInput | Prisma.SortOrder;
    thoi_gian_tt_vnpay?: Prisma.SortOrderInput | Prisma.SortOrder;
    trang_thai_giao_dich?: Prisma.SortOrder;
    noi_dung_thanh_toan?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.giaodichCountOrderByAggregateInput;
    _avg?: Prisma.giaodichAvgOrderByAggregateInput;
    _max?: Prisma.giaodichMaxOrderByAggregateInput;
    _min?: Prisma.giaodichMinOrderByAggregateInput;
    _sum?: Prisma.giaodichSumOrderByAggregateInput;
};
export type giaodichScalarWhereWithAggregatesInput = {
    AND?: Prisma.giaodichScalarWhereWithAggregatesInput | Prisma.giaodichScalarWhereWithAggregatesInput[];
    OR?: Prisma.giaodichScalarWhereWithAggregatesInput[];
    NOT?: Prisma.giaodichScalarWhereWithAggregatesInput | Prisma.giaodichScalarWhereWithAggregatesInput[];
    ma_giao_dich?: Prisma.StringWithAggregatesFilter<"giaodich"> | string;
    ma_dat_san?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    ma_nguoi_dung?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    duong_dan_thanh_toan?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    so_tien_tt?: Prisma.DecimalWithAggregatesFilter<"giaodich"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    ma_gd_vnpay?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    ma_phan_hoi?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    ma_ngan_hang?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    thoi_gian_tt_vnpay?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    trang_thai_giao_dich?: Prisma.StringWithAggregatesFilter<"giaodich"> | string;
    noi_dung_thanh_toan?: Prisma.StringNullableWithAggregatesFilter<"giaodich"> | string | null;
    ngay_tao?: Prisma.DateTimeNullableWithAggregatesFilter<"giaodich"> | Date | string | null;
};
export type giaodichCreateInput = {
    ma_giao_dich: string;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
    datsan?: Prisma.datsanCreateNestedOneWithoutGiaodichInput;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutGiaodichInput;
};
export type giaodichUncheckedCreateInput = {
    ma_giao_dich: string;
    ma_dat_san?: string | null;
    ma_nguoi_dung?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichUpdateInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsan?: Prisma.datsanUpdateOneWithoutGiaodichNestedInput;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutGiaodichNestedInput;
};
export type giaodichUncheckedUpdateInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichCreateManyInput = {
    ma_giao_dich: string;
    ma_dat_san?: string | null;
    ma_nguoi_dung?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichUpdateManyMutationInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichUncheckedUpdateManyInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type GiaodichListRelationFilter = {
    every?: Prisma.giaodichWhereInput;
    some?: Prisma.giaodichWhereInput;
    none?: Prisma.giaodichWhereInput;
};
export type giaodichOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type giaodichCountOrderByAggregateInput = {
    ma_giao_dich?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    duong_dan_thanh_toan?: Prisma.SortOrder;
    so_tien_tt?: Prisma.SortOrder;
    ma_tham_chieu?: Prisma.SortOrder;
    ma_gd_vnpay?: Prisma.SortOrder;
    ma_phan_hoi?: Prisma.SortOrder;
    ma_ngan_hang?: Prisma.SortOrder;
    thoi_gian_tt_vnpay?: Prisma.SortOrder;
    trang_thai_giao_dich?: Prisma.SortOrder;
    noi_dung_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type giaodichAvgOrderByAggregateInput = {
    so_tien_tt?: Prisma.SortOrder;
};
export type giaodichMaxOrderByAggregateInput = {
    ma_giao_dich?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    duong_dan_thanh_toan?: Prisma.SortOrder;
    so_tien_tt?: Prisma.SortOrder;
    ma_tham_chieu?: Prisma.SortOrder;
    ma_gd_vnpay?: Prisma.SortOrder;
    ma_phan_hoi?: Prisma.SortOrder;
    ma_ngan_hang?: Prisma.SortOrder;
    thoi_gian_tt_vnpay?: Prisma.SortOrder;
    trang_thai_giao_dich?: Prisma.SortOrder;
    noi_dung_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type giaodichMinOrderByAggregateInput = {
    ma_giao_dich?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    duong_dan_thanh_toan?: Prisma.SortOrder;
    so_tien_tt?: Prisma.SortOrder;
    ma_tham_chieu?: Prisma.SortOrder;
    ma_gd_vnpay?: Prisma.SortOrder;
    ma_phan_hoi?: Prisma.SortOrder;
    ma_ngan_hang?: Prisma.SortOrder;
    thoi_gian_tt_vnpay?: Prisma.SortOrder;
    trang_thai_giao_dich?: Prisma.SortOrder;
    noi_dung_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type giaodichSumOrderByAggregateInput = {
    so_tien_tt?: Prisma.SortOrder;
};
export type giaodichCreateNestedManyWithoutDatsanInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput> | Prisma.giaodichCreateWithoutDatsanInput[] | Prisma.giaodichUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutDatsanInput | Prisma.giaodichCreateOrConnectWithoutDatsanInput[];
    createMany?: Prisma.giaodichCreateManyDatsanInputEnvelope;
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
};
export type giaodichUncheckedCreateNestedManyWithoutDatsanInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput> | Prisma.giaodichCreateWithoutDatsanInput[] | Prisma.giaodichUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutDatsanInput | Prisma.giaodichCreateOrConnectWithoutDatsanInput[];
    createMany?: Prisma.giaodichCreateManyDatsanInputEnvelope;
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
};
export type giaodichUpdateManyWithoutDatsanNestedInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput> | Prisma.giaodichCreateWithoutDatsanInput[] | Prisma.giaodichUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutDatsanInput | Prisma.giaodichCreateOrConnectWithoutDatsanInput[];
    upsert?: Prisma.giaodichUpsertWithWhereUniqueWithoutDatsanInput | Prisma.giaodichUpsertWithWhereUniqueWithoutDatsanInput[];
    createMany?: Prisma.giaodichCreateManyDatsanInputEnvelope;
    set?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    disconnect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    delete?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    update?: Prisma.giaodichUpdateWithWhereUniqueWithoutDatsanInput | Prisma.giaodichUpdateWithWhereUniqueWithoutDatsanInput[];
    updateMany?: Prisma.giaodichUpdateManyWithWhereWithoutDatsanInput | Prisma.giaodichUpdateManyWithWhereWithoutDatsanInput[];
    deleteMany?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
};
export type giaodichUncheckedUpdateManyWithoutDatsanNestedInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput> | Prisma.giaodichCreateWithoutDatsanInput[] | Prisma.giaodichUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutDatsanInput | Prisma.giaodichCreateOrConnectWithoutDatsanInput[];
    upsert?: Prisma.giaodichUpsertWithWhereUniqueWithoutDatsanInput | Prisma.giaodichUpsertWithWhereUniqueWithoutDatsanInput[];
    createMany?: Prisma.giaodichCreateManyDatsanInputEnvelope;
    set?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    disconnect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    delete?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    update?: Prisma.giaodichUpdateWithWhereUniqueWithoutDatsanInput | Prisma.giaodichUpdateWithWhereUniqueWithoutDatsanInput[];
    updateMany?: Prisma.giaodichUpdateManyWithWhereWithoutDatsanInput | Prisma.giaodichUpdateManyWithWhereWithoutDatsanInput[];
    deleteMany?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
};
export type giaodichCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput> | Prisma.giaodichCreateWithoutNguoidungInput[] | Prisma.giaodichUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutNguoidungInput | Prisma.giaodichCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.giaodichCreateManyNguoidungInputEnvelope;
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
};
export type giaodichUncheckedCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput> | Prisma.giaodichCreateWithoutNguoidungInput[] | Prisma.giaodichUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutNguoidungInput | Prisma.giaodichCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.giaodichCreateManyNguoidungInputEnvelope;
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
};
export type giaodichUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput> | Prisma.giaodichCreateWithoutNguoidungInput[] | Prisma.giaodichUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutNguoidungInput | Prisma.giaodichCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.giaodichUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.giaodichUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.giaodichCreateManyNguoidungInputEnvelope;
    set?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    disconnect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    delete?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    update?: Prisma.giaodichUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.giaodichUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.giaodichUpdateManyWithWhereWithoutNguoidungInput | Prisma.giaodichUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
};
export type giaodichUncheckedUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput> | Prisma.giaodichCreateWithoutNguoidungInput[] | Prisma.giaodichUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.giaodichCreateOrConnectWithoutNguoidungInput | Prisma.giaodichCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.giaodichUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.giaodichUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.giaodichCreateManyNguoidungInputEnvelope;
    set?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    disconnect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    delete?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    connect?: Prisma.giaodichWhereUniqueInput | Prisma.giaodichWhereUniqueInput[];
    update?: Prisma.giaodichUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.giaodichUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.giaodichUpdateManyWithWhereWithoutNguoidungInput | Prisma.giaodichUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
};
export type giaodichCreateWithoutDatsanInput = {
    ma_giao_dich: string;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutGiaodichInput;
};
export type giaodichUncheckedCreateWithoutDatsanInput = {
    ma_giao_dich: string;
    ma_nguoi_dung?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichCreateOrConnectWithoutDatsanInput = {
    where: Prisma.giaodichWhereUniqueInput;
    create: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput>;
};
export type giaodichCreateManyDatsanInputEnvelope = {
    data: Prisma.giaodichCreateManyDatsanInput | Prisma.giaodichCreateManyDatsanInput[];
    skipDuplicates?: boolean;
};
export type giaodichUpsertWithWhereUniqueWithoutDatsanInput = {
    where: Prisma.giaodichWhereUniqueInput;
    update: Prisma.XOR<Prisma.giaodichUpdateWithoutDatsanInput, Prisma.giaodichUncheckedUpdateWithoutDatsanInput>;
    create: Prisma.XOR<Prisma.giaodichCreateWithoutDatsanInput, Prisma.giaodichUncheckedCreateWithoutDatsanInput>;
};
export type giaodichUpdateWithWhereUniqueWithoutDatsanInput = {
    where: Prisma.giaodichWhereUniqueInput;
    data: Prisma.XOR<Prisma.giaodichUpdateWithoutDatsanInput, Prisma.giaodichUncheckedUpdateWithoutDatsanInput>;
};
export type giaodichUpdateManyWithWhereWithoutDatsanInput = {
    where: Prisma.giaodichScalarWhereInput;
    data: Prisma.XOR<Prisma.giaodichUpdateManyMutationInput, Prisma.giaodichUncheckedUpdateManyWithoutDatsanInput>;
};
export type giaodichScalarWhereInput = {
    AND?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
    OR?: Prisma.giaodichScalarWhereInput[];
    NOT?: Prisma.giaodichScalarWhereInput | Prisma.giaodichScalarWhereInput[];
    ma_giao_dich?: Prisma.StringFilter<"giaodich"> | string;
    ma_dat_san?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    duong_dan_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    so_tien_tt?: Prisma.DecimalFilter<"giaodich"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_gd_vnpay?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_phan_hoi?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ma_ngan_hang?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    thoi_gian_tt_vnpay?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    trang_thai_giao_dich?: Prisma.StringFilter<"giaodich"> | string;
    noi_dung_thanh_toan?: Prisma.StringNullableFilter<"giaodich"> | string | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"giaodich"> | Date | string | null;
};
export type giaodichCreateWithoutNguoidungInput = {
    ma_giao_dich: string;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
    datsan?: Prisma.datsanCreateNestedOneWithoutGiaodichInput;
};
export type giaodichUncheckedCreateWithoutNguoidungInput = {
    ma_giao_dich: string;
    ma_dat_san?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichCreateOrConnectWithoutNguoidungInput = {
    where: Prisma.giaodichWhereUniqueInput;
    create: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput>;
};
export type giaodichCreateManyNguoidungInputEnvelope = {
    data: Prisma.giaodichCreateManyNguoidungInput | Prisma.giaodichCreateManyNguoidungInput[];
    skipDuplicates?: boolean;
};
export type giaodichUpsertWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.giaodichWhereUniqueInput;
    update: Prisma.XOR<Prisma.giaodichUpdateWithoutNguoidungInput, Prisma.giaodichUncheckedUpdateWithoutNguoidungInput>;
    create: Prisma.XOR<Prisma.giaodichCreateWithoutNguoidungInput, Prisma.giaodichUncheckedCreateWithoutNguoidungInput>;
};
export type giaodichUpdateWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.giaodichWhereUniqueInput;
    data: Prisma.XOR<Prisma.giaodichUpdateWithoutNguoidungInput, Prisma.giaodichUncheckedUpdateWithoutNguoidungInput>;
};
export type giaodichUpdateManyWithWhereWithoutNguoidungInput = {
    where: Prisma.giaodichScalarWhereInput;
    data: Prisma.XOR<Prisma.giaodichUpdateManyMutationInput, Prisma.giaodichUncheckedUpdateManyWithoutNguoidungInput>;
};
export type giaodichCreateManyDatsanInput = {
    ma_giao_dich: string;
    ma_nguoi_dung?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichUpdateWithoutDatsanInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutGiaodichNestedInput;
};
export type giaodichUncheckedUpdateWithoutDatsanInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichUncheckedUpdateManyWithoutDatsanInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichCreateManyNguoidungInput = {
    ma_giao_dich: string;
    ma_dat_san?: string | null;
    duong_dan_thanh_toan?: string | null;
    so_tien_tt: runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: string | null;
    ma_gd_vnpay?: string | null;
    ma_phan_hoi?: string | null;
    ma_ngan_hang?: string | null;
    thoi_gian_tt_vnpay?: string | null;
    trang_thai_giao_dich?: string;
    noi_dung_thanh_toan?: string | null;
    ngay_tao?: Date | string | null;
};
export type giaodichUpdateWithoutNguoidungInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsan?: Prisma.datsanUpdateOneWithoutGiaodichNestedInput;
};
export type giaodichUncheckedUpdateWithoutNguoidungInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichUncheckedUpdateManyWithoutNguoidungInput = {
    ma_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    duong_dan_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_tien_tt?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    ma_tham_chieu?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_gd_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_phan_hoi?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_ngan_hang?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    thoi_gian_tt_vnpay?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai_giao_dich?: Prisma.StringFieldUpdateOperationsInput | string;
    noi_dung_thanh_toan?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type giaodichSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_giao_dich?: boolean;
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    duong_dan_thanh_toan?: boolean;
    so_tien_tt?: boolean;
    ma_tham_chieu?: boolean;
    ma_gd_vnpay?: boolean;
    ma_phan_hoi?: boolean;
    ma_ngan_hang?: boolean;
    thoi_gian_tt_vnpay?: boolean;
    trang_thai_giao_dich?: boolean;
    noi_dung_thanh_toan?: boolean;
    ngay_tao?: boolean;
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["giaodich"]>;
export type giaodichSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_giao_dich?: boolean;
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    duong_dan_thanh_toan?: boolean;
    so_tien_tt?: boolean;
    ma_tham_chieu?: boolean;
    ma_gd_vnpay?: boolean;
    ma_phan_hoi?: boolean;
    ma_ngan_hang?: boolean;
    thoi_gian_tt_vnpay?: boolean;
    trang_thai_giao_dich?: boolean;
    noi_dung_thanh_toan?: boolean;
    ngay_tao?: boolean;
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["giaodich"]>;
export type giaodichSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_giao_dich?: boolean;
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    duong_dan_thanh_toan?: boolean;
    so_tien_tt?: boolean;
    ma_tham_chieu?: boolean;
    ma_gd_vnpay?: boolean;
    ma_phan_hoi?: boolean;
    ma_ngan_hang?: boolean;
    thoi_gian_tt_vnpay?: boolean;
    trang_thai_giao_dich?: boolean;
    noi_dung_thanh_toan?: boolean;
    ngay_tao?: boolean;
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["giaodich"]>;
export type giaodichSelectScalar = {
    ma_giao_dich?: boolean;
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    duong_dan_thanh_toan?: boolean;
    so_tien_tt?: boolean;
    ma_tham_chieu?: boolean;
    ma_gd_vnpay?: boolean;
    ma_phan_hoi?: boolean;
    ma_ngan_hang?: boolean;
    thoi_gian_tt_vnpay?: boolean;
    trang_thai_giao_dich?: boolean;
    noi_dung_thanh_toan?: boolean;
    ngay_tao?: boolean;
};
export type giaodichOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_giao_dich" | "ma_dat_san" | "ma_nguoi_dung" | "duong_dan_thanh_toan" | "so_tien_tt" | "ma_tham_chieu" | "ma_gd_vnpay" | "ma_phan_hoi" | "ma_ngan_hang" | "thoi_gian_tt_vnpay" | "trang_thai_giao_dich" | "noi_dung_thanh_toan" | "ngay_tao", ExtArgs["result"]["giaodich"]>;
export type giaodichInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
};
export type giaodichIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
};
export type giaodichIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsan?: boolean | Prisma.giaodich$datsanArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.giaodich$nguoidungArgs<ExtArgs>;
};
export type $giaodichPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "giaodich";
    objects: {
        datsan: Prisma.$datsanPayload<ExtArgs> | null;
        nguoidung: Prisma.$nguoidungPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_giao_dich: string;
        ma_dat_san: string | null;
        ma_nguoi_dung: string | null;
        duong_dan_thanh_toan: string | null;
        so_tien_tt: runtime.Decimal;
        ma_tham_chieu: string | null;
        ma_gd_vnpay: string | null;
        ma_phan_hoi: string | null;
        ma_ngan_hang: string | null;
        thoi_gian_tt_vnpay: string | null;
        trang_thai_giao_dich: string;
        noi_dung_thanh_toan: string | null;
        ngay_tao: Date | null;
    }, ExtArgs["result"]["giaodich"]>;
    composites: {};
};
export type giaodichGetPayload<S extends boolean | null | undefined | giaodichDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$giaodichPayload, S>;
export type giaodichCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<giaodichFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: GiaodichCountAggregateInputType | true;
};
export interface giaodichDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['giaodich'];
        meta: {
            name: 'giaodich';
        };
    };
    /**
     * Find zero or one Giaodich that matches the filter.
     * @param {giaodichFindUniqueArgs} args - Arguments to find a Giaodich
     * @example
     * // Get one Giaodich
     * const giaodich = await prisma.giaodich.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends giaodichFindUniqueArgs>(args: Prisma.SelectSubset<T, giaodichFindUniqueArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Giaodich that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {giaodichFindUniqueOrThrowArgs} args - Arguments to find a Giaodich
     * @example
     * // Get one Giaodich
     * const giaodich = await prisma.giaodich.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends giaodichFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, giaodichFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Giaodich that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichFindFirstArgs} args - Arguments to find a Giaodich
     * @example
     * // Get one Giaodich
     * const giaodich = await prisma.giaodich.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends giaodichFindFirstArgs>(args?: Prisma.SelectSubset<T, giaodichFindFirstArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Giaodich that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichFindFirstOrThrowArgs} args - Arguments to find a Giaodich
     * @example
     * // Get one Giaodich
     * const giaodich = await prisma.giaodich.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends giaodichFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, giaodichFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Giaodiches that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Giaodiches
     * const giaodiches = await prisma.giaodich.findMany()
     *
     * // Get first 10 Giaodiches
     * const giaodiches = await prisma.giaodich.findMany({ take: 10 })
     *
     * // Only select the `ma_giao_dich`
     * const giaodichWithMa_giao_dichOnly = await prisma.giaodich.findMany({ select: { ma_giao_dich: true } })
     *
     */
    findMany<T extends giaodichFindManyArgs>(args?: Prisma.SelectSubset<T, giaodichFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Giaodich.
     * @param {giaodichCreateArgs} args - Arguments to create a Giaodich.
     * @example
     * // Create one Giaodich
     * const Giaodich = await prisma.giaodich.create({
     *   data: {
     *     // ... data to create a Giaodich
     *   }
     * })
     *
     */
    create<T extends giaodichCreateArgs>(args: Prisma.SelectSubset<T, giaodichCreateArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Giaodiches.
     * @param {giaodichCreateManyArgs} args - Arguments to create many Giaodiches.
     * @example
     * // Create many Giaodiches
     * const giaodich = await prisma.giaodich.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends giaodichCreateManyArgs>(args?: Prisma.SelectSubset<T, giaodichCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Giaodiches and returns the data saved in the database.
     * @param {giaodichCreateManyAndReturnArgs} args - Arguments to create many Giaodiches.
     * @example
     * // Create many Giaodiches
     * const giaodich = await prisma.giaodich.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Giaodiches and only return the `ma_giao_dich`
     * const giaodichWithMa_giao_dichOnly = await prisma.giaodich.createManyAndReturn({
     *   select: { ma_giao_dich: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends giaodichCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, giaodichCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Giaodich.
     * @param {giaodichDeleteArgs} args - Arguments to delete one Giaodich.
     * @example
     * // Delete one Giaodich
     * const Giaodich = await prisma.giaodich.delete({
     *   where: {
     *     // ... filter to delete one Giaodich
     *   }
     * })
     *
     */
    delete<T extends giaodichDeleteArgs>(args: Prisma.SelectSubset<T, giaodichDeleteArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Giaodich.
     * @param {giaodichUpdateArgs} args - Arguments to update one Giaodich.
     * @example
     * // Update one Giaodich
     * const giaodich = await prisma.giaodich.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends giaodichUpdateArgs>(args: Prisma.SelectSubset<T, giaodichUpdateArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Giaodiches.
     * @param {giaodichDeleteManyArgs} args - Arguments to filter Giaodiches to delete.
     * @example
     * // Delete a few Giaodiches
     * const { count } = await prisma.giaodich.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends giaodichDeleteManyArgs>(args?: Prisma.SelectSubset<T, giaodichDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Giaodiches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Giaodiches
     * const giaodich = await prisma.giaodich.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends giaodichUpdateManyArgs>(args: Prisma.SelectSubset<T, giaodichUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Giaodiches and returns the data updated in the database.
     * @param {giaodichUpdateManyAndReturnArgs} args - Arguments to update many Giaodiches.
     * @example
     * // Update many Giaodiches
     * const giaodich = await prisma.giaodich.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Giaodiches and only return the `ma_giao_dich`
     * const giaodichWithMa_giao_dichOnly = await prisma.giaodich.updateManyAndReturn({
     *   select: { ma_giao_dich: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends giaodichUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, giaodichUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Giaodich.
     * @param {giaodichUpsertArgs} args - Arguments to update or create a Giaodich.
     * @example
     * // Update or create a Giaodich
     * const giaodich = await prisma.giaodich.upsert({
     *   create: {
     *     // ... data to create a Giaodich
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Giaodich we want to update
     *   }
     * })
     */
    upsert<T extends giaodichUpsertArgs>(args: Prisma.SelectSubset<T, giaodichUpsertArgs<ExtArgs>>): Prisma.Prisma__giaodichClient<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Giaodiches.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichCountArgs} args - Arguments to filter Giaodiches to count.
     * @example
     * // Count the number of Giaodiches
     * const count = await prisma.giaodich.count({
     *   where: {
     *     // ... the filter for the Giaodiches we want to count
     *   }
     * })
    **/
    count<T extends giaodichCountArgs>(args?: Prisma.Subset<T, giaodichCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], GiaodichCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Giaodich.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {GiaodichAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends GiaodichAggregateArgs>(args: Prisma.Subset<T, GiaodichAggregateArgs>): Prisma.PrismaPromise<GetGiaodichAggregateType<T>>;
    /**
     * Group by Giaodich.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {giaodichGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends giaodichGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: giaodichGroupByArgs['orderBy'];
    } : {
        orderBy?: giaodichGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, giaodichGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetGiaodichGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the giaodich model
     */
    readonly fields: giaodichFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for giaodich.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__giaodichClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    datsan<T extends Prisma.giaodich$datsanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.giaodich$datsanArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    nguoidung<T extends Prisma.giaodich$nguoidungArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.giaodich$nguoidungArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the giaodich model
 */
export interface giaodichFieldRefs {
    readonly ma_giao_dich: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ma_dat_san: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ma_nguoi_dung: Prisma.FieldRef<"giaodich", 'String'>;
    readonly duong_dan_thanh_toan: Prisma.FieldRef<"giaodich", 'String'>;
    readonly so_tien_tt: Prisma.FieldRef<"giaodich", 'Decimal'>;
    readonly ma_tham_chieu: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ma_gd_vnpay: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ma_phan_hoi: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ma_ngan_hang: Prisma.FieldRef<"giaodich", 'String'>;
    readonly thoi_gian_tt_vnpay: Prisma.FieldRef<"giaodich", 'String'>;
    readonly trang_thai_giao_dich: Prisma.FieldRef<"giaodich", 'String'>;
    readonly noi_dung_thanh_toan: Prisma.FieldRef<"giaodich", 'String'>;
    readonly ngay_tao: Prisma.FieldRef<"giaodich", 'DateTime'>;
}
/**
 * giaodich findUnique
 */
export type giaodichFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter, which giaodich to fetch.
     */
    where: Prisma.giaodichWhereUniqueInput;
};
/**
 * giaodich findUniqueOrThrow
 */
export type giaodichFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter, which giaodich to fetch.
     */
    where: Prisma.giaodichWhereUniqueInput;
};
/**
 * giaodich findFirst
 */
export type giaodichFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter, which giaodich to fetch.
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of giaodiches to fetch.
     */
    orderBy?: Prisma.giaodichOrderByWithRelationInput | Prisma.giaodichOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for giaodiches.
     */
    cursor?: Prisma.giaodichWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` giaodiches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` giaodiches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of giaodiches.
     */
    distinct?: Prisma.GiaodichScalarFieldEnum | Prisma.GiaodichScalarFieldEnum[];
};
/**
 * giaodich findFirstOrThrow
 */
export type giaodichFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter, which giaodich to fetch.
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of giaodiches to fetch.
     */
    orderBy?: Prisma.giaodichOrderByWithRelationInput | Prisma.giaodichOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for giaodiches.
     */
    cursor?: Prisma.giaodichWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` giaodiches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` giaodiches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of giaodiches.
     */
    distinct?: Prisma.GiaodichScalarFieldEnum | Prisma.GiaodichScalarFieldEnum[];
};
/**
 * giaodich findMany
 */
export type giaodichFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter, which giaodiches to fetch.
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of giaodiches to fetch.
     */
    orderBy?: Prisma.giaodichOrderByWithRelationInput | Prisma.giaodichOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing giaodiches.
     */
    cursor?: Prisma.giaodichWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` giaodiches from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` giaodiches.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of giaodiches.
     */
    distinct?: Prisma.GiaodichScalarFieldEnum | Prisma.GiaodichScalarFieldEnum[];
};
/**
 * giaodich create
 */
export type giaodichCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * The data needed to create a giaodich.
     */
    data: Prisma.XOR<Prisma.giaodichCreateInput, Prisma.giaodichUncheckedCreateInput>;
};
/**
 * giaodich createMany
 */
export type giaodichCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many giaodiches.
     */
    data: Prisma.giaodichCreateManyInput | Prisma.giaodichCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * giaodich createManyAndReturn
 */
export type giaodichCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * The data used to create many giaodiches.
     */
    data: Prisma.giaodichCreateManyInput | Prisma.giaodichCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * giaodich update
 */
export type giaodichUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * The data needed to update a giaodich.
     */
    data: Prisma.XOR<Prisma.giaodichUpdateInput, Prisma.giaodichUncheckedUpdateInput>;
    /**
     * Choose, which giaodich to update.
     */
    where: Prisma.giaodichWhereUniqueInput;
};
/**
 * giaodich updateMany
 */
export type giaodichUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update giaodiches.
     */
    data: Prisma.XOR<Prisma.giaodichUpdateManyMutationInput, Prisma.giaodichUncheckedUpdateManyInput>;
    /**
     * Filter which giaodiches to update
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * Limit how many giaodiches to update.
     */
    limit?: number;
};
/**
 * giaodich updateManyAndReturn
 */
export type giaodichUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * The data used to update giaodiches.
     */
    data: Prisma.XOR<Prisma.giaodichUpdateManyMutationInput, Prisma.giaodichUncheckedUpdateManyInput>;
    /**
     * Filter which giaodiches to update
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * Limit how many giaodiches to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * giaodich upsert
 */
export type giaodichUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * The filter to search for the giaodich to update in case it exists.
     */
    where: Prisma.giaodichWhereUniqueInput;
    /**
     * In case the giaodich found by the `where` argument doesn't exist, create a new giaodich with this data.
     */
    create: Prisma.XOR<Prisma.giaodichCreateInput, Prisma.giaodichUncheckedCreateInput>;
    /**
     * In case the giaodich was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.giaodichUpdateInput, Prisma.giaodichUncheckedUpdateInput>;
};
/**
 * giaodich delete
 */
export type giaodichDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
    /**
     * Filter which giaodich to delete.
     */
    where: Prisma.giaodichWhereUniqueInput;
};
/**
 * giaodich deleteMany
 */
export type giaodichDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which giaodiches to delete
     */
    where?: Prisma.giaodichWhereInput;
    /**
     * Limit how many giaodiches to delete.
     */
    limit?: number;
};
/**
 * giaodich.datsan
 */
export type giaodich$datsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsan
     */
    select?: Prisma.datsanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsan
     */
    omit?: Prisma.datsanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanInclude<ExtArgs> | null;
    where?: Prisma.datsanWhereInput;
};
/**
 * giaodich.nguoidung
 */
export type giaodich$nguoidungArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nguoidung
     */
    select?: Prisma.nguoidungSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the nguoidung
     */
    omit?: Prisma.nguoidungOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.nguoidungInclude<ExtArgs> | null;
    where?: Prisma.nguoidungWhereInput;
};
/**
 * giaodich without action
 */
export type giaodichDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the giaodich
     */
    select?: Prisma.giaodichSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the giaodich
     */
    omit?: Prisma.giaodichOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.giaodichInclude<ExtArgs> | null;
};
//# sourceMappingURL=giaodich.d.ts.map