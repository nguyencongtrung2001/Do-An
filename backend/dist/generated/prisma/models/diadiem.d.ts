import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model diadiem
 *
 */
export type diadiemModel = runtime.Types.Result.DefaultSelection<Prisma.$diadiemPayload>;
export type AggregateDiadiem = {
    _count: DiadiemCountAggregateOutputType | null;
    _avg: DiadiemAvgAggregateOutputType | null;
    _sum: DiadiemSumAggregateOutputType | null;
    _min: DiadiemMinAggregateOutputType | null;
    _max: DiadiemMaxAggregateOutputType | null;
};
export type DiadiemAvgAggregateOutputType = {
    kinh_do: runtime.Decimal | null;
    vi_do: runtime.Decimal | null;
};
export type DiadiemSumAggregateOutputType = {
    kinh_do: runtime.Decimal | null;
    vi_do: runtime.Decimal | null;
};
export type DiadiemMinAggregateOutputType = {
    ma_dia_diem: string | null;
    ma_nguoi_dung: string | null;
    ten_dia_diem: string | null;
    dia_chi: string | null;
    mo_ta: string | null;
    kinh_do: runtime.Decimal | null;
    vi_do: runtime.Decimal | null;
    trang_thai_duyet: boolean | null;
    ngay_tao: Date | null;
};
export type DiadiemMaxAggregateOutputType = {
    ma_dia_diem: string | null;
    ma_nguoi_dung: string | null;
    ten_dia_diem: string | null;
    dia_chi: string | null;
    mo_ta: string | null;
    kinh_do: runtime.Decimal | null;
    vi_do: runtime.Decimal | null;
    trang_thai_duyet: boolean | null;
    ngay_tao: Date | null;
};
export type DiadiemCountAggregateOutputType = {
    ma_dia_diem: number;
    ma_nguoi_dung: number;
    ten_dia_diem: number;
    dia_chi: number;
    mo_ta: number;
    kinh_do: number;
    vi_do: number;
    trang_thai_duyet: number;
    ngay_tao: number;
    _all: number;
};
export type DiadiemAvgAggregateInputType = {
    kinh_do?: true;
    vi_do?: true;
};
export type DiadiemSumAggregateInputType = {
    kinh_do?: true;
    vi_do?: true;
};
export type DiadiemMinAggregateInputType = {
    ma_dia_diem?: true;
    ma_nguoi_dung?: true;
    ten_dia_diem?: true;
    dia_chi?: true;
    mo_ta?: true;
    kinh_do?: true;
    vi_do?: true;
    trang_thai_duyet?: true;
    ngay_tao?: true;
};
export type DiadiemMaxAggregateInputType = {
    ma_dia_diem?: true;
    ma_nguoi_dung?: true;
    ten_dia_diem?: true;
    dia_chi?: true;
    mo_ta?: true;
    kinh_do?: true;
    vi_do?: true;
    trang_thai_duyet?: true;
    ngay_tao?: true;
};
export type DiadiemCountAggregateInputType = {
    ma_dia_diem?: true;
    ma_nguoi_dung?: true;
    ten_dia_diem?: true;
    dia_chi?: true;
    mo_ta?: true;
    kinh_do?: true;
    vi_do?: true;
    trang_thai_duyet?: true;
    ngay_tao?: true;
    _all?: true;
};
export type DiadiemAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which diadiem to aggregate.
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of diadiems to fetch.
     */
    orderBy?: Prisma.diadiemOrderByWithRelationInput | Prisma.diadiemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.diadiemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` diadiems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` diadiems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned diadiems
    **/
    _count?: true | DiadiemCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DiadiemAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DiadiemSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DiadiemMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DiadiemMaxAggregateInputType;
};
export type GetDiadiemAggregateType<T extends DiadiemAggregateArgs> = {
    [P in keyof T & keyof AggregateDiadiem]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDiadiem[P]> : Prisma.GetScalarType<T[P], AggregateDiadiem[P]>;
};
export type diadiemGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.diadiemWhereInput;
    orderBy?: Prisma.diadiemOrderByWithAggregationInput | Prisma.diadiemOrderByWithAggregationInput[];
    by: Prisma.DiadiemScalarFieldEnum[] | Prisma.DiadiemScalarFieldEnum;
    having?: Prisma.diadiemScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DiadiemCountAggregateInputType | true;
    _avg?: DiadiemAvgAggregateInputType;
    _sum?: DiadiemSumAggregateInputType;
    _min?: DiadiemMinAggregateInputType;
    _max?: DiadiemMaxAggregateInputType;
};
export type DiadiemGroupByOutputType = {
    ma_dia_diem: string;
    ma_nguoi_dung: string | null;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta: string | null;
    kinh_do: runtime.Decimal;
    vi_do: runtime.Decimal;
    trang_thai_duyet: boolean | null;
    ngay_tao: Date | null;
    _count: DiadiemCountAggregateOutputType | null;
    _avg: DiadiemAvgAggregateOutputType | null;
    _sum: DiadiemSumAggregateOutputType | null;
    _min: DiadiemMinAggregateOutputType | null;
    _max: DiadiemMaxAggregateOutputType | null;
};
export type GetDiadiemGroupByPayload<T extends diadiemGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DiadiemGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DiadiemGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DiadiemGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DiadiemGroupByOutputType[P]>;
}>>;
export type diadiemWhereInput = {
    AND?: Prisma.diadiemWhereInput | Prisma.diadiemWhereInput[];
    OR?: Prisma.diadiemWhereInput[];
    NOT?: Prisma.diadiemWhereInput | Prisma.diadiemWhereInput[];
    ma_dia_diem?: Prisma.StringFilter<"diadiem"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    ten_dia_diem?: Prisma.StringFilter<"diadiem"> | string;
    dia_chi?: Prisma.StringFilter<"diadiem"> | string;
    mo_ta?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    kinh_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.BoolNullableFilter<"diadiem"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"diadiem"> | Date | string | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
    san?: Prisma.SanListRelationFilter;
};
export type diadiemOrderByWithRelationInput = {
    ma_dia_diem?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    ten_dia_diem?: Prisma.SortOrder;
    dia_chi?: Prisma.SortOrder;
    mo_ta?: Prisma.SortOrderInput | Prisma.SortOrder;
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
    trang_thai_duyet?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    nguoidung?: Prisma.nguoidungOrderByWithRelationInput;
    san?: Prisma.sanOrderByRelationAggregateInput;
};
export type diadiemWhereUniqueInput = Prisma.AtLeast<{
    ma_dia_diem?: string;
    AND?: Prisma.diadiemWhereInput | Prisma.diadiemWhereInput[];
    OR?: Prisma.diadiemWhereInput[];
    NOT?: Prisma.diadiemWhereInput | Prisma.diadiemWhereInput[];
    ma_nguoi_dung?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    ten_dia_diem?: Prisma.StringFilter<"diadiem"> | string;
    dia_chi?: Prisma.StringFilter<"diadiem"> | string;
    mo_ta?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    kinh_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.BoolNullableFilter<"diadiem"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"diadiem"> | Date | string | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
    san?: Prisma.SanListRelationFilter;
}, "ma_dia_diem">;
export type diadiemOrderByWithAggregationInput = {
    ma_dia_diem?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    ten_dia_diem?: Prisma.SortOrder;
    dia_chi?: Prisma.SortOrder;
    mo_ta?: Prisma.SortOrderInput | Prisma.SortOrder;
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
    trang_thai_duyet?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.diadiemCountOrderByAggregateInput;
    _avg?: Prisma.diadiemAvgOrderByAggregateInput;
    _max?: Prisma.diadiemMaxOrderByAggregateInput;
    _min?: Prisma.diadiemMinOrderByAggregateInput;
    _sum?: Prisma.diadiemSumOrderByAggregateInput;
};
export type diadiemScalarWhereWithAggregatesInput = {
    AND?: Prisma.diadiemScalarWhereWithAggregatesInput | Prisma.diadiemScalarWhereWithAggregatesInput[];
    OR?: Prisma.diadiemScalarWhereWithAggregatesInput[];
    NOT?: Prisma.diadiemScalarWhereWithAggregatesInput | Prisma.diadiemScalarWhereWithAggregatesInput[];
    ma_dia_diem?: Prisma.StringWithAggregatesFilter<"diadiem"> | string;
    ma_nguoi_dung?: Prisma.StringNullableWithAggregatesFilter<"diadiem"> | string | null;
    ten_dia_diem?: Prisma.StringWithAggregatesFilter<"diadiem"> | string;
    dia_chi?: Prisma.StringWithAggregatesFilter<"diadiem"> | string;
    mo_ta?: Prisma.StringNullableWithAggregatesFilter<"diadiem"> | string | null;
    kinh_do?: Prisma.DecimalWithAggregatesFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalWithAggregatesFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.BoolNullableWithAggregatesFilter<"diadiem"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableWithAggregatesFilter<"diadiem"> | Date | string | null;
};
export type diadiemCreateInput = {
    ma_dia_diem: string;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDiadiemInput;
    san?: Prisma.sanCreateNestedManyWithoutDiadiemInput;
};
export type diadiemUncheckedCreateInput = {
    ma_dia_diem: string;
    ma_nguoi_dung?: string | null;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
    san?: Prisma.sanUncheckedCreateNestedManyWithoutDiadiemInput;
};
export type diadiemUpdateInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDiadiemNestedInput;
    san?: Prisma.sanUpdateManyWithoutDiadiemNestedInput;
};
export type diadiemUncheckedUpdateInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    san?: Prisma.sanUncheckedUpdateManyWithoutDiadiemNestedInput;
};
export type diadiemCreateManyInput = {
    ma_dia_diem: string;
    ma_nguoi_dung?: string | null;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
};
export type diadiemUpdateManyMutationInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type diadiemUncheckedUpdateManyInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type diadiemCountOrderByAggregateInput = {
    ma_dia_diem?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ten_dia_diem?: Prisma.SortOrder;
    dia_chi?: Prisma.SortOrder;
    mo_ta?: Prisma.SortOrder;
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
    trang_thai_duyet?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type diadiemAvgOrderByAggregateInput = {
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
};
export type diadiemMaxOrderByAggregateInput = {
    ma_dia_diem?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ten_dia_diem?: Prisma.SortOrder;
    dia_chi?: Prisma.SortOrder;
    mo_ta?: Prisma.SortOrder;
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
    trang_thai_duyet?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type diadiemMinOrderByAggregateInput = {
    ma_dia_diem?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ten_dia_diem?: Prisma.SortOrder;
    dia_chi?: Prisma.SortOrder;
    mo_ta?: Prisma.SortOrder;
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
    trang_thai_duyet?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type diadiemSumOrderByAggregateInput = {
    kinh_do?: Prisma.SortOrder;
    vi_do?: Prisma.SortOrder;
};
export type DiadiemListRelationFilter = {
    every?: Prisma.diadiemWhereInput;
    some?: Prisma.diadiemWhereInput;
    none?: Prisma.diadiemWhereInput;
};
export type diadiemOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DiadiemNullableScalarRelationFilter = {
    is?: Prisma.diadiemWhereInput | null;
    isNot?: Prisma.diadiemWhereInput | null;
};
export type NullableBoolFieldUpdateOperationsInput = {
    set?: boolean | null;
};
export type diadiemCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput> | Prisma.diadiemCreateWithoutNguoidungInput[] | Prisma.diadiemUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutNguoidungInput | Prisma.diadiemCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.diadiemCreateManyNguoidungInputEnvelope;
    connect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
};
export type diadiemUncheckedCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput> | Prisma.diadiemCreateWithoutNguoidungInput[] | Prisma.diadiemUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutNguoidungInput | Prisma.diadiemCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.diadiemCreateManyNguoidungInputEnvelope;
    connect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
};
export type diadiemUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput> | Prisma.diadiemCreateWithoutNguoidungInput[] | Prisma.diadiemUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutNguoidungInput | Prisma.diadiemCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.diadiemUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.diadiemUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.diadiemCreateManyNguoidungInputEnvelope;
    set?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    disconnect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    delete?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    connect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    update?: Prisma.diadiemUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.diadiemUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.diadiemUpdateManyWithWhereWithoutNguoidungInput | Prisma.diadiemUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.diadiemScalarWhereInput | Prisma.diadiemScalarWhereInput[];
};
export type diadiemUncheckedUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput> | Prisma.diadiemCreateWithoutNguoidungInput[] | Prisma.diadiemUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutNguoidungInput | Prisma.diadiemCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.diadiemUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.diadiemUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.diadiemCreateManyNguoidungInputEnvelope;
    set?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    disconnect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    delete?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    connect?: Prisma.diadiemWhereUniqueInput | Prisma.diadiemWhereUniqueInput[];
    update?: Prisma.diadiemUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.diadiemUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.diadiemUpdateManyWithWhereWithoutNguoidungInput | Prisma.diadiemUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.diadiemScalarWhereInput | Prisma.diadiemScalarWhereInput[];
};
export type diadiemCreateNestedOneWithoutSanInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutSanInput, Prisma.diadiemUncheckedCreateWithoutSanInput>;
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutSanInput;
    connect?: Prisma.diadiemWhereUniqueInput;
};
export type diadiemUpdateOneWithoutSanNestedInput = {
    create?: Prisma.XOR<Prisma.diadiemCreateWithoutSanInput, Prisma.diadiemUncheckedCreateWithoutSanInput>;
    connectOrCreate?: Prisma.diadiemCreateOrConnectWithoutSanInput;
    upsert?: Prisma.diadiemUpsertWithoutSanInput;
    disconnect?: Prisma.diadiemWhereInput | boolean;
    delete?: Prisma.diadiemWhereInput | boolean;
    connect?: Prisma.diadiemWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.diadiemUpdateToOneWithWhereWithoutSanInput, Prisma.diadiemUpdateWithoutSanInput>, Prisma.diadiemUncheckedUpdateWithoutSanInput>;
};
export type diadiemCreateWithoutNguoidungInput = {
    ma_dia_diem: string;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
    san?: Prisma.sanCreateNestedManyWithoutDiadiemInput;
};
export type diadiemUncheckedCreateWithoutNguoidungInput = {
    ma_dia_diem: string;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
    san?: Prisma.sanUncheckedCreateNestedManyWithoutDiadiemInput;
};
export type diadiemCreateOrConnectWithoutNguoidungInput = {
    where: Prisma.diadiemWhereUniqueInput;
    create: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput>;
};
export type diadiemCreateManyNguoidungInputEnvelope = {
    data: Prisma.diadiemCreateManyNguoidungInput | Prisma.diadiemCreateManyNguoidungInput[];
    skipDuplicates?: boolean;
};
export type diadiemUpsertWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.diadiemWhereUniqueInput;
    update: Prisma.XOR<Prisma.diadiemUpdateWithoutNguoidungInput, Prisma.diadiemUncheckedUpdateWithoutNguoidungInput>;
    create: Prisma.XOR<Prisma.diadiemCreateWithoutNguoidungInput, Prisma.diadiemUncheckedCreateWithoutNguoidungInput>;
};
export type diadiemUpdateWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.diadiemWhereUniqueInput;
    data: Prisma.XOR<Prisma.diadiemUpdateWithoutNguoidungInput, Prisma.diadiemUncheckedUpdateWithoutNguoidungInput>;
};
export type diadiemUpdateManyWithWhereWithoutNguoidungInput = {
    where: Prisma.diadiemScalarWhereInput;
    data: Prisma.XOR<Prisma.diadiemUpdateManyMutationInput, Prisma.diadiemUncheckedUpdateManyWithoutNguoidungInput>;
};
export type diadiemScalarWhereInput = {
    AND?: Prisma.diadiemScalarWhereInput | Prisma.diadiemScalarWhereInput[];
    OR?: Prisma.diadiemScalarWhereInput[];
    NOT?: Prisma.diadiemScalarWhereInput | Prisma.diadiemScalarWhereInput[];
    ma_dia_diem?: Prisma.StringFilter<"diadiem"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    ten_dia_diem?: Prisma.StringFilter<"diadiem"> | string;
    dia_chi?: Prisma.StringFilter<"diadiem"> | string;
    mo_ta?: Prisma.StringNullableFilter<"diadiem"> | string | null;
    kinh_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFilter<"diadiem"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.BoolNullableFilter<"diadiem"> | boolean | null;
    ngay_tao?: Prisma.DateTimeNullableFilter<"diadiem"> | Date | string | null;
};
export type diadiemCreateWithoutSanInput = {
    ma_dia_diem: string;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDiadiemInput;
};
export type diadiemUncheckedCreateWithoutSanInput = {
    ma_dia_diem: string;
    ma_nguoi_dung?: string | null;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
};
export type diadiemCreateOrConnectWithoutSanInput = {
    where: Prisma.diadiemWhereUniqueInput;
    create: Prisma.XOR<Prisma.diadiemCreateWithoutSanInput, Prisma.diadiemUncheckedCreateWithoutSanInput>;
};
export type diadiemUpsertWithoutSanInput = {
    update: Prisma.XOR<Prisma.diadiemUpdateWithoutSanInput, Prisma.diadiemUncheckedUpdateWithoutSanInput>;
    create: Prisma.XOR<Prisma.diadiemCreateWithoutSanInput, Prisma.diadiemUncheckedCreateWithoutSanInput>;
    where?: Prisma.diadiemWhereInput;
};
export type diadiemUpdateToOneWithWhereWithoutSanInput = {
    where?: Prisma.diadiemWhereInput;
    data: Prisma.XOR<Prisma.diadiemUpdateWithoutSanInput, Prisma.diadiemUncheckedUpdateWithoutSanInput>;
};
export type diadiemUpdateWithoutSanInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDiadiemNestedInput;
};
export type diadiemUncheckedUpdateWithoutSanInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type diadiemCreateManyNguoidungInput = {
    ma_dia_diem: string;
    ten_dia_diem: string;
    dia_chi: string;
    mo_ta?: string | null;
    kinh_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: boolean | null;
    ngay_tao?: Date | string | null;
};
export type diadiemUpdateWithoutNguoidungInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    san?: Prisma.sanUpdateManyWithoutDiadiemNestedInput;
};
export type diadiemUncheckedUpdateWithoutNguoidungInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    san?: Prisma.sanUncheckedUpdateManyWithoutDiadiemNestedInput;
};
export type diadiemUncheckedUpdateManyWithoutNguoidungInput = {
    ma_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_dia_diem?: Prisma.StringFieldUpdateOperationsInput | string;
    dia_chi?: Prisma.StringFieldUpdateOperationsInput | string;
    mo_ta?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    kinh_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    vi_do?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_duyet?: Prisma.NullableBoolFieldUpdateOperationsInput | boolean | null;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type DiadiemCountOutputType
 */
export type DiadiemCountOutputType = {
    san: number;
};
export type DiadiemCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    san?: boolean | DiadiemCountOutputTypeCountSanArgs;
};
/**
 * DiadiemCountOutputType without action
 */
export type DiadiemCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DiadiemCountOutputType
     */
    select?: Prisma.DiadiemCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DiadiemCountOutputType without action
 */
export type DiadiemCountOutputTypeCountSanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sanWhereInput;
};
export type diadiemSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dia_diem?: boolean;
    ma_nguoi_dung?: boolean;
    ten_dia_diem?: boolean;
    dia_chi?: boolean;
    mo_ta?: boolean;
    kinh_do?: boolean;
    vi_do?: boolean;
    trang_thai_duyet?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
    san?: boolean | Prisma.diadiem$sanArgs<ExtArgs>;
    _count?: boolean | Prisma.DiadiemCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["diadiem"]>;
export type diadiemSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dia_diem?: boolean;
    ma_nguoi_dung?: boolean;
    ten_dia_diem?: boolean;
    dia_chi?: boolean;
    mo_ta?: boolean;
    kinh_do?: boolean;
    vi_do?: boolean;
    trang_thai_duyet?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["diadiem"]>;
export type diadiemSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dia_diem?: boolean;
    ma_nguoi_dung?: boolean;
    ten_dia_diem?: boolean;
    dia_chi?: boolean;
    mo_ta?: boolean;
    kinh_do?: boolean;
    vi_do?: boolean;
    trang_thai_duyet?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["diadiem"]>;
export type diadiemSelectScalar = {
    ma_dia_diem?: boolean;
    ma_nguoi_dung?: boolean;
    ten_dia_diem?: boolean;
    dia_chi?: boolean;
    mo_ta?: boolean;
    kinh_do?: boolean;
    vi_do?: boolean;
    trang_thai_duyet?: boolean;
    ngay_tao?: boolean;
};
export type diadiemOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_dia_diem" | "ma_nguoi_dung" | "ten_dia_diem" | "dia_chi" | "mo_ta" | "kinh_do" | "vi_do" | "trang_thai_duyet" | "ngay_tao", ExtArgs["result"]["diadiem"]>;
export type diadiemInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
    san?: boolean | Prisma.diadiem$sanArgs<ExtArgs>;
    _count?: boolean | Prisma.DiadiemCountOutputTypeDefaultArgs<ExtArgs>;
};
export type diadiemIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
};
export type diadiemIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.diadiem$nguoidungArgs<ExtArgs>;
};
export type $diadiemPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "diadiem";
    objects: {
        nguoidung: Prisma.$nguoidungPayload<ExtArgs> | null;
        san: Prisma.$sanPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_dia_diem: string;
        ma_nguoi_dung: string | null;
        ten_dia_diem: string;
        dia_chi: string;
        mo_ta: string | null;
        kinh_do: runtime.Decimal;
        vi_do: runtime.Decimal;
        trang_thai_duyet: boolean | null;
        ngay_tao: Date | null;
    }, ExtArgs["result"]["diadiem"]>;
    composites: {};
};
export type diadiemGetPayload<S extends boolean | null | undefined | diadiemDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$diadiemPayload, S>;
export type diadiemCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<diadiemFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DiadiemCountAggregateInputType | true;
};
export interface diadiemDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['diadiem'];
        meta: {
            name: 'diadiem';
        };
    };
    /**
     * Find zero or one Diadiem that matches the filter.
     * @param {diadiemFindUniqueArgs} args - Arguments to find a Diadiem
     * @example
     * // Get one Diadiem
     * const diadiem = await prisma.diadiem.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends diadiemFindUniqueArgs>(args: Prisma.SelectSubset<T, diadiemFindUniqueArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Diadiem that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {diadiemFindUniqueOrThrowArgs} args - Arguments to find a Diadiem
     * @example
     * // Get one Diadiem
     * const diadiem = await prisma.diadiem.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends diadiemFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, diadiemFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Diadiem that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemFindFirstArgs} args - Arguments to find a Diadiem
     * @example
     * // Get one Diadiem
     * const diadiem = await prisma.diadiem.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends diadiemFindFirstArgs>(args?: Prisma.SelectSubset<T, diadiemFindFirstArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Diadiem that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemFindFirstOrThrowArgs} args - Arguments to find a Diadiem
     * @example
     * // Get one Diadiem
     * const diadiem = await prisma.diadiem.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends diadiemFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, diadiemFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Diadiems that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Diadiems
     * const diadiems = await prisma.diadiem.findMany()
     *
     * // Get first 10 Diadiems
     * const diadiems = await prisma.diadiem.findMany({ take: 10 })
     *
     * // Only select the `ma_dia_diem`
     * const diadiemWithMa_dia_diemOnly = await prisma.diadiem.findMany({ select: { ma_dia_diem: true } })
     *
     */
    findMany<T extends diadiemFindManyArgs>(args?: Prisma.SelectSubset<T, diadiemFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Diadiem.
     * @param {diadiemCreateArgs} args - Arguments to create a Diadiem.
     * @example
     * // Create one Diadiem
     * const Diadiem = await prisma.diadiem.create({
     *   data: {
     *     // ... data to create a Diadiem
     *   }
     * })
     *
     */
    create<T extends diadiemCreateArgs>(args: Prisma.SelectSubset<T, diadiemCreateArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Diadiems.
     * @param {diadiemCreateManyArgs} args - Arguments to create many Diadiems.
     * @example
     * // Create many Diadiems
     * const diadiem = await prisma.diadiem.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends diadiemCreateManyArgs>(args?: Prisma.SelectSubset<T, diadiemCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Diadiems and returns the data saved in the database.
     * @param {diadiemCreateManyAndReturnArgs} args - Arguments to create many Diadiems.
     * @example
     * // Create many Diadiems
     * const diadiem = await prisma.diadiem.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Diadiems and only return the `ma_dia_diem`
     * const diadiemWithMa_dia_diemOnly = await prisma.diadiem.createManyAndReturn({
     *   select: { ma_dia_diem: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends diadiemCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, diadiemCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Diadiem.
     * @param {diadiemDeleteArgs} args - Arguments to delete one Diadiem.
     * @example
     * // Delete one Diadiem
     * const Diadiem = await prisma.diadiem.delete({
     *   where: {
     *     // ... filter to delete one Diadiem
     *   }
     * })
     *
     */
    delete<T extends diadiemDeleteArgs>(args: Prisma.SelectSubset<T, diadiemDeleteArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Diadiem.
     * @param {diadiemUpdateArgs} args - Arguments to update one Diadiem.
     * @example
     * // Update one Diadiem
     * const diadiem = await prisma.diadiem.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends diadiemUpdateArgs>(args: Prisma.SelectSubset<T, diadiemUpdateArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Diadiems.
     * @param {diadiemDeleteManyArgs} args - Arguments to filter Diadiems to delete.
     * @example
     * // Delete a few Diadiems
     * const { count } = await prisma.diadiem.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends diadiemDeleteManyArgs>(args?: Prisma.SelectSubset<T, diadiemDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Diadiems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Diadiems
     * const diadiem = await prisma.diadiem.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends diadiemUpdateManyArgs>(args: Prisma.SelectSubset<T, diadiemUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Diadiems and returns the data updated in the database.
     * @param {diadiemUpdateManyAndReturnArgs} args - Arguments to update many Diadiems.
     * @example
     * // Update many Diadiems
     * const diadiem = await prisma.diadiem.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Diadiems and only return the `ma_dia_diem`
     * const diadiemWithMa_dia_diemOnly = await prisma.diadiem.updateManyAndReturn({
     *   select: { ma_dia_diem: true },
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
    updateManyAndReturn<T extends diadiemUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, diadiemUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Diadiem.
     * @param {diadiemUpsertArgs} args - Arguments to update or create a Diadiem.
     * @example
     * // Update or create a Diadiem
     * const diadiem = await prisma.diadiem.upsert({
     *   create: {
     *     // ... data to create a Diadiem
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Diadiem we want to update
     *   }
     * })
     */
    upsert<T extends diadiemUpsertArgs>(args: Prisma.SelectSubset<T, diadiemUpsertArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Diadiems.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemCountArgs} args - Arguments to filter Diadiems to count.
     * @example
     * // Count the number of Diadiems
     * const count = await prisma.diadiem.count({
     *   where: {
     *     // ... the filter for the Diadiems we want to count
     *   }
     * })
    **/
    count<T extends diadiemCountArgs>(args?: Prisma.Subset<T, diadiemCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DiadiemCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Diadiem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DiadiemAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DiadiemAggregateArgs>(args: Prisma.Subset<T, DiadiemAggregateArgs>): Prisma.PrismaPromise<GetDiadiemAggregateType<T>>;
    /**
     * Group by Diadiem.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {diadiemGroupByArgs} args - Group by arguments.
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
    groupBy<T extends diadiemGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: diadiemGroupByArgs['orderBy'];
    } : {
        orderBy?: diadiemGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, diadiemGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDiadiemGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the diadiem model
     */
    readonly fields: diadiemFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for diadiem.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__diadiemClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    nguoidung<T extends Prisma.diadiem$nguoidungArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.diadiem$nguoidungArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    san<T extends Prisma.diadiem$sanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.diadiem$sanArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the diadiem model
 */
export interface diadiemFieldRefs {
    readonly ma_dia_diem: Prisma.FieldRef<"diadiem", 'String'>;
    readonly ma_nguoi_dung: Prisma.FieldRef<"diadiem", 'String'>;
    readonly ten_dia_diem: Prisma.FieldRef<"diadiem", 'String'>;
    readonly dia_chi: Prisma.FieldRef<"diadiem", 'String'>;
    readonly mo_ta: Prisma.FieldRef<"diadiem", 'String'>;
    readonly kinh_do: Prisma.FieldRef<"diadiem", 'Decimal'>;
    readonly vi_do: Prisma.FieldRef<"diadiem", 'Decimal'>;
    readonly trang_thai_duyet: Prisma.FieldRef<"diadiem", 'Boolean'>;
    readonly ngay_tao: Prisma.FieldRef<"diadiem", 'DateTime'>;
}
/**
 * diadiem findUnique
 */
export type diadiemFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which diadiem to fetch.
     */
    where: Prisma.diadiemWhereUniqueInput;
};
/**
 * diadiem findUniqueOrThrow
 */
export type diadiemFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which diadiem to fetch.
     */
    where: Prisma.diadiemWhereUniqueInput;
};
/**
 * diadiem findFirst
 */
export type diadiemFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which diadiem to fetch.
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of diadiems to fetch.
     */
    orderBy?: Prisma.diadiemOrderByWithRelationInput | Prisma.diadiemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for diadiems.
     */
    cursor?: Prisma.diadiemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` diadiems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` diadiems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of diadiems.
     */
    distinct?: Prisma.DiadiemScalarFieldEnum | Prisma.DiadiemScalarFieldEnum[];
};
/**
 * diadiem findFirstOrThrow
 */
export type diadiemFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which diadiem to fetch.
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of diadiems to fetch.
     */
    orderBy?: Prisma.diadiemOrderByWithRelationInput | Prisma.diadiemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for diadiems.
     */
    cursor?: Prisma.diadiemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` diadiems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` diadiems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of diadiems.
     */
    distinct?: Prisma.DiadiemScalarFieldEnum | Prisma.DiadiemScalarFieldEnum[];
};
/**
 * diadiem findMany
 */
export type diadiemFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which diadiems to fetch.
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of diadiems to fetch.
     */
    orderBy?: Prisma.diadiemOrderByWithRelationInput | Prisma.diadiemOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing diadiems.
     */
    cursor?: Prisma.diadiemWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` diadiems from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` diadiems.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of diadiems.
     */
    distinct?: Prisma.DiadiemScalarFieldEnum | Prisma.DiadiemScalarFieldEnum[];
};
/**
 * diadiem create
 */
export type diadiemCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a diadiem.
     */
    data: Prisma.XOR<Prisma.diadiemCreateInput, Prisma.diadiemUncheckedCreateInput>;
};
/**
 * diadiem createMany
 */
export type diadiemCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many diadiems.
     */
    data: Prisma.diadiemCreateManyInput | Prisma.diadiemCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * diadiem createManyAndReturn
 */
export type diadiemCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diadiem
     */
    select?: Prisma.diadiemSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the diadiem
     */
    omit?: Prisma.diadiemOmit<ExtArgs> | null;
    /**
     * The data used to create many diadiems.
     */
    data: Prisma.diadiemCreateManyInput | Prisma.diadiemCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.diadiemIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * diadiem update
 */
export type diadiemUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a diadiem.
     */
    data: Prisma.XOR<Prisma.diadiemUpdateInput, Prisma.diadiemUncheckedUpdateInput>;
    /**
     * Choose, which diadiem to update.
     */
    where: Prisma.diadiemWhereUniqueInput;
};
/**
 * diadiem updateMany
 */
export type diadiemUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update diadiems.
     */
    data: Prisma.XOR<Prisma.diadiemUpdateManyMutationInput, Prisma.diadiemUncheckedUpdateManyInput>;
    /**
     * Filter which diadiems to update
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * Limit how many diadiems to update.
     */
    limit?: number;
};
/**
 * diadiem updateManyAndReturn
 */
export type diadiemUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the diadiem
     */
    select?: Prisma.diadiemSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the diadiem
     */
    omit?: Prisma.diadiemOmit<ExtArgs> | null;
    /**
     * The data used to update diadiems.
     */
    data: Prisma.XOR<Prisma.diadiemUpdateManyMutationInput, Prisma.diadiemUncheckedUpdateManyInput>;
    /**
     * Filter which diadiems to update
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * Limit how many diadiems to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.diadiemIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * diadiem upsert
 */
export type diadiemUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the diadiem to update in case it exists.
     */
    where: Prisma.diadiemWhereUniqueInput;
    /**
     * In case the diadiem found by the `where` argument doesn't exist, create a new diadiem with this data.
     */
    create: Prisma.XOR<Prisma.diadiemCreateInput, Prisma.diadiemUncheckedCreateInput>;
    /**
     * In case the diadiem was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.diadiemUpdateInput, Prisma.diadiemUncheckedUpdateInput>;
};
/**
 * diadiem delete
 */
export type diadiemDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which diadiem to delete.
     */
    where: Prisma.diadiemWhereUniqueInput;
};
/**
 * diadiem deleteMany
 */
export type diadiemDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which diadiems to delete
     */
    where?: Prisma.diadiemWhereInput;
    /**
     * Limit how many diadiems to delete.
     */
    limit?: number;
};
/**
 * diadiem.nguoidung
 */
export type diadiem$nguoidungArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * diadiem.san
 */
export type diadiem$sanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the san
     */
    select?: Prisma.sanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the san
     */
    omit?: Prisma.sanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.sanInclude<ExtArgs> | null;
    where?: Prisma.sanWhereInput;
    orderBy?: Prisma.sanOrderByWithRelationInput | Prisma.sanOrderByWithRelationInput[];
    cursor?: Prisma.sanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.SanScalarFieldEnum | Prisma.SanScalarFieldEnum[];
};
/**
 * diadiem without action
 */
export type diadiemDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=diadiem.d.ts.map