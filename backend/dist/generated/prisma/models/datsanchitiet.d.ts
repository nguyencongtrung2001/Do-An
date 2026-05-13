import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model datsanchitiet
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type datsanchitietModel = runtime.Types.Result.DefaultSelection<Prisma.$datsanchitietPayload>;
export type AggregateDatsanchitiet = {
    _count: DatsanchitietCountAggregateOutputType | null;
    _avg: DatsanchitietAvgAggregateOutputType | null;
    _sum: DatsanchitietSumAggregateOutputType | null;
    _min: DatsanchitietMinAggregateOutputType | null;
    _max: DatsanchitietMaxAggregateOutputType | null;
};
export type DatsanchitietAvgAggregateOutputType = {
    tien_coc: runtime.Decimal | null;
    tien_con_lai: runtime.Decimal | null;
};
export type DatsanchitietSumAggregateOutputType = {
    tien_coc: runtime.Decimal | null;
    tien_con_lai: runtime.Decimal | null;
};
export type DatsanchitietMinAggregateOutputType = {
    ma_dat_san_chi_tiet: string | null;
    ma_dat_san: string | null;
    ma_san: string | null;
    ngay_dat: Date | null;
    gio_bat_dau: Date | null;
    gio_ket_thuc: Date | null;
    tien_coc: runtime.Decimal | null;
    tien_con_lai: runtime.Decimal | null;
    trang_thai_dat: string | null;
};
export type DatsanchitietMaxAggregateOutputType = {
    ma_dat_san_chi_tiet: string | null;
    ma_dat_san: string | null;
    ma_san: string | null;
    ngay_dat: Date | null;
    gio_bat_dau: Date | null;
    gio_ket_thuc: Date | null;
    tien_coc: runtime.Decimal | null;
    tien_con_lai: runtime.Decimal | null;
    trang_thai_dat: string | null;
};
export type DatsanchitietCountAggregateOutputType = {
    ma_dat_san_chi_tiet: number;
    ma_dat_san: number;
    ma_san: number;
    ngay_dat: number;
    gio_bat_dau: number;
    gio_ket_thuc: number;
    tien_coc: number;
    tien_con_lai: number;
    trang_thai_dat: number;
    _all: number;
};
export type DatsanchitietAvgAggregateInputType = {
    tien_coc?: true;
    tien_con_lai?: true;
};
export type DatsanchitietSumAggregateInputType = {
    tien_coc?: true;
    tien_con_lai?: true;
};
export type DatsanchitietMinAggregateInputType = {
    ma_dat_san_chi_tiet?: true;
    ma_dat_san?: true;
    ma_san?: true;
    ngay_dat?: true;
    gio_bat_dau?: true;
    gio_ket_thuc?: true;
    tien_coc?: true;
    tien_con_lai?: true;
    trang_thai_dat?: true;
};
export type DatsanchitietMaxAggregateInputType = {
    ma_dat_san_chi_tiet?: true;
    ma_dat_san?: true;
    ma_san?: true;
    ngay_dat?: true;
    gio_bat_dau?: true;
    gio_ket_thuc?: true;
    tien_coc?: true;
    tien_con_lai?: true;
    trang_thai_dat?: true;
};
export type DatsanchitietCountAggregateInputType = {
    ma_dat_san_chi_tiet?: true;
    ma_dat_san?: true;
    ma_san?: true;
    ngay_dat?: true;
    gio_bat_dau?: true;
    gio_ket_thuc?: true;
    tien_coc?: true;
    tien_con_lai?: true;
    trang_thai_dat?: true;
    _all?: true;
};
export type DatsanchitietAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which datsanchitiet to aggregate.
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsanchitiets to fetch.
     */
    orderBy?: Prisma.datsanchitietOrderByWithRelationInput | Prisma.datsanchitietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.datsanchitietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsanchitiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsanchitiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned datsanchitiets
    **/
    _count?: true | DatsanchitietCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DatsanchitietAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DatsanchitietSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DatsanchitietMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DatsanchitietMaxAggregateInputType;
};
export type GetDatsanchitietAggregateType<T extends DatsanchitietAggregateArgs> = {
    [P in keyof T & keyof AggregateDatsanchitiet]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDatsanchitiet[P]> : Prisma.GetScalarType<T[P], AggregateDatsanchitiet[P]>;
};
export type datsanchitietGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.datsanchitietWhereInput;
    orderBy?: Prisma.datsanchitietOrderByWithAggregationInput | Prisma.datsanchitietOrderByWithAggregationInput[];
    by: Prisma.DatsanchitietScalarFieldEnum[] | Prisma.DatsanchitietScalarFieldEnum;
    having?: Prisma.datsanchitietScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DatsanchitietCountAggregateInputType | true;
    _avg?: DatsanchitietAvgAggregateInputType;
    _sum?: DatsanchitietSumAggregateInputType;
    _min?: DatsanchitietMinAggregateInputType;
    _max?: DatsanchitietMaxAggregateInputType;
};
export type DatsanchitietGroupByOutputType = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san: string | null;
    ma_san: string | null;
    ngay_dat: Date;
    gio_bat_dau: Date;
    gio_ket_thuc: Date;
    tien_coc: runtime.Decimal;
    tien_con_lai: runtime.Decimal;
    trang_thai_dat: string;
    _count: DatsanchitietCountAggregateOutputType | null;
    _avg: DatsanchitietAvgAggregateOutputType | null;
    _sum: DatsanchitietSumAggregateOutputType | null;
    _min: DatsanchitietMinAggregateOutputType | null;
    _max: DatsanchitietMaxAggregateOutputType | null;
};
export type GetDatsanchitietGroupByPayload<T extends datsanchitietGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DatsanchitietGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DatsanchitietGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DatsanchitietGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DatsanchitietGroupByOutputType[P]>;
}>>;
export type datsanchitietWhereInput = {
    AND?: Prisma.datsanchitietWhereInput | Prisma.datsanchitietWhereInput[];
    OR?: Prisma.datsanchitietWhereInput[];
    NOT?: Prisma.datsanchitietWhereInput | Prisma.datsanchitietWhereInput[];
    ma_dat_san_chi_tiet?: Prisma.StringFilter<"datsanchitiet"> | string;
    ma_dat_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ma_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ngay_dat?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_bat_dau?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    tien_coc?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFilter<"datsanchitiet"> | string;
    danhgia?: Prisma.DanhgiaListRelationFilter;
    datsan?: Prisma.XOR<Prisma.DatsanNullableScalarRelationFilter, Prisma.datsanWhereInput> | null;
    san?: Prisma.XOR<Prisma.SanNullableScalarRelationFilter, Prisma.sanWhereInput> | null;
};
export type datsanchitietOrderByWithRelationInput = {
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_dat?: Prisma.SortOrder;
    gio_bat_dau?: Prisma.SortOrder;
    gio_ket_thuc?: Prisma.SortOrder;
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
    trang_thai_dat?: Prisma.SortOrder;
    danhgia?: Prisma.danhgiaOrderByRelationAggregateInput;
    datsan?: Prisma.datsanOrderByWithRelationInput;
    san?: Prisma.sanOrderByWithRelationInput;
};
export type datsanchitietWhereUniqueInput = Prisma.AtLeast<{
    ma_dat_san_chi_tiet?: string;
    AND?: Prisma.datsanchitietWhereInput | Prisma.datsanchitietWhereInput[];
    OR?: Prisma.datsanchitietWhereInput[];
    NOT?: Prisma.datsanchitietWhereInput | Prisma.datsanchitietWhereInput[];
    ma_dat_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ma_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ngay_dat?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_bat_dau?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    tien_coc?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFilter<"datsanchitiet"> | string;
    danhgia?: Prisma.DanhgiaListRelationFilter;
    datsan?: Prisma.XOR<Prisma.DatsanNullableScalarRelationFilter, Prisma.datsanWhereInput> | null;
    san?: Prisma.XOR<Prisma.SanNullableScalarRelationFilter, Prisma.sanWhereInput> | null;
}, "ma_dat_san_chi_tiet">;
export type datsanchitietOrderByWithAggregationInput = {
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_san?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_dat?: Prisma.SortOrder;
    gio_bat_dau?: Prisma.SortOrder;
    gio_ket_thuc?: Prisma.SortOrder;
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
    trang_thai_dat?: Prisma.SortOrder;
    _count?: Prisma.datsanchitietCountOrderByAggregateInput;
    _avg?: Prisma.datsanchitietAvgOrderByAggregateInput;
    _max?: Prisma.datsanchitietMaxOrderByAggregateInput;
    _min?: Prisma.datsanchitietMinOrderByAggregateInput;
    _sum?: Prisma.datsanchitietSumOrderByAggregateInput;
};
export type datsanchitietScalarWhereWithAggregatesInput = {
    AND?: Prisma.datsanchitietScalarWhereWithAggregatesInput | Prisma.datsanchitietScalarWhereWithAggregatesInput[];
    OR?: Prisma.datsanchitietScalarWhereWithAggregatesInput[];
    NOT?: Prisma.datsanchitietScalarWhereWithAggregatesInput | Prisma.datsanchitietScalarWhereWithAggregatesInput[];
    ma_dat_san_chi_tiet?: Prisma.StringWithAggregatesFilter<"datsanchitiet"> | string;
    ma_dat_san?: Prisma.StringNullableWithAggregatesFilter<"datsanchitiet"> | string | null;
    ma_san?: Prisma.StringNullableWithAggregatesFilter<"datsanchitiet"> | string | null;
    ngay_dat?: Prisma.DateTimeWithAggregatesFilter<"datsanchitiet"> | Date | string;
    gio_bat_dau?: Prisma.DateTimeWithAggregatesFilter<"datsanchitiet"> | Date | string;
    gio_ket_thuc?: Prisma.DateTimeWithAggregatesFilter<"datsanchitiet"> | Date | string;
    tien_coc?: Prisma.DecimalWithAggregatesFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalWithAggregatesFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringWithAggregatesFilter<"datsanchitiet"> | string;
};
export type datsanchitietCreateInput = {
    ma_dat_san_chi_tiet: string;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutDatsanchitietInput;
    datsan?: Prisma.datsanCreateNestedOneWithoutDatsanchitietInput;
    san?: Prisma.sanCreateNestedOneWithoutDatsanchitietInput;
};
export type datsanchitietUncheckedCreateInput = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san?: string | null;
    ma_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutDatsanchitietInput;
};
export type datsanchitietUpdateInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUpdateManyWithoutDatsanchitietNestedInput;
    datsan?: Prisma.datsanUpdateOneWithoutDatsanchitietNestedInput;
    san?: Prisma.sanUpdateOneWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutDatsanchitietNestedInput;
};
export type datsanchitietCreateManyInput = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san?: string | null;
    ma_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
};
export type datsanchitietUpdateManyMutationInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type datsanchitietUncheckedUpdateManyInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type DatsanchitietNullableScalarRelationFilter = {
    is?: Prisma.datsanchitietWhereInput | null;
    isNot?: Prisma.datsanchitietWhereInput | null;
};
export type DatsanchitietListRelationFilter = {
    every?: Prisma.datsanchitietWhereInput;
    some?: Prisma.datsanchitietWhereInput;
    none?: Prisma.datsanchitietWhereInput;
};
export type datsanchitietOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type datsanchitietCountOrderByAggregateInput = {
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_san?: Prisma.SortOrder;
    ngay_dat?: Prisma.SortOrder;
    gio_bat_dau?: Prisma.SortOrder;
    gio_ket_thuc?: Prisma.SortOrder;
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
    trang_thai_dat?: Prisma.SortOrder;
};
export type datsanchitietAvgOrderByAggregateInput = {
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
};
export type datsanchitietMaxOrderByAggregateInput = {
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_san?: Prisma.SortOrder;
    ngay_dat?: Prisma.SortOrder;
    gio_bat_dau?: Prisma.SortOrder;
    gio_ket_thuc?: Prisma.SortOrder;
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
    trang_thai_dat?: Prisma.SortOrder;
};
export type datsanchitietMinOrderByAggregateInput = {
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    ma_dat_san?: Prisma.SortOrder;
    ma_san?: Prisma.SortOrder;
    ngay_dat?: Prisma.SortOrder;
    gio_bat_dau?: Prisma.SortOrder;
    gio_ket_thuc?: Prisma.SortOrder;
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
    trang_thai_dat?: Prisma.SortOrder;
};
export type datsanchitietSumOrderByAggregateInput = {
    tien_coc?: Prisma.SortOrder;
    tien_con_lai?: Prisma.SortOrder;
};
export type datsanchitietCreateNestedOneWithoutDanhgiaInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedCreateWithoutDanhgiaInput>;
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDanhgiaInput;
    connect?: Prisma.datsanchitietWhereUniqueInput;
};
export type datsanchitietUpdateOneWithoutDanhgiaNestedInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedCreateWithoutDanhgiaInput>;
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDanhgiaInput;
    upsert?: Prisma.datsanchitietUpsertWithoutDanhgiaInput;
    disconnect?: Prisma.datsanchitietWhereInput | boolean;
    delete?: Prisma.datsanchitietWhereInput | boolean;
    connect?: Prisma.datsanchitietWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.datsanchitietUpdateToOneWithWhereWithoutDanhgiaInput, Prisma.datsanchitietUpdateWithoutDanhgiaInput>, Prisma.datsanchitietUncheckedUpdateWithoutDanhgiaInput>;
};
export type datsanchitietCreateNestedManyWithoutDatsanInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput> | Prisma.datsanchitietCreateWithoutDatsanInput[] | Prisma.datsanchitietUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDatsanInput | Prisma.datsanchitietCreateOrConnectWithoutDatsanInput[];
    createMany?: Prisma.datsanchitietCreateManyDatsanInputEnvelope;
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
};
export type datsanchitietUncheckedCreateNestedManyWithoutDatsanInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput> | Prisma.datsanchitietCreateWithoutDatsanInput[] | Prisma.datsanchitietUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDatsanInput | Prisma.datsanchitietCreateOrConnectWithoutDatsanInput[];
    createMany?: Prisma.datsanchitietCreateManyDatsanInputEnvelope;
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
};
export type datsanchitietUpdateManyWithoutDatsanNestedInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput> | Prisma.datsanchitietCreateWithoutDatsanInput[] | Prisma.datsanchitietUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDatsanInput | Prisma.datsanchitietCreateOrConnectWithoutDatsanInput[];
    upsert?: Prisma.datsanchitietUpsertWithWhereUniqueWithoutDatsanInput | Prisma.datsanchitietUpsertWithWhereUniqueWithoutDatsanInput[];
    createMany?: Prisma.datsanchitietCreateManyDatsanInputEnvelope;
    set?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    disconnect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    delete?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    update?: Prisma.datsanchitietUpdateWithWhereUniqueWithoutDatsanInput | Prisma.datsanchitietUpdateWithWhereUniqueWithoutDatsanInput[];
    updateMany?: Prisma.datsanchitietUpdateManyWithWhereWithoutDatsanInput | Prisma.datsanchitietUpdateManyWithWhereWithoutDatsanInput[];
    deleteMany?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
};
export type datsanchitietUncheckedUpdateManyWithoutDatsanNestedInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput> | Prisma.datsanchitietCreateWithoutDatsanInput[] | Prisma.datsanchitietUncheckedCreateWithoutDatsanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutDatsanInput | Prisma.datsanchitietCreateOrConnectWithoutDatsanInput[];
    upsert?: Prisma.datsanchitietUpsertWithWhereUniqueWithoutDatsanInput | Prisma.datsanchitietUpsertWithWhereUniqueWithoutDatsanInput[];
    createMany?: Prisma.datsanchitietCreateManyDatsanInputEnvelope;
    set?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    disconnect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    delete?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    update?: Prisma.datsanchitietUpdateWithWhereUniqueWithoutDatsanInput | Prisma.datsanchitietUpdateWithWhereUniqueWithoutDatsanInput[];
    updateMany?: Prisma.datsanchitietUpdateManyWithWhereWithoutDatsanInput | Prisma.datsanchitietUpdateManyWithWhereWithoutDatsanInput[];
    deleteMany?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
};
export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string;
};
export type datsanchitietCreateNestedManyWithoutSanInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput> | Prisma.datsanchitietCreateWithoutSanInput[] | Prisma.datsanchitietUncheckedCreateWithoutSanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutSanInput | Prisma.datsanchitietCreateOrConnectWithoutSanInput[];
    createMany?: Prisma.datsanchitietCreateManySanInputEnvelope;
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
};
export type datsanchitietUncheckedCreateNestedManyWithoutSanInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput> | Prisma.datsanchitietCreateWithoutSanInput[] | Prisma.datsanchitietUncheckedCreateWithoutSanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutSanInput | Prisma.datsanchitietCreateOrConnectWithoutSanInput[];
    createMany?: Prisma.datsanchitietCreateManySanInputEnvelope;
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
};
export type datsanchitietUpdateManyWithoutSanNestedInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput> | Prisma.datsanchitietCreateWithoutSanInput[] | Prisma.datsanchitietUncheckedCreateWithoutSanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutSanInput | Prisma.datsanchitietCreateOrConnectWithoutSanInput[];
    upsert?: Prisma.datsanchitietUpsertWithWhereUniqueWithoutSanInput | Prisma.datsanchitietUpsertWithWhereUniqueWithoutSanInput[];
    createMany?: Prisma.datsanchitietCreateManySanInputEnvelope;
    set?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    disconnect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    delete?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    update?: Prisma.datsanchitietUpdateWithWhereUniqueWithoutSanInput | Prisma.datsanchitietUpdateWithWhereUniqueWithoutSanInput[];
    updateMany?: Prisma.datsanchitietUpdateManyWithWhereWithoutSanInput | Prisma.datsanchitietUpdateManyWithWhereWithoutSanInput[];
    deleteMany?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
};
export type datsanchitietUncheckedUpdateManyWithoutSanNestedInput = {
    create?: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput> | Prisma.datsanchitietCreateWithoutSanInput[] | Prisma.datsanchitietUncheckedCreateWithoutSanInput[];
    connectOrCreate?: Prisma.datsanchitietCreateOrConnectWithoutSanInput | Prisma.datsanchitietCreateOrConnectWithoutSanInput[];
    upsert?: Prisma.datsanchitietUpsertWithWhereUniqueWithoutSanInput | Prisma.datsanchitietUpsertWithWhereUniqueWithoutSanInput[];
    createMany?: Prisma.datsanchitietCreateManySanInputEnvelope;
    set?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    disconnect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    delete?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    connect?: Prisma.datsanchitietWhereUniqueInput | Prisma.datsanchitietWhereUniqueInput[];
    update?: Prisma.datsanchitietUpdateWithWhereUniqueWithoutSanInput | Prisma.datsanchitietUpdateWithWhereUniqueWithoutSanInput[];
    updateMany?: Prisma.datsanchitietUpdateManyWithWhereWithoutSanInput | Prisma.datsanchitietUpdateManyWithWhereWithoutSanInput[];
    deleteMany?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
};
export type datsanchitietCreateWithoutDanhgiaInput = {
    ma_dat_san_chi_tiet: string;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    datsan?: Prisma.datsanCreateNestedOneWithoutDatsanchitietInput;
    san?: Prisma.sanCreateNestedOneWithoutDatsanchitietInput;
};
export type datsanchitietUncheckedCreateWithoutDanhgiaInput = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san?: string | null;
    ma_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
};
export type datsanchitietCreateOrConnectWithoutDanhgiaInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedCreateWithoutDanhgiaInput>;
};
export type datsanchitietUpsertWithoutDanhgiaInput = {
    update: Prisma.XOR<Prisma.datsanchitietUpdateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedUpdateWithoutDanhgiaInput>;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedCreateWithoutDanhgiaInput>;
    where?: Prisma.datsanchitietWhereInput;
};
export type datsanchitietUpdateToOneWithWhereWithoutDanhgiaInput = {
    where?: Prisma.datsanchitietWhereInput;
    data: Prisma.XOR<Prisma.datsanchitietUpdateWithoutDanhgiaInput, Prisma.datsanchitietUncheckedUpdateWithoutDanhgiaInput>;
};
export type datsanchitietUpdateWithoutDanhgiaInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    datsan?: Prisma.datsanUpdateOneWithoutDatsanchitietNestedInput;
    san?: Prisma.sanUpdateOneWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateWithoutDanhgiaInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type datsanchitietCreateWithoutDatsanInput = {
    ma_dat_san_chi_tiet: string;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutDatsanchitietInput;
    san?: Prisma.sanCreateNestedOneWithoutDatsanchitietInput;
};
export type datsanchitietUncheckedCreateWithoutDatsanInput = {
    ma_dat_san_chi_tiet: string;
    ma_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutDatsanchitietInput;
};
export type datsanchitietCreateOrConnectWithoutDatsanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput>;
};
export type datsanchitietCreateManyDatsanInputEnvelope = {
    data: Prisma.datsanchitietCreateManyDatsanInput | Prisma.datsanchitietCreateManyDatsanInput[];
    skipDuplicates?: boolean;
};
export type datsanchitietUpsertWithWhereUniqueWithoutDatsanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    update: Prisma.XOR<Prisma.datsanchitietUpdateWithoutDatsanInput, Prisma.datsanchitietUncheckedUpdateWithoutDatsanInput>;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutDatsanInput, Prisma.datsanchitietUncheckedCreateWithoutDatsanInput>;
};
export type datsanchitietUpdateWithWhereUniqueWithoutDatsanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    data: Prisma.XOR<Prisma.datsanchitietUpdateWithoutDatsanInput, Prisma.datsanchitietUncheckedUpdateWithoutDatsanInput>;
};
export type datsanchitietUpdateManyWithWhereWithoutDatsanInput = {
    where: Prisma.datsanchitietScalarWhereInput;
    data: Prisma.XOR<Prisma.datsanchitietUpdateManyMutationInput, Prisma.datsanchitietUncheckedUpdateManyWithoutDatsanInput>;
};
export type datsanchitietScalarWhereInput = {
    AND?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
    OR?: Prisma.datsanchitietScalarWhereInput[];
    NOT?: Prisma.datsanchitietScalarWhereInput | Prisma.datsanchitietScalarWhereInput[];
    ma_dat_san_chi_tiet?: Prisma.StringFilter<"datsanchitiet"> | string;
    ma_dat_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ma_san?: Prisma.StringNullableFilter<"datsanchitiet"> | string | null;
    ngay_dat?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_bat_dau?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFilter<"datsanchitiet"> | Date | string;
    tien_coc?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFilter<"datsanchitiet"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFilter<"datsanchitiet"> | string;
};
export type datsanchitietCreateWithoutSanInput = {
    ma_dat_san_chi_tiet: string;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaCreateNestedManyWithoutDatsanchitietInput;
    datsan?: Prisma.datsanCreateNestedOneWithoutDatsanchitietInput;
};
export type datsanchitietUncheckedCreateWithoutSanInput = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
    danhgia?: Prisma.danhgiaUncheckedCreateNestedManyWithoutDatsanchitietInput;
};
export type datsanchitietCreateOrConnectWithoutSanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput>;
};
export type datsanchitietCreateManySanInputEnvelope = {
    data: Prisma.datsanchitietCreateManySanInput | Prisma.datsanchitietCreateManySanInput[];
    skipDuplicates?: boolean;
};
export type datsanchitietUpsertWithWhereUniqueWithoutSanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    update: Prisma.XOR<Prisma.datsanchitietUpdateWithoutSanInput, Prisma.datsanchitietUncheckedUpdateWithoutSanInput>;
    create: Prisma.XOR<Prisma.datsanchitietCreateWithoutSanInput, Prisma.datsanchitietUncheckedCreateWithoutSanInput>;
};
export type datsanchitietUpdateWithWhereUniqueWithoutSanInput = {
    where: Prisma.datsanchitietWhereUniqueInput;
    data: Prisma.XOR<Prisma.datsanchitietUpdateWithoutSanInput, Prisma.datsanchitietUncheckedUpdateWithoutSanInput>;
};
export type datsanchitietUpdateManyWithWhereWithoutSanInput = {
    where: Prisma.datsanchitietScalarWhereInput;
    data: Prisma.XOR<Prisma.datsanchitietUpdateManyMutationInput, Prisma.datsanchitietUncheckedUpdateManyWithoutSanInput>;
};
export type datsanchitietCreateManyDatsanInput = {
    ma_dat_san_chi_tiet: string;
    ma_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
};
export type datsanchitietUpdateWithoutDatsanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUpdateManyWithoutDatsanchitietNestedInput;
    san?: Prisma.sanUpdateOneWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateWithoutDatsanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateManyWithoutDatsanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
};
export type datsanchitietCreateManySanInput = {
    ma_dat_san_chi_tiet: string;
    ma_dat_san?: string | null;
    ngay_dat: Date | string;
    gio_bat_dau: Date | string;
    gio_ket_thuc: Date | string;
    tien_coc?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: string;
};
export type datsanchitietUpdateWithoutSanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUpdateManyWithoutDatsanchitietNestedInput;
    datsan?: Prisma.datsanUpdateOneWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateWithoutSanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
    danhgia?: Prisma.danhgiaUncheckedUpdateManyWithoutDatsanchitietNestedInput;
};
export type datsanchitietUncheckedUpdateManyWithoutSanInput = {
    ma_dat_san_chi_tiet?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ngay_dat?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_bat_dau?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    gio_ket_thuc?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    tien_coc?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    tien_con_lai?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_dat?: Prisma.StringFieldUpdateOperationsInput | string;
};
/**
 * Count Type DatsanchitietCountOutputType
 */
export type DatsanchitietCountOutputType = {
    danhgia: number;
};
export type DatsanchitietCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    danhgia?: boolean | DatsanchitietCountOutputTypeCountDanhgiaArgs;
};
/**
 * DatsanchitietCountOutputType without action
 */
export type DatsanchitietCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatsanchitietCountOutputType
     */
    select?: Prisma.DatsanchitietCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DatsanchitietCountOutputType without action
 */
export type DatsanchitietCountOutputTypeCountDanhgiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.danhgiaWhereInput;
};
export type datsanchitietSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san_chi_tiet?: boolean;
    ma_dat_san?: boolean;
    ma_san?: boolean;
    ngay_dat?: boolean;
    gio_bat_dau?: boolean;
    gio_ket_thuc?: boolean;
    tien_coc?: boolean;
    tien_con_lai?: boolean;
    trang_thai_dat?: boolean;
    danhgia?: boolean | Prisma.datsanchitiet$danhgiaArgs<ExtArgs>;
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
    _count?: boolean | Prisma.DatsanchitietCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["datsanchitiet"]>;
export type datsanchitietSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san_chi_tiet?: boolean;
    ma_dat_san?: boolean;
    ma_san?: boolean;
    ngay_dat?: boolean;
    gio_bat_dau?: boolean;
    gio_ket_thuc?: boolean;
    tien_coc?: boolean;
    tien_con_lai?: boolean;
    trang_thai_dat?: boolean;
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
}, ExtArgs["result"]["datsanchitiet"]>;
export type datsanchitietSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san_chi_tiet?: boolean;
    ma_dat_san?: boolean;
    ma_san?: boolean;
    ngay_dat?: boolean;
    gio_bat_dau?: boolean;
    gio_ket_thuc?: boolean;
    tien_coc?: boolean;
    tien_con_lai?: boolean;
    trang_thai_dat?: boolean;
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
}, ExtArgs["result"]["datsanchitiet"]>;
export type datsanchitietSelectScalar = {
    ma_dat_san_chi_tiet?: boolean;
    ma_dat_san?: boolean;
    ma_san?: boolean;
    ngay_dat?: boolean;
    gio_bat_dau?: boolean;
    gio_ket_thuc?: boolean;
    tien_coc?: boolean;
    tien_con_lai?: boolean;
    trang_thai_dat?: boolean;
};
export type datsanchitietOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_dat_san_chi_tiet" | "ma_dat_san" | "ma_san" | "ngay_dat" | "gio_bat_dau" | "gio_ket_thuc" | "tien_coc" | "tien_con_lai" | "trang_thai_dat", ExtArgs["result"]["datsanchitiet"]>;
export type datsanchitietInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    danhgia?: boolean | Prisma.datsanchitiet$danhgiaArgs<ExtArgs>;
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
    _count?: boolean | Prisma.DatsanchitietCountOutputTypeDefaultArgs<ExtArgs>;
};
export type datsanchitietIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
};
export type datsanchitietIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsan?: boolean | Prisma.datsanchitiet$datsanArgs<ExtArgs>;
    san?: boolean | Prisma.datsanchitiet$sanArgs<ExtArgs>;
};
export type $datsanchitietPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "datsanchitiet";
    objects: {
        danhgia: Prisma.$danhgiaPayload<ExtArgs>[];
        datsan: Prisma.$datsanPayload<ExtArgs> | null;
        san: Prisma.$sanPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_dat_san_chi_tiet: string;
        ma_dat_san: string | null;
        ma_san: string | null;
        ngay_dat: Date;
        gio_bat_dau: Date;
        gio_ket_thuc: Date;
        tien_coc: runtime.Decimal;
        tien_con_lai: runtime.Decimal;
        trang_thai_dat: string;
    }, ExtArgs["result"]["datsanchitiet"]>;
    composites: {};
};
export type datsanchitietGetPayload<S extends boolean | null | undefined | datsanchitietDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload, S>;
export type datsanchitietCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<datsanchitietFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DatsanchitietCountAggregateInputType | true;
};
export interface datsanchitietDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['datsanchitiet'];
        meta: {
            name: 'datsanchitiet';
        };
    };
    /**
     * Find zero or one Datsanchitiet that matches the filter.
     * @param {datsanchitietFindUniqueArgs} args - Arguments to find a Datsanchitiet
     * @example
     * // Get one Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends datsanchitietFindUniqueArgs>(args: Prisma.SelectSubset<T, datsanchitietFindUniqueArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Datsanchitiet that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {datsanchitietFindUniqueOrThrowArgs} args - Arguments to find a Datsanchitiet
     * @example
     * // Get one Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends datsanchitietFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, datsanchitietFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Datsanchitiet that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietFindFirstArgs} args - Arguments to find a Datsanchitiet
     * @example
     * // Get one Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends datsanchitietFindFirstArgs>(args?: Prisma.SelectSubset<T, datsanchitietFindFirstArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Datsanchitiet that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietFindFirstOrThrowArgs} args - Arguments to find a Datsanchitiet
     * @example
     * // Get one Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends datsanchitietFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, datsanchitietFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Datsanchitiets that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datsanchitiets
     * const datsanchitiets = await prisma.datsanchitiet.findMany()
     *
     * // Get first 10 Datsanchitiets
     * const datsanchitiets = await prisma.datsanchitiet.findMany({ take: 10 })
     *
     * // Only select the `ma_dat_san_chi_tiet`
     * const datsanchitietWithMa_dat_san_chi_tietOnly = await prisma.datsanchitiet.findMany({ select: { ma_dat_san_chi_tiet: true } })
     *
     */
    findMany<T extends datsanchitietFindManyArgs>(args?: Prisma.SelectSubset<T, datsanchitietFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Datsanchitiet.
     * @param {datsanchitietCreateArgs} args - Arguments to create a Datsanchitiet.
     * @example
     * // Create one Datsanchitiet
     * const Datsanchitiet = await prisma.datsanchitiet.create({
     *   data: {
     *     // ... data to create a Datsanchitiet
     *   }
     * })
     *
     */
    create<T extends datsanchitietCreateArgs>(args: Prisma.SelectSubset<T, datsanchitietCreateArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Datsanchitiets.
     * @param {datsanchitietCreateManyArgs} args - Arguments to create many Datsanchitiets.
     * @example
     * // Create many Datsanchitiets
     * const datsanchitiet = await prisma.datsanchitiet.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends datsanchitietCreateManyArgs>(args?: Prisma.SelectSubset<T, datsanchitietCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Datsanchitiets and returns the data saved in the database.
     * @param {datsanchitietCreateManyAndReturnArgs} args - Arguments to create many Datsanchitiets.
     * @example
     * // Create many Datsanchitiets
     * const datsanchitiet = await prisma.datsanchitiet.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Datsanchitiets and only return the `ma_dat_san_chi_tiet`
     * const datsanchitietWithMa_dat_san_chi_tietOnly = await prisma.datsanchitiet.createManyAndReturn({
     *   select: { ma_dat_san_chi_tiet: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends datsanchitietCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, datsanchitietCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Datsanchitiet.
     * @param {datsanchitietDeleteArgs} args - Arguments to delete one Datsanchitiet.
     * @example
     * // Delete one Datsanchitiet
     * const Datsanchitiet = await prisma.datsanchitiet.delete({
     *   where: {
     *     // ... filter to delete one Datsanchitiet
     *   }
     * })
     *
     */
    delete<T extends datsanchitietDeleteArgs>(args: Prisma.SelectSubset<T, datsanchitietDeleteArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Datsanchitiet.
     * @param {datsanchitietUpdateArgs} args - Arguments to update one Datsanchitiet.
     * @example
     * // Update one Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends datsanchitietUpdateArgs>(args: Prisma.SelectSubset<T, datsanchitietUpdateArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Datsanchitiets.
     * @param {datsanchitietDeleteManyArgs} args - Arguments to filter Datsanchitiets to delete.
     * @example
     * // Delete a few Datsanchitiets
     * const { count } = await prisma.datsanchitiet.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends datsanchitietDeleteManyArgs>(args?: Prisma.SelectSubset<T, datsanchitietDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Datsanchitiets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datsanchitiets
     * const datsanchitiet = await prisma.datsanchitiet.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends datsanchitietUpdateManyArgs>(args: Prisma.SelectSubset<T, datsanchitietUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Datsanchitiets and returns the data updated in the database.
     * @param {datsanchitietUpdateManyAndReturnArgs} args - Arguments to update many Datsanchitiets.
     * @example
     * // Update many Datsanchitiets
     * const datsanchitiet = await prisma.datsanchitiet.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Datsanchitiets and only return the `ma_dat_san_chi_tiet`
     * const datsanchitietWithMa_dat_san_chi_tietOnly = await prisma.datsanchitiet.updateManyAndReturn({
     *   select: { ma_dat_san_chi_tiet: true },
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
    updateManyAndReturn<T extends datsanchitietUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, datsanchitietUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Datsanchitiet.
     * @param {datsanchitietUpsertArgs} args - Arguments to update or create a Datsanchitiet.
     * @example
     * // Update or create a Datsanchitiet
     * const datsanchitiet = await prisma.datsanchitiet.upsert({
     *   create: {
     *     // ... data to create a Datsanchitiet
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Datsanchitiet we want to update
     *   }
     * })
     */
    upsert<T extends datsanchitietUpsertArgs>(args: Prisma.SelectSubset<T, datsanchitietUpsertArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Datsanchitiets.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietCountArgs} args - Arguments to filter Datsanchitiets to count.
     * @example
     * // Count the number of Datsanchitiets
     * const count = await prisma.datsanchitiet.count({
     *   where: {
     *     // ... the filter for the Datsanchitiets we want to count
     *   }
     * })
    **/
    count<T extends datsanchitietCountArgs>(args?: Prisma.Subset<T, datsanchitietCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DatsanchitietCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Datsanchitiet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatsanchitietAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DatsanchitietAggregateArgs>(args: Prisma.Subset<T, DatsanchitietAggregateArgs>): Prisma.PrismaPromise<GetDatsanchitietAggregateType<T>>;
    /**
     * Group by Datsanchitiet.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanchitietGroupByArgs} args - Group by arguments.
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
    groupBy<T extends datsanchitietGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: datsanchitietGroupByArgs['orderBy'];
    } : {
        orderBy?: datsanchitietGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, datsanchitietGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatsanchitietGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the datsanchitiet model
     */
    readonly fields: datsanchitietFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for datsanchitiet.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__datsanchitietClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    danhgia<T extends Prisma.datsanchitiet$danhgiaArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsanchitiet$danhgiaArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    datsan<T extends Prisma.datsanchitiet$datsanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsanchitiet$datsanArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    san<T extends Prisma.datsanchitiet$sanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsanchitiet$sanArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the datsanchitiet model
 */
export interface datsanchitietFieldRefs {
    readonly ma_dat_san_chi_tiet: Prisma.FieldRef<"datsanchitiet", 'String'>;
    readonly ma_dat_san: Prisma.FieldRef<"datsanchitiet", 'String'>;
    readonly ma_san: Prisma.FieldRef<"datsanchitiet", 'String'>;
    readonly ngay_dat: Prisma.FieldRef<"datsanchitiet", 'DateTime'>;
    readonly gio_bat_dau: Prisma.FieldRef<"datsanchitiet", 'DateTime'>;
    readonly gio_ket_thuc: Prisma.FieldRef<"datsanchitiet", 'DateTime'>;
    readonly tien_coc: Prisma.FieldRef<"datsanchitiet", 'Decimal'>;
    readonly tien_con_lai: Prisma.FieldRef<"datsanchitiet", 'Decimal'>;
    readonly trang_thai_dat: Prisma.FieldRef<"datsanchitiet", 'String'>;
}
/**
 * datsanchitiet findUnique
 */
export type datsanchitietFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter, which datsanchitiet to fetch.
     */
    where: Prisma.datsanchitietWhereUniqueInput;
};
/**
 * datsanchitiet findUniqueOrThrow
 */
export type datsanchitietFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter, which datsanchitiet to fetch.
     */
    where: Prisma.datsanchitietWhereUniqueInput;
};
/**
 * datsanchitiet findFirst
 */
export type datsanchitietFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter, which datsanchitiet to fetch.
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsanchitiets to fetch.
     */
    orderBy?: Prisma.datsanchitietOrderByWithRelationInput | Prisma.datsanchitietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for datsanchitiets.
     */
    cursor?: Prisma.datsanchitietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsanchitiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsanchitiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsanchitiets.
     */
    distinct?: Prisma.DatsanchitietScalarFieldEnum | Prisma.DatsanchitietScalarFieldEnum[];
};
/**
 * datsanchitiet findFirstOrThrow
 */
export type datsanchitietFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter, which datsanchitiet to fetch.
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsanchitiets to fetch.
     */
    orderBy?: Prisma.datsanchitietOrderByWithRelationInput | Prisma.datsanchitietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for datsanchitiets.
     */
    cursor?: Prisma.datsanchitietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsanchitiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsanchitiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsanchitiets.
     */
    distinct?: Prisma.DatsanchitietScalarFieldEnum | Prisma.DatsanchitietScalarFieldEnum[];
};
/**
 * datsanchitiet findMany
 */
export type datsanchitietFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter, which datsanchitiets to fetch.
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsanchitiets to fetch.
     */
    orderBy?: Prisma.datsanchitietOrderByWithRelationInput | Prisma.datsanchitietOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing datsanchitiets.
     */
    cursor?: Prisma.datsanchitietWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsanchitiets from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsanchitiets.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsanchitiets.
     */
    distinct?: Prisma.DatsanchitietScalarFieldEnum | Prisma.DatsanchitietScalarFieldEnum[];
};
/**
 * datsanchitiet create
 */
export type datsanchitietCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * The data needed to create a datsanchitiet.
     */
    data: Prisma.XOR<Prisma.datsanchitietCreateInput, Prisma.datsanchitietUncheckedCreateInput>;
};
/**
 * datsanchitiet createMany
 */
export type datsanchitietCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many datsanchitiets.
     */
    data: Prisma.datsanchitietCreateManyInput | Prisma.datsanchitietCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * datsanchitiet createManyAndReturn
 */
export type datsanchitietCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * The data used to create many datsanchitiets.
     */
    data: Prisma.datsanchitietCreateManyInput | Prisma.datsanchitietCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * datsanchitiet update
 */
export type datsanchitietUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * The data needed to update a datsanchitiet.
     */
    data: Prisma.XOR<Prisma.datsanchitietUpdateInput, Prisma.datsanchitietUncheckedUpdateInput>;
    /**
     * Choose, which datsanchitiet to update.
     */
    where: Prisma.datsanchitietWhereUniqueInput;
};
/**
 * datsanchitiet updateMany
 */
export type datsanchitietUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update datsanchitiets.
     */
    data: Prisma.XOR<Prisma.datsanchitietUpdateManyMutationInput, Prisma.datsanchitietUncheckedUpdateManyInput>;
    /**
     * Filter which datsanchitiets to update
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * Limit how many datsanchitiets to update.
     */
    limit?: number;
};
/**
 * datsanchitiet updateManyAndReturn
 */
export type datsanchitietUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * The data used to update datsanchitiets.
     */
    data: Prisma.XOR<Prisma.datsanchitietUpdateManyMutationInput, Prisma.datsanchitietUncheckedUpdateManyInput>;
    /**
     * Filter which datsanchitiets to update
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * Limit how many datsanchitiets to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * datsanchitiet upsert
 */
export type datsanchitietUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * The filter to search for the datsanchitiet to update in case it exists.
     */
    where: Prisma.datsanchitietWhereUniqueInput;
    /**
     * In case the datsanchitiet found by the `where` argument doesn't exist, create a new datsanchitiet with this data.
     */
    create: Prisma.XOR<Prisma.datsanchitietCreateInput, Prisma.datsanchitietUncheckedCreateInput>;
    /**
     * In case the datsanchitiet was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.datsanchitietUpdateInput, Prisma.datsanchitietUncheckedUpdateInput>;
};
/**
 * datsanchitiet delete
 */
export type datsanchitietDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
    /**
     * Filter which datsanchitiet to delete.
     */
    where: Prisma.datsanchitietWhereUniqueInput;
};
/**
 * datsanchitiet deleteMany
 */
export type datsanchitietDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which datsanchitiets to delete
     */
    where?: Prisma.datsanchitietWhereInput;
    /**
     * Limit how many datsanchitiets to delete.
     */
    limit?: number;
};
/**
 * datsanchitiet.danhgia
 */
export type datsanchitiet$danhgiaArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * datsanchitiet.datsan
 */
export type datsanchitiet$datsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * datsanchitiet.san
 */
export type datsanchitiet$sanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * datsanchitiet without action
 */
export type datsanchitietDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsanchitiet
     */
    select?: Prisma.datsanchitietSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the datsanchitiet
     */
    omit?: Prisma.datsanchitietOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanchitietInclude<ExtArgs> | null;
};
//# sourceMappingURL=datsanchitiet.d.ts.map