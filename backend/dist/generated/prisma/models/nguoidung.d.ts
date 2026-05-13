import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model nguoidung
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type nguoidungModel = runtime.Types.Result.DefaultSelection<Prisma.$nguoidungPayload>;
export type AggregateNguoidung = {
    _count: NguoidungCountAggregateOutputType | null;
    _avg: NguoidungAvgAggregateOutputType | null;
    _sum: NguoidungSumAggregateOutputType | null;
    _min: NguoidungMinAggregateOutputType | null;
    _max: NguoidungMaxAggregateOutputType | null;
};
export type NguoidungAvgAggregateOutputType = {
    so_vi_du: runtime.Decimal | null;
};
export type NguoidungSumAggregateOutputType = {
    so_vi_du: runtime.Decimal | null;
};
export type NguoidungMinAggregateOutputType = {
    ma_nguoi_dung: string | null;
    ho_ten: string | null;
    email: string | null;
    so_dien_thoai: string | null;
    mat_khau: string | null;
    ma_google: string | null;
    anh_dai_dien: string | null;
    anh_cloudinary: string | null;
    vai_tro: string | null;
    so_vi_du: runtime.Decimal | null;
    anh_cccd_truoc: string | null;
    anh_cccd_sau: string | null;
    trang_thai: boolean | null;
    ngay_tao: Date | null;
};
export type NguoidungMaxAggregateOutputType = {
    ma_nguoi_dung: string | null;
    ho_ten: string | null;
    email: string | null;
    so_dien_thoai: string | null;
    mat_khau: string | null;
    ma_google: string | null;
    anh_dai_dien: string | null;
    anh_cloudinary: string | null;
    vai_tro: string | null;
    so_vi_du: runtime.Decimal | null;
    anh_cccd_truoc: string | null;
    anh_cccd_sau: string | null;
    trang_thai: boolean | null;
    ngay_tao: Date | null;
};
export type NguoidungCountAggregateOutputType = {
    ma_nguoi_dung: number;
    ho_ten: number;
    email: number;
    so_dien_thoai: number;
    mat_khau: number;
    ma_google: number;
    anh_dai_dien: number;
    anh_cloudinary: number;
    vai_tro: number;
    so_vi_du: number;
    anh_cccd_truoc: number;
    anh_cccd_sau: number;
    trang_thai: number;
    ngay_tao: number;
    _all: number;
};
export type NguoidungAvgAggregateInputType = {
    so_vi_du?: true;
};
export type NguoidungSumAggregateInputType = {
    so_vi_du?: true;
};
export type NguoidungMinAggregateInputType = {
    ma_nguoi_dung?: true;
    ho_ten?: true;
    email?: true;
    so_dien_thoai?: true;
    mat_khau?: true;
    ma_google?: true;
    anh_dai_dien?: true;
    anh_cloudinary?: true;
    vai_tro?: true;
    so_vi_du?: true;
    anh_cccd_truoc?: true;
    anh_cccd_sau?: true;
    trang_thai?: true;
    ngay_tao?: true;
};
export type NguoidungMaxAggregateInputType = {
    ma_nguoi_dung?: true;
    ho_ten?: true;
    email?: true;
    so_dien_thoai?: true;
    mat_khau?: true;
    ma_google?: true;
    anh_dai_dien?: true;
    anh_cloudinary?: true;
    vai_tro?: true;
    so_vi_du?: true;
    anh_cccd_truoc?: true;
    anh_cccd_sau?: true;
    trang_thai?: true;
    ngay_tao?: true;
};
export type NguoidungCountAggregateInputType = {
    ma_nguoi_dung?: true;
    ho_ten?: true;
    email?: true;
    so_dien_thoai?: true;
    mat_khau?: true;
    ma_google?: true;
    anh_dai_dien?: true;
    anh_cloudinary?: true;
    vai_tro?: true;
    so_vi_du?: true;
    anh_cccd_truoc?: true;
    anh_cccd_sau?: true;
    trang_thai?: true;
    ngay_tao?: true;
    _all?: true;
};
export type NguoidungAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which nguoidung to aggregate.
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of nguoidungs to fetch.
     */
    orderBy?: Prisma.nguoidungOrderByWithRelationInput | Prisma.nguoidungOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.nguoidungWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` nguoidungs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` nguoidungs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned nguoidungs
    **/
    _count?: true | NguoidungCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: NguoidungAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: NguoidungSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: NguoidungMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: NguoidungMaxAggregateInputType;
};
export type GetNguoidungAggregateType<T extends NguoidungAggregateArgs> = {
    [P in keyof T & keyof AggregateNguoidung]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateNguoidung[P]> : Prisma.GetScalarType<T[P], AggregateNguoidung[P]>;
};
export type nguoidungGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.nguoidungWhereInput;
    orderBy?: Prisma.nguoidungOrderByWithAggregationInput | Prisma.nguoidungOrderByWithAggregationInput[];
    by: Prisma.NguoidungScalarFieldEnum[] | Prisma.NguoidungScalarFieldEnum;
    having?: Prisma.nguoidungScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: NguoidungCountAggregateInputType | true;
    _avg?: NguoidungAvgAggregateInputType;
    _sum?: NguoidungSumAggregateInputType;
    _min?: NguoidungMinAggregateInputType;
    _max?: NguoidungMaxAggregateInputType;
};
export type NguoidungGroupByOutputType = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai: string | null;
    mat_khau: string | null;
    ma_google: string | null;
    anh_dai_dien: string | null;
    anh_cloudinary: string | null;
    vai_tro: string;
    so_vi_du: runtime.Decimal;
    anh_cccd_truoc: string | null;
    anh_cccd_sau: string | null;
    trang_thai: boolean | null;
    ngay_tao: Date | null;
    _count: NguoidungCountAggregateOutputType | null;
    _avg: NguoidungAvgAggregateOutputType | null;
    _sum: NguoidungSumAggregateOutputType | null;
    _min: NguoidungMinAggregateOutputType | null;
    _max: NguoidungMaxAggregateOutputType | null;
};
export type GetNguoidungGroupByPayload<T extends nguoidungGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<NguoidungGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof NguoidungGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], NguoidungGroupByOutputType[P]> : Prisma.GetScalarType<T[P], NguoidungGroupByOutputType[P]>;
}>>;
export type nguoidungWhereInput = {
    AND?: Prisma.nguoidungWhereInput | Prisma.nguoidungWhereInput[];
    OR?: Prisma.nguoidungWhereInput[];
    NOT?: Prisma.nguoidungWhereInput | Prisma.nguoidungWhereInput[];
    ma_nguoi_dung?: Prisma.StringFilter<"nguoidung"> | string;
    ho_ten?: Prisma.StringFilter<"nguoidung"> | string;
    email?: Prisma.StringFilter<"nguoidung"> | string;
    so_dien_thoai?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    mat_khau?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    ma_google?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_dai_dien?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_cloudinary?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    vai_tro?: Prisma.StringFilter<"nguoidung"> | string;
    so_vi_du?: Prisma.DecimalFilter<"nguoidung"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_cccd_sau?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    trang_thai?: Prisma.BoolNullableFilter<"nguoidung"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"nguoidung"> | Date | string | null;
    danhgia?: Prisma.DanhgiaListRelationFilter;
    datsan?: Prisma.DatsanListRelationFilter;
    diadiem?: Prisma.DiadiemListRelationFilter;
    giaodich?: Prisma.GiaodichListRelationFilter;
};
export type nguoidungOrderByWithRelationInput = {
    ma_nguoi_dung?: Prisma.SortOrder;
    ho_ten?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    so_dien_thoai?: Prisma.SortOrderInput | Prisma.SortOrder;
    mat_khau?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_google?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_dai_dien?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_cloudinary?: Prisma.SortOrderInput | Prisma.SortOrder;
    vai_tro?: Prisma.SortOrder;
    so_vi_du?: Prisma.SortOrder;
    anh_cccd_truoc?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_cccd_sau?: Prisma.SortOrderInput | Prisma.SortOrder;
    trang_thai?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    danhgia?: Prisma.danhgiaOrderByRelationAggregateInput;
    datsan?: Prisma.datsanOrderByRelationAggregateInput;
    diadiem?: Prisma.diadiemOrderByRelationAggregateInput;
    giaodich?: Prisma.giaodichOrderByRelationAggregateInput;
};
export type nguoidungWhereUniqueInput = Prisma.AtLeast<{
    ma_nguoi_dung?: string;
    email?: string;
    so_dien_thoai?: string;
    ma_google?: string;
    AND?: Prisma.nguoidungWhereInput | Prisma.nguoidungWhereInput[];
    OR?: Prisma.nguoidungWhereInput[];
    NOT?: Prisma.nguoidungWhereInput | Prisma.nguoidungWhereInput[];
    ho_ten?: Prisma.StringFilter<"nguoidung"> | string;
    mat_khau?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_dai_dien?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_cloudinary?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    vai_tro?: Prisma.StringFilter<"nguoidung"> | string;
    so_vi_du?: Prisma.DecimalFilter<"nguoidung"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    anh_cccd_sau?: Prisma.StringNullableFilter<"nguoidung"> | string | null;
    trang_thai?: Prisma.BoolNullableFilter<"nguoidung"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"nguoidung"> | Date | string | null;
    danhgia?: Prisma.DanhgiaListRelationFilter;
    datsan?: Prisma.DatsanListRelationFilter;
    diadiem?: Prisma.DiadiemListRelationFilter;
    giaodich?: Prisma.GiaodichListRelationFilter;
}, "ma_nguoi_dung" | "email" | "so_dien_thoai" | "ma_google">;
export type nguoidungOrderByWithAggregationInput = {
    ma_nguoi_dung?: Prisma.SortOrder;
    ho_ten?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    so_dien_thoai?: Prisma.SortOrderInput | Prisma.SortOrder;
    mat_khau?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_google?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_dai_dien?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_cloudinary?: Prisma.SortOrderInput | Prisma.SortOrder;
    vai_tro?: Prisma.SortOrder;
    so_vi_du?: Prisma.SortOrder;
    anh_cccd_truoc?: Prisma.SortOrderInput | Prisma.SortOrder;
    anh_cccd_sau?: Prisma.SortOrderInput | Prisma.SortOrder;
    trang_thai?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.nguoidungCountOrderByAggregateInput;
    _avg?: Prisma.nguoidungAvgOrderByAggregateInput;
    _max?: Prisma.nguoidungMaxOrderByAggregateInput;
    _min?: Prisma.nguoidungMinOrderByAggregateInput;
    _sum?: Prisma.nguoidungSumOrderByAggregateInput;
};
export type nguoidungScalarWhereWithAggregatesInput = {
    AND?: Prisma.nguoidungScalarWhereWithAggregatesInput | Prisma.nguoidungScalarWhereWithAggregatesInput[];
    OR?: Prisma.nguoidungScalarWhereWithAggregatesInput[];
    NOT?: Prisma.nguoidungScalarWhereWithAggregatesInput | Prisma.nguoidungScalarWhereWithAggregatesInput[];
    ma_nguoi_dung?: Prisma.StringWithAggregatesFilter<"nguoidung"> | string;
    ho_ten?: Prisma.StringWithAggregatesFilter<"nguoidung"> | string;
    email?: Prisma.StringWithAggregatesFilter<"nguoidung"> | string;
    so_dien_thoai?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    mat_khau?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    ma_google?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    anh_dai_dien?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    anh_cloudinary?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    vai_tro?: Prisma.StringWithAggregatesFilter<"nguoidung"> | string;
    so_vi_du?: Prisma.DecimalWithAggregatesFilter<"nguoidung"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    anh_cccd_sau?: Prisma.StringNullableWithAggregatesFilter<"nguoidung"> | string | null;
    trang_thai?: Prisma.BoolNullableWithAggregatesFilter<"nguoidung"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableWithAggregatesFilter<"nguoidung"> | Date | string | null;
};
export type nguoidungCreateInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUncheckedCreateInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanUncheckedCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemUncheckedCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUpdateInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungUncheckedUpdateInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUncheckedUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUncheckedUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungCreateManyInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
};
export type nguoidungUpdateManyMutationInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type nguoidungUncheckedUpdateManyInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type NguoidungNullableScalarRelationFilter = {
    is?: Prisma.nguoidungWhereInput | null;
    isNot?: Prisma.nguoidungWhereInput | null;
};
export type nguoidungCountOrderByAggregateInput = {
    ma_nguoi_dung?: Prisma.SortOrder;
    ho_ten?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    so_dien_thoai?: Prisma.SortOrder;
    mat_khau?: Prisma.SortOrder;
    ma_google?: Prisma.SortOrder;
    anh_dai_dien?: Prisma.SortOrder;
    anh_cloudinary?: Prisma.SortOrder;
    vai_tro?: Prisma.SortOrder;
    so_vi_du?: Prisma.SortOrder;
    anh_cccd_truoc?: Prisma.SortOrder;
    anh_cccd_sau?: Prisma.SortOrder;
    trang_thai?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type nguoidungAvgOrderByAggregateInput = {
    so_vi_du?: Prisma.SortOrder;
};
export type nguoidungMaxOrderByAggregateInput = {
    ma_nguoi_dung?: Prisma.SortOrder;
    ho_ten?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    so_dien_thoai?: Prisma.SortOrder;
    mat_khau?: Prisma.SortOrder;
    ma_google?: Prisma.SortOrder;
    anh_dai_dien?: Prisma.SortOrder;
    anh_cloudinary?: Prisma.SortOrder;
    vai_tro?: Prisma.SortOrder;
    so_vi_du?: Prisma.SortOrder;
    anh_cccd_truoc?: Prisma.SortOrder;
    anh_cccd_sau?: Prisma.SortOrder;
    trang_thai?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type nguoidungMinOrderByAggregateInput = {
    ma_nguoi_dung?: Prisma.SortOrder;
    ho_ten?: Prisma.SortOrder;
    email?: Prisma.SortOrder;
    so_dien_thoai?: Prisma.SortOrder;
    mat_khau?: Prisma.SortOrder;
    ma_google?: Prisma.SortOrder;
    anh_dai_dien?: Prisma.SortOrder;
    anh_cloudinary?: Prisma.SortOrder;
    vai_tro?: Prisma.SortOrder;
    so_vi_du?: Prisma.SortOrder;
    anh_cccd_truoc?: Prisma.SortOrder;
    anh_cccd_sau?: Prisma.SortOrder;
    trang_thai?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type nguoidungSumOrderByAggregateInput = {
    so_vi_du?: Prisma.SortOrder;
};
export type nguoidungCreateNestedOneWithoutDanhgiaInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDanhgiaInput, Prisma.nguoidungUncheckedCreateWithoutDanhgiaInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDanhgiaInput;
    connect?: Prisma.nguoidungWhereUniqueInput;
};
export type nguoidungUpdateOneWithoutDanhgiaNestedInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDanhgiaInput, Prisma.nguoidungUncheckedCreateWithoutDanhgiaInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDanhgiaInput;
    upsert?: Prisma.nguoidungUpsertWithoutDanhgiaInput;
    disconnect?: Prisma.nguoidungWhereInput | boolean;
    delete?: Prisma.nguoidungWhereInput | boolean;
    connect?: Prisma.nguoidungWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.nguoidungUpdateToOneWithWhereWithoutDanhgiaInput, Prisma.nguoidungUpdateWithoutDanhgiaInput>, Prisma.nguoidungUncheckedUpdateWithoutDanhgiaInput>;
};
export type nguoidungCreateNestedOneWithoutDatsanInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDatsanInput, Prisma.nguoidungUncheckedCreateWithoutDatsanInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDatsanInput;
    connect?: Prisma.nguoidungWhereUniqueInput;
};
export type nguoidungUpdateOneWithoutDatsanNestedInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDatsanInput, Prisma.nguoidungUncheckedCreateWithoutDatsanInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDatsanInput;
    upsert?: Prisma.nguoidungUpsertWithoutDatsanInput;
    disconnect?: Prisma.nguoidungWhereInput | boolean;
    delete?: Prisma.nguoidungWhereInput | boolean;
    connect?: Prisma.nguoidungWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.nguoidungUpdateToOneWithWhereWithoutDatsanInput, Prisma.nguoidungUpdateWithoutDatsanInput>, Prisma.nguoidungUncheckedUpdateWithoutDatsanInput>;
};
export type nguoidungCreateNestedOneWithoutDiadiemInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDiadiemInput, Prisma.nguoidungUncheckedCreateWithoutDiadiemInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDiadiemInput;
    connect?: Prisma.nguoidungWhereUniqueInput;
};
export type nguoidungUpdateOneWithoutDiadiemNestedInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutDiadiemInput, Prisma.nguoidungUncheckedCreateWithoutDiadiemInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutDiadiemInput;
    upsert?: Prisma.nguoidungUpsertWithoutDiadiemInput;
    disconnect?: Prisma.nguoidungWhereInput | boolean;
    delete?: Prisma.nguoidungWhereInput | boolean;
    connect?: Prisma.nguoidungWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.nguoidungUpdateToOneWithWhereWithoutDiadiemInput, Prisma.nguoidungUpdateWithoutDiadiemInput>, Prisma.nguoidungUncheckedUpdateWithoutDiadiemInput>;
};
export type nguoidungCreateNestedOneWithoutGiaodichInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutGiaodichInput, Prisma.nguoidungUncheckedCreateWithoutGiaodichInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutGiaodichInput;
    connect?: Prisma.nguoidungWhereUniqueInput;
};
export type nguoidungUpdateOneWithoutGiaodichNestedInput = {
    create?: Prisma.XOR<Prisma.nguoidungCreateWithoutGiaodichInput, Prisma.nguoidungUncheckedCreateWithoutGiaodichInput>;
    connectOrCreate?: Prisma.nguoidungCreateOrConnectWithoutGiaodichInput;
    upsert?: Prisma.nguoidungUpsertWithoutGiaodichInput;
    disconnect?: Prisma.nguoidungWhereInput | boolean;
    delete?: Prisma.nguoidungWhereInput | boolean;
    connect?: Prisma.nguoidungWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.nguoidungUpdateToOneWithWhereWithoutGiaodichInput, Prisma.nguoidungUpdateWithoutGiaodichInput>, Prisma.nguoidungUncheckedUpdateWithoutGiaodichInput>;
};
export type nguoidungCreateWithoutDanhgiaInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    datsan?: Prisma.datsanCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUncheckedCreateWithoutDanhgiaInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    datsan?: Prisma.datsanUncheckedCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemUncheckedCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungCreateOrConnectWithoutDanhgiaInput = {
    where: Prisma.nguoidungWhereUniqueInput;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDanhgiaInput, Prisma.nguoidungUncheckedCreateWithoutDanhgiaInput>;
};
export type nguoidungUpsertWithoutDanhgiaInput = {
    update: Prisma.XOR<Prisma.nguoidungUpdateWithoutDanhgiaInput, Prisma.nguoidungUncheckedUpdateWithoutDanhgiaInput>;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDanhgiaInput, Prisma.nguoidungUncheckedCreateWithoutDanhgiaInput>;
    where?: Prisma.nguoidungWhereInput;
};
export type nguoidungUpdateToOneWithWhereWithoutDanhgiaInput = {
    where?: Prisma.nguoidungWhereInput;
    data: Prisma.XOR<Prisma.nguoidungUpdateWithoutDanhgiaInput, Prisma.nguoidungUncheckedUpdateWithoutDanhgiaInput>;
};
export type nguoidungUpdateWithoutDanhgiaInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsan?: Prisma.datsanUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungUncheckedUpdateWithoutDanhgiaInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsan?: Prisma.datsanUncheckedUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUncheckedUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungCreateWithoutDatsanInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUncheckedCreateWithoutDatsanInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemUncheckedCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungCreateOrConnectWithoutDatsanInput = {
    where: Prisma.nguoidungWhereUniqueInput;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDatsanInput, Prisma.nguoidungUncheckedCreateWithoutDatsanInput>;
};
export type nguoidungUpsertWithoutDatsanInput = {
    update: Prisma.XOR<Prisma.nguoidungUpdateWithoutDatsanInput, Prisma.nguoidungUncheckedUpdateWithoutDatsanInput>;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDatsanInput, Prisma.nguoidungUncheckedCreateWithoutDatsanInput>;
    where?: Prisma.nguoidungWhereInput;
};
export type nguoidungUpdateToOneWithWhereWithoutDatsanInput = {
    where?: Prisma.nguoidungWhereInput;
    data: Prisma.XOR<Prisma.nguoidungUpdateWithoutDatsanInput, Prisma.nguoidungUncheckedUpdateWithoutDatsanInput>;
};
export type nguoidungUpdateWithoutDatsanInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungUncheckedUpdateWithoutDatsanInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUncheckedUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungCreateWithoutDiadiemInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUncheckedCreateWithoutDiadiemInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanUncheckedCreateNestedManyWithoutNguoidungInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungCreateOrConnectWithoutDiadiemInput = {
    where: Prisma.nguoidungWhereUniqueInput;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDiadiemInput, Prisma.nguoidungUncheckedCreateWithoutDiadiemInput>;
};
export type nguoidungUpsertWithoutDiadiemInput = {
    update: Prisma.XOR<Prisma.nguoidungUpdateWithoutDiadiemInput, Prisma.nguoidungUncheckedUpdateWithoutDiadiemInput>;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutDiadiemInput, Prisma.nguoidungUncheckedCreateWithoutDiadiemInput>;
    where?: Prisma.nguoidungWhereInput;
};
export type nguoidungUpdateToOneWithWhereWithoutDiadiemInput = {
    where?: Prisma.nguoidungWhereInput;
    data: Prisma.XOR<Prisma.nguoidungUpdateWithoutDiadiemInput, Prisma.nguoidungUncheckedUpdateWithoutDiadiemInput>;
};
export type nguoidungUpdateWithoutDiadiemInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungUncheckedUpdateWithoutDiadiemInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUncheckedUpdateManyWithoutNguoidungNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungCreateWithoutGiaodichInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungUncheckedCreateWithoutGiaodichInput = {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string | null;
    mat_khau?: string | null;
    ma_google?: string | null;
    anh_dai_dien?: string | null;
    anh_cloudinary?: string | null;
    vai_tro?: string;
    so_vi_du?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: string | null;
    anh_cccd_sau?: string | null;
    trang_thai?: boolean | null;
    ngay_tao?: Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutNguoidungInput;
    datsan?: Prisma.datsanUncheckedCreateNestedManyWithoutNguoidungInput;
    diadiem?: Prisma.diadiemUncheckedCreateNestedManyWithoutNguoidungInput;
};
export type nguoidungCreateOrConnectWithoutGiaodichInput = {
    where: Prisma.nguoidungWhereUniqueInput;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutGiaodichInput, Prisma.nguoidungUncheckedCreateWithoutGiaodichInput>;
};
export type nguoidungUpsertWithoutGiaodichInput = {
    update: Prisma.XOR<Prisma.nguoidungUpdateWithoutGiaodichInput, Prisma.nguoidungUncheckedUpdateWithoutGiaodichInput>;
    create: Prisma.XOR<Prisma.nguoidungCreateWithoutGiaodichInput, Prisma.nguoidungUncheckedCreateWithoutGiaodichInput>;
    where?: Prisma.nguoidungWhereInput;
};
export type nguoidungUpdateToOneWithWhereWithoutGiaodichInput = {
    where?: Prisma.nguoidungWhereInput;
    data: Prisma.XOR<Prisma.nguoidungUpdateWithoutGiaodichInput, Prisma.nguoidungUncheckedUpdateWithoutGiaodichInput>;
};
export type nguoidungUpdateWithoutGiaodichInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUpdateManyWithoutNguoidungNestedInput;
};
export type nguoidungUncheckedUpdateWithoutGiaodichInput = {
    ma_nguoi_dung?: Prisma.StringFieldUpdateOperationsInput | string;
    ho_ten?: Prisma.StringFieldUpdateOperationsInput | string;
    email?: Prisma.StringFieldUpdateOperationsInput | string;
    so_dien_thoai?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    mat_khau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_google?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_dai_dien?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cloudinary?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    vai_tro?: Prisma.StringFieldUpdateOperationsInput | string;
    so_vi_du?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    anh_cccd_truoc?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    anh_cccd_sau?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    trang_thai?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutNguoidungNestedInput;
    datsan?: Prisma.datsanUncheckedUpdateManyWithoutNguoidungNestedInput;
    diadiem?: Prisma.diadiemUncheckedUpdateManyWithoutNguoidungNestedInput;
};
/**
 * Count Type NguoidungCountOutputType
 */
export type NguoidungCountOutputType = {
    danhgia: number;
    datsan: number;
    diadiem: number;
    giaodich: number;
};
export type NguoidungCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    danhgia?: boolean | NguoidungCountOutputTypeCountDanhgiaArgs;
    datsan?: boolean | NguoidungCountOutputTypeCountDatsanArgs;
    diadiem?: boolean | NguoidungCountOutputTypeCountDiadiemArgs;
    giaodich?: boolean | NguoidungCountOutputTypeCountGiaodichArgs;
};
/**
 * NguoidungCountOutputType without action
 */
export type NguoidungCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the NguoidungCountOutputType
     */
    select?: Prisma.NguoidungCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * NguoidungCountOutputType without action
 */
export type NguoidungCountOutputTypeCountDanhgiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.danhgiaWhereInput;
};
/**
 * NguoidungCountOutputType without action
 */
export type NguoidungCountOutputTypeCountDatsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.datsanWhereInput;
};
/**
 * NguoidungCountOutputType without action
 */
export type NguoidungCountOutputTypeCountDiadiemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.diadiemWhereInput;
};
/**
 * NguoidungCountOutputType without action
 */
export type NguoidungCountOutputTypeCountGiaodichArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.giaodichWhereInput;
};
export type nguoidungSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_nguoi_dung?: boolean;
    ho_ten?: boolean;
    email?: boolean;
    so_dien_thoai?: boolean;
    mat_khau?: boolean;
    ma_google?: boolean;
    anh_dai_dien?: boolean;
    anh_cloudinary?: boolean;
    vai_tro?: boolean;
    so_vi_du?: boolean;
    anh_cccd_truoc?: boolean;
    anh_cccd_sau?: boolean;
    trang_thai?: boolean;
    ngay_tao?: boolean;
    danhgia?: boolean | Prisma.nguoidung$danhgiaArgs<ExtArgs>;
    datsan?: boolean | Prisma.nguoidung$datsanArgs<ExtArgs>;
    diadiem?: boolean | Prisma.nguoidung$diadiemArgs<ExtArgs>;
    giaodich?: boolean | Prisma.nguoidung$giaodichArgs<ExtArgs>;
    _count?: boolean | Prisma.NguoidungCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["nguoidung"]>;
export type nguoidungSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_nguoi_dung?: boolean;
    ho_ten?: boolean;
    email?: boolean;
    so_dien_thoai?: boolean;
    mat_khau?: boolean;
    ma_google?: boolean;
    anh_dai_dien?: boolean;
    anh_cloudinary?: boolean;
    vai_tro?: boolean;
    so_vi_du?: boolean;
    anh_cccd_truoc?: boolean;
    anh_cccd_sau?: boolean;
    trang_thai?: boolean;
    ngay_tao?: boolean;
}, ExtArgs["result"]["nguoidung"]>;
export type nguoidungSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_nguoi_dung?: boolean;
    ho_ten?: boolean;
    email?: boolean;
    so_dien_thoai?: boolean;
    mat_khau?: boolean;
    ma_google?: boolean;
    anh_dai_dien?: boolean;
    anh_cloudinary?: boolean;
    vai_tro?: boolean;
    so_vi_du?: boolean;
    anh_cccd_truoc?: boolean;
    anh_cccd_sau?: boolean;
    trang_thai?: boolean;
    ngay_tao?: boolean;
}, ExtArgs["result"]["nguoidung"]>;
export type nguoidungSelectScalar = {
    ma_nguoi_dung?: boolean;
    ho_ten?: boolean;
    email?: boolean;
    so_dien_thoai?: boolean;
    mat_khau?: boolean;
    ma_google?: boolean;
    anh_dai_dien?: boolean;
    anh_cloudinary?: boolean;
    vai_tro?: boolean;
    so_vi_du?: boolean;
    anh_cccd_truoc?: boolean;
    anh_cccd_sau?: boolean;
    trang_thai?: boolean;
    ngay_tao?: boolean;
};
export type nguoidungOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_nguoi_dung" | "ho_ten" | "email" | "so_dien_thoai" | "mat_khau" | "ma_google" | "anh_dai_dien" | "anh_cloudinary" | "vai_tro" | "so_vi_du" | "anh_cccd_truoc" | "anh_cccd_sau" | "trang_thai" | "ngay_tao", ExtArgs["result"]["nguoidung"]>;
export type nguoidungInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    danhgia?: boolean | Prisma.nguoidung$danhgiaArgs<ExtArgs>;
    datsan?: boolean | Prisma.nguoidung$datsanArgs<ExtArgs>;
    diadiem?: boolean | Prisma.nguoidung$diadiemArgs<ExtArgs>;
    giaodich?: boolean | Prisma.nguoidung$giaodichArgs<ExtArgs>;
    _count?: boolean | Prisma.NguoidungCountOutputTypeDefaultArgs<ExtArgs>;
};
export type nguoidungIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type nguoidungIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {};
export type $nguoidungPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "nguoidung";
    objects: {
        danhgia: Prisma.$danhgiaPayload<ExtArgs>[];
        datsan: Prisma.$datsanPayload<ExtArgs>[];
        diadiem: Prisma.$diadiemPayload<ExtArgs>[];
        giaodich: Prisma.$giaodichPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_nguoi_dung: string;
        ho_ten: string;
        email: string;
        so_dien_thoai: string | null;
        mat_khau: string | null;
        ma_google: string | null;
        anh_dai_dien: string | null;
        anh_cloudinary: string | null;
        vai_tro: string;
        so_vi_du: runtime.Decimal;
        anh_cccd_truoc: string | null;
        anh_cccd_sau: string | null;
        trang_thai: boolean | null;
        ngay_tao: Date | null;
    }, ExtArgs["result"]["nguoidung"]>;
    composites: {};
};
export type nguoidungGetPayload<S extends boolean | null | undefined | nguoidungDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$nguoidungPayload, S>;
export type nguoidungCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<nguoidungFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: NguoidungCountAggregateInputType | true;
};
export interface nguoidungDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['nguoidung'];
        meta: {
            name: 'nguoidung';
        };
    };
    /**
     * Find zero or one Nguoidung that matches the filter.
     * @param {nguoidungFindUniqueArgs} args - Arguments to find a Nguoidung
     * @example
     * // Get one Nguoidung
     * const nguoidung = await prisma.nguoidung.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends nguoidungFindUniqueArgs>(args: Prisma.SelectSubset<T, nguoidungFindUniqueArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Nguoidung that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {nguoidungFindUniqueOrThrowArgs} args - Arguments to find a Nguoidung
     * @example
     * // Get one Nguoidung
     * const nguoidung = await prisma.nguoidung.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends nguoidungFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, nguoidungFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Nguoidung that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungFindFirstArgs} args - Arguments to find a Nguoidung
     * @example
     * // Get one Nguoidung
     * const nguoidung = await prisma.nguoidung.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends nguoidungFindFirstArgs>(args?: Prisma.SelectSubset<T, nguoidungFindFirstArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Nguoidung that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungFindFirstOrThrowArgs} args - Arguments to find a Nguoidung
     * @example
     * // Get one Nguoidung
     * const nguoidung = await prisma.nguoidung.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends nguoidungFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, nguoidungFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Nguoidungs that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Nguoidungs
     * const nguoidungs = await prisma.nguoidung.findMany()
     *
     * // Get first 10 Nguoidungs
     * const nguoidungs = await prisma.nguoidung.findMany({ take: 10 })
     *
     * // Only select the `ma_nguoi_dung`
     * const nguoidungWithMa_nguoi_dungOnly = await prisma.nguoidung.findMany({ select: { ma_nguoi_dung: true } })
     *
     */
    findMany<T extends nguoidungFindManyArgs>(args?: Prisma.SelectSubset<T, nguoidungFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Nguoidung.
     * @param {nguoidungCreateArgs} args - Arguments to create a Nguoidung.
     * @example
     * // Create one Nguoidung
     * const Nguoidung = await prisma.nguoidung.create({
     *   data: {
     *     // ... data to create a Nguoidung
     *   }
     * })
     *
     */
    create<T extends nguoidungCreateArgs>(args: Prisma.SelectSubset<T, nguoidungCreateArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Nguoidungs.
     * @param {nguoidungCreateManyArgs} args - Arguments to create many Nguoidungs.
     * @example
     * // Create many Nguoidungs
     * const nguoidung = await prisma.nguoidung.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends nguoidungCreateManyArgs>(args?: Prisma.SelectSubset<T, nguoidungCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Nguoidungs and returns the data saved in the database.
     * @param {nguoidungCreateManyAndReturnArgs} args - Arguments to create many Nguoidungs.
     * @example
     * // Create many Nguoidungs
     * const nguoidung = await prisma.nguoidung.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Nguoidungs and only return the `ma_nguoi_dung`
     * const nguoidungWithMa_nguoi_dungOnly = await prisma.nguoidung.createManyAndReturn({
     *   select: { ma_nguoi_dung: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends nguoidungCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, nguoidungCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Nguoidung.
     * @param {nguoidungDeleteArgs} args - Arguments to delete one Nguoidung.
     * @example
     * // Delete one Nguoidung
     * const Nguoidung = await prisma.nguoidung.delete({
     *   where: {
     *     // ... filter to delete one Nguoidung
     *   }
     * })
     *
     */
    delete<T extends nguoidungDeleteArgs>(args: Prisma.SelectSubset<T, nguoidungDeleteArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Nguoidung.
     * @param {nguoidungUpdateArgs} args - Arguments to update one Nguoidung.
     * @example
     * // Update one Nguoidung
     * const nguoidung = await prisma.nguoidung.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends nguoidungUpdateArgs>(args: Prisma.SelectSubset<T, nguoidungUpdateArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Nguoidungs.
     * @param {nguoidungDeleteManyArgs} args - Arguments to filter Nguoidungs to delete.
     * @example
     * // Delete a few Nguoidungs
     * const { count } = await prisma.nguoidung.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends nguoidungDeleteManyArgs>(args?: Prisma.SelectSubset<T, nguoidungDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Nguoidungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Nguoidungs
     * const nguoidung = await prisma.nguoidung.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends nguoidungUpdateManyArgs>(args: Prisma.SelectSubset<T, nguoidungUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Nguoidungs and returns the data updated in the database.
     * @param {nguoidungUpdateManyAndReturnArgs} args - Arguments to update many Nguoidungs.
     * @example
     * // Update many Nguoidungs
     * const nguoidung = await prisma.nguoidung.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Nguoidungs and only return the `ma_nguoi_dung`
     * const nguoidungWithMa_nguoi_dungOnly = await prisma.nguoidung.updateManyAndReturn({
     *   select: { ma_nguoi_dung: true },
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
    updateManyAndReturn<T extends nguoidungUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, nguoidungUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Nguoidung.
     * @param {nguoidungUpsertArgs} args - Arguments to update or create a Nguoidung.
     * @example
     * // Update or create a Nguoidung
     * const nguoidung = await prisma.nguoidung.upsert({
     *   create: {
     *     // ... data to create a Nguoidung
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Nguoidung we want to update
     *   }
     * })
     */
    upsert<T extends nguoidungUpsertArgs>(args: Prisma.SelectSubset<T, nguoidungUpsertArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Nguoidungs.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungCountArgs} args - Arguments to filter Nguoidungs to count.
     * @example
     * // Count the number of Nguoidungs
     * const count = await prisma.nguoidung.count({
     *   where: {
     *     // ... the filter for the Nguoidungs we want to count
     *   }
     * })
    **/
    count<T extends nguoidungCountArgs>(args?: Prisma.Subset<T, nguoidungCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], NguoidungCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Nguoidung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {NguoidungAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends NguoidungAggregateArgs>(args: Prisma.Subset<T, NguoidungAggregateArgs>): Prisma.PrismaPromise<GetNguoidungAggregateType<T>>;
    /**
     * Group by Nguoidung.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {nguoidungGroupByArgs} args - Group by arguments.
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
    groupBy<T extends nguoidungGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: nguoidungGroupByArgs['orderBy'];
    } : {
        orderBy?: nguoidungGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, nguoidungGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetNguoidungGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the nguoidung model
     */
    readonly fields: nguoidungFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for nguoidung.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__nguoidungClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    danhgia<T extends Prisma.nguoidung$danhgiaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.nguoidung$danhgiaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    datsan<T extends Prisma.nguoidung$datsanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.nguoidung$datsanArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    diadiem<T extends Prisma.nguoidung$diadiemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.nguoidung$diadiemArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    giaodich<T extends Prisma.nguoidung$giaodichArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.nguoidung$giaodichArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the nguoidung model
 */
export interface nguoidungFieldRefs {
    readonly ma_nguoi_dung: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly ho_ten: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly email: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly so_dien_thoai: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly mat_khau: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly ma_google: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly anh_dai_dien: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly anh_cloudinary: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly vai_tro: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly so_vi_du: Prisma.FieldRef<"nguoidung", 'Decimal'>;
    readonly anh_cccd_truoc: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly anh_cccd_sau: Prisma.FieldRef<"nguoidung", 'String'>;
    readonly trang_thai: Prisma.FieldRef<"nguoidung", 'Boolean'>;
    readonly ngay_tao: Prisma.FieldRef<"nguoidung", 'DateTime'>;
}
/**
 * nguoidung findUnique
 */
export type nguoidungFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which nguoidung to fetch.
     */
    where: Prisma.nguoidungWhereUniqueInput;
};
/**
 * nguoidung findUniqueOrThrow
 */
export type nguoidungFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which nguoidung to fetch.
     */
    where: Prisma.nguoidungWhereUniqueInput;
};
/**
 * nguoidung findFirst
 */
export type nguoidungFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which nguoidung to fetch.
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of nguoidungs to fetch.
     */
    orderBy?: Prisma.nguoidungOrderByWithRelationInput | Prisma.nguoidungOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for nguoidungs.
     */
    cursor?: Prisma.nguoidungWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` nguoidungs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` nguoidungs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of nguoidungs.
     */
    distinct?: Prisma.NguoidungScalarFieldEnum | Prisma.NguoidungScalarFieldEnum[];
};
/**
 * nguoidung findFirstOrThrow
 */
export type nguoidungFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which nguoidung to fetch.
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of nguoidungs to fetch.
     */
    orderBy?: Prisma.nguoidungOrderByWithRelationInput | Prisma.nguoidungOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for nguoidungs.
     */
    cursor?: Prisma.nguoidungWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` nguoidungs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` nguoidungs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of nguoidungs.
     */
    distinct?: Prisma.NguoidungScalarFieldEnum | Prisma.NguoidungScalarFieldEnum[];
};
/**
 * nguoidung findMany
 */
export type nguoidungFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which nguoidungs to fetch.
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of nguoidungs to fetch.
     */
    orderBy?: Prisma.nguoidungOrderByWithRelationInput | Prisma.nguoidungOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing nguoidungs.
     */
    cursor?: Prisma.nguoidungWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` nguoidungs from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` nguoidungs.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of nguoidungs.
     */
    distinct?: Prisma.NguoidungScalarFieldEnum | Prisma.NguoidungScalarFieldEnum[];
};
/**
 * nguoidung create
 */
export type nguoidungCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a nguoidung.
     */
    data: Prisma.XOR<Prisma.nguoidungCreateInput, Prisma.nguoidungUncheckedCreateInput>;
};
/**
 * nguoidung createMany
 */
export type nguoidungCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many nguoidungs.
     */
    data: Prisma.nguoidungCreateManyInput | Prisma.nguoidungCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * nguoidung createManyAndReturn
 */
export type nguoidungCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nguoidung
     */
    select?: Prisma.nguoidungSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the nguoidung
     */
    omit?: Prisma.nguoidungOmit<ExtArgs> | null;
    /**
     * The data used to create many nguoidungs.
     */
    data: Prisma.nguoidungCreateManyInput | Prisma.nguoidungCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * nguoidung update
 */
export type nguoidungUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a nguoidung.
     */
    data: Prisma.XOR<Prisma.nguoidungUpdateInput, Prisma.nguoidungUncheckedUpdateInput>;
    /**
     * Choose, which nguoidung to update.
     */
    where: Prisma.nguoidungWhereUniqueInput;
};
/**
 * nguoidung updateMany
 */
export type nguoidungUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update nguoidungs.
     */
    data: Prisma.XOR<Prisma.nguoidungUpdateManyMutationInput, Prisma.nguoidungUncheckedUpdateManyInput>;
    /**
     * Filter which nguoidungs to update
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * Limit how many nguoidungs to update.
     */
    limit?: number;
};
/**
 * nguoidung updateManyAndReturn
 */
export type nguoidungUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the nguoidung
     */
    select?: Prisma.nguoidungSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the nguoidung
     */
    omit?: Prisma.nguoidungOmit<ExtArgs> | null;
    /**
     * The data used to update nguoidungs.
     */
    data: Prisma.XOR<Prisma.nguoidungUpdateManyMutationInput, Prisma.nguoidungUncheckedUpdateManyInput>;
    /**
     * Filter which nguoidungs to update
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * Limit how many nguoidungs to update.
     */
    limit?: number;
};
/**
 * nguoidung upsert
 */
export type nguoidungUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the nguoidung to update in case it exists.
     */
    where: Prisma.nguoidungWhereUniqueInput;
    /**
     * In case the nguoidung found by the `where` argument doesn't exist, create a new nguoidung with this data.
     */
    create: Prisma.XOR<Prisma.nguoidungCreateInput, Prisma.nguoidungUncheckedCreateInput>;
    /**
     * In case the nguoidung was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.nguoidungUpdateInput, Prisma.nguoidungUncheckedUpdateInput>;
};
/**
 * nguoidung delete
 */
export type nguoidungDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which nguoidung to delete.
     */
    where: Prisma.nguoidungWhereUniqueInput;
};
/**
 * nguoidung deleteMany
 */
export type nguoidungDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which nguoidungs to delete
     */
    where?: Prisma.nguoidungWhereInput;
    /**
     * Limit how many nguoidungs to delete.
     */
    limit?: number;
};
/**
 * nguoidung.danhgia
 */
export type nguoidung$danhgiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the danhgia
     */
    select?: Prisma.danhgiaSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the danhgia
     */
    omit?: Prisma.danhgiaOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.danhgiaInclude<ExtArgs> | null;
    where?: Prisma.danhgiaWhereInput;
    orderBy?: Prisma.danhgiaOrderByWithRelationInput | Prisma.danhgiaOrderByWithRelationInput[];
    cursor?: Prisma.danhgiaWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DanhgiaScalarFieldEnum | Prisma.DanhgiaScalarFieldEnum[];
};
/**
 * nguoidung.datsan
 */
export type nguoidung$datsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.datsanOrderByWithRelationInput | Prisma.datsanOrderByWithRelationInput[];
    cursor?: Prisma.datsanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DatsanScalarFieldEnum | Prisma.DatsanScalarFieldEnum[];
};
/**
 * nguoidung.diadiem
 */
export type nguoidung$diadiemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diadiem
     */
    select?: Prisma.diadiemSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the diadiem
     */
    omit?: Prisma.diadiemOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.diadiemInclude<ExtArgs> | null;
    where?: Prisma.diadiemWhereInput;
    orderBy?: Prisma.diadiemOrderByWithRelationInput | Prisma.diadiemOrderByWithRelationInput[];
    cursor?: Prisma.diadiemWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DiadiemScalarFieldEnum | Prisma.DiadiemScalarFieldEnum[];
};
/**
 * nguoidung.giaodich
 */
export type nguoidung$giaodichArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.giaodichWhereInput;
    orderBy?: Prisma.giaodichOrderByWithRelationInput | Prisma.giaodichOrderByWithRelationInput[];
    cursor?: Prisma.giaodichWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.GiaodichScalarFieldEnum | Prisma.GiaodichScalarFieldEnum[];
};
/**
 * nguoidung without action
 */
export type nguoidungDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=nguoidung.d.ts.map