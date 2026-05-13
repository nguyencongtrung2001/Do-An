import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model danhgia
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type danhgiaModel = runtime.Types.Result.DefaultSelection<Prisma.$danhgiaPayload>;
export type AggregateDanhgia = {
    _count: DanhgiaCountAggregateOutputType | null;
    _avg: DanhgiaAvgAggregateOutputType | null;
    _sum: DanhgiaSumAggregateOutputType | null;
    _min: DanhgiaMinAggregateOutputType | null;
    _max: DanhgiaMaxAggregateOutputType | null;
};
export type DanhgiaAvgAggregateOutputType = {
    so_sao: number | null;
};
export type DanhgiaSumAggregateOutputType = {
    so_sao: number | null;
};
export type DanhgiaMinAggregateOutputType = {
    ma_danh_gia: string | null;
    ma_nguoi_dung: string | null;
    ma_dat_san_chi_tiet: string | null;
    so_sao: number | null;
    ngay_danh_gia: Date | null;
};
export type DanhgiaMaxAggregateOutputType = {
    ma_danh_gia: string | null;
    ma_nguoi_dung: string | null;
    ma_dat_san_chi_tiet: string | null;
    so_sao: number | null;
    ngay_danh_gia: Date | null;
};
export type DanhgiaCountAggregateOutputType = {
    ma_danh_gia: number;
    ma_nguoi_dung: number;
    ma_dat_san_chi_tiet: number;
    so_sao: number;
    ngay_danh_gia: number;
    _all: number;
};
export type DanhgiaAvgAggregateInputType = {
    so_sao?: true;
};
export type DanhgiaSumAggregateInputType = {
    so_sao?: true;
};
export type DanhgiaMinAggregateInputType = {
    ma_danh_gia?: true;
    ma_nguoi_dung?: true;
    ma_dat_san_chi_tiet?: true;
    so_sao?: true;
    ngay_danh_gia?: true;
};
export type DanhgiaMaxAggregateInputType = {
    ma_danh_gia?: true;
    ma_nguoi_dung?: true;
    ma_dat_san_chi_tiet?: true;
    so_sao?: true;
    ngay_danh_gia?: true;
};
export type DanhgiaCountAggregateInputType = {
    ma_danh_gia?: true;
    ma_nguoi_dung?: true;
    ma_dat_san_chi_tiet?: true;
    so_sao?: true;
    ngay_danh_gia?: true;
    _all?: true;
};
export type DanhgiaAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which danhgia to aggregate.
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of danhgias to fetch.
     */
    orderBy?: Prisma.danhgiaOrderByWithRelationInput | Prisma.danhgiaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.danhgiaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` danhgias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` danhgias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned danhgias
    **/
    _count?: true | DanhgiaCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DanhgiaAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DanhgiaSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DanhgiaMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DanhgiaMaxAggregateInputType;
};
export type GetDanhgiaAggregateType<T extends DanhgiaAggregateArgs> = {
    [P in keyof T & keyof AggregateDanhgia]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDanhgia[P]> : Prisma.GetScalarType<T[P], AggregateDanhgia[P]>;
};
export type danhgiaGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.danhgiaWhereInput;
    orderBy?: Prisma.danhgiaOrderByWithAggregationInput | Prisma.danhgiaOrderByWithAggregationInput[];
    by: Prisma.DanhgiaScalarFieldEnum[] | Prisma.DanhgiaScalarFieldEnum;
    having?: Prisma.danhgiaScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DanhgiaCountAggregateInputType | true;
    _avg?: DanhgiaAvgAggregateInputType;
    _sum?: DanhgiaSumAggregateInputType;
    _min?: DanhgiaMinAggregateInputType;
    _max?: DanhgiaMaxAggregateInputType;
};
export type DanhgiaGroupByOutputType = {
    ma_danh_gia: string;
    ma_nguoi_dung: string | null;
    ma_dat_san_chi_tiet: string | null;
    so_sao: number | null;
    ngay_danh_gia: Date | null;
    _count: DanhgiaCountAggregateOutputType | null;
    _avg: DanhgiaAvgAggregateOutputType | null;
    _sum: DanhgiaSumAggregateOutputType | null;
    _min: DanhgiaMinAggregateOutputType | null;
    _max: DanhgiaMaxAggregateOutputType | null;
};
export type GetDanhgiaGroupByPayload<T extends danhgiaGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DanhgiaGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DanhgiaGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DanhgiaGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DanhgiaGroupByOutputType[P]>;
}>>;
export type danhgiaWhereInput = {
    AND?: Prisma.danhgiaWhereInput | Prisma.danhgiaWhereInput[];
    OR?: Prisma.danhgiaWhereInput[];
    NOT?: Prisma.danhgiaWhereInput | Prisma.danhgiaWhereInput[];
    ma_danh_gia?: Prisma.StringFilter<"danhgia"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    ma_dat_san_chi_tiet?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    so_sao?: Prisma.IntNullableFilter<"danhgia"> | number | null;
    ngay_danh_gia?: Prisma.DateTimeNullableFilter<"danhgia"> | Date | string | null;
    datsanchitiet?: Prisma.XOR<Prisma.DatsanchitietNullableScalarRelationFilter, Prisma.datsanchitietWhereInput> | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
};
export type danhgiaOrderByWithRelationInput = {
    ma_danh_gia?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_dat_san_chi_tiet?: Prisma.SortOrderInput | Prisma.SortOrder;
    so_sao?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_danh_gia?: Prisma.SortOrderInput | Prisma.SortOrder;
    datsanchitiet?: Prisma.datsanchitietOrderByWithRelationInput;
    nguoidung?: Prisma.nguoidungOrderByWithRelationInput;
};
export type danhgiaWhereUniqueInput = Prisma.AtLeast<{
    ma_danh_gia?: string;
    AND?: Prisma.danhgiaWhereInput | Prisma.danhgiaWhereInput[];
    OR?: Prisma.danhgiaWhereInput[];
    NOT?: Prisma.danhgiaWhereInput | Prisma.danhgiaWhereInput[];
    ma_nguoi_dung?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    ma_dat_san_chi_tiet?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    so_sao?: Prisma.IntNullableFilter<"danhgia"> | number | null;
    ngay_danh_gia?: Prisma.DateTimeNullableFilter<"danhgia"> | Date | string | null;
    datsanchitiet?: Prisma.XOR<Prisma.DatsanchitietNullableScalarRelationFilter, Prisma.datsanchitietWhereInput> | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
}, "ma_danh_gia">;
export type danhgiaOrderByWithAggregationInput = {
    ma_danh_gia?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    ma_dat_san_chi_tiet?: Prisma.SortOrderInput | Prisma.SortOrder;
    so_sao?: Prisma.SortOrderInput | Prisma.SortOrder;
    ngay_danh_gia?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.danhgiaCountOrderByAggregateInput;
    _avg?: Prisma.danhgiaAvgOrderByAggregateInput;
    _max?: Prisma.danhgiaMaxOrderByAggregateInput;
    _min?: Prisma.danhgiaMinOrderByAggregateInput;
    _sum?: Prisma.danhgiaSumOrderByAggregateInput;
};
export type danhgiaScalarWhereWithAggregatesInput = {
    AND?: Prisma.danhgiaScalarWhereWithAggregatesInput | Prisma.danhgiaScalarWhereWithAggregatesInput[];
    OR?: Prisma.danhgiaScalarWhereWithAggregatesInput[];
    NOT?: Prisma.danhgiaScalarWhereWithAggregatesInput | Prisma.danhgiaScalarWhereWithAggregatesInput[];
    ma_danh_gia?: Prisma.StringWithAggregatesFilter<"danhgia"> | string;
    ma_nguoi_dung?: Prisma.StringNullableWithAggregatesFilter<"danhgia"> | string | null;
    ma_dat_san_chi_tiet?: Prisma.StringNullableWithAggregatesFilter<"danhgia"> | string | null;
    so_sao?: Prisma.IntNullableWithAggregatesFilter<"danhgia"> | number | null;
    ngay_danh_gia?: Prisma.DateTimeNullableWithAggregatesFilter<"danhgia"> | Date | string | null;
};
export type danhgiaCreateInput = {
    ma_danh_gia: string;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietCreateNestedOneWithoutDanhgiaInput;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDanhgiaInput;
};
export type danhgiaUncheckedCreateInput = {
    ma_danh_gia: string;
    ma_nguoi_dung?: string | null;
    ma_dat_san_chi_tiet?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaUpdateInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUpdateOneWithoutDanhgiaNestedInput;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDanhgiaNestedInput;
};
export type danhgiaUncheckedUpdateInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_dat_san_chi_tiet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaCreateManyInput = {
    ma_danh_gia: string;
    ma_nguoi_dung?: string | null;
    ma_dat_san_chi_tiet?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaUpdateManyMutationInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaUncheckedUpdateManyInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ma_dat_san_chi_tiet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaCountOrderByAggregateInput = {
    ma_danh_gia?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    so_sao?: Prisma.SortOrder;
    ngay_danh_gia?: Prisma.SortOrder;
};
export type danhgiaAvgOrderByAggregateInput = {
    so_sao?: Prisma.SortOrder;
};
export type danhgiaMaxOrderByAggregateInput = {
    ma_danh_gia?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    so_sao?: Prisma.SortOrder;
    ngay_danh_gia?: Prisma.SortOrder;
};
export type danhgiaMinOrderByAggregateInput = {
    ma_danh_gia?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    ma_dat_san_chi_tiet?: Prisma.SortOrder;
    so_sao?: Prisma.SortOrder;
    ngay_danh_gia?: Prisma.SortOrder;
};
export type danhgiaSumOrderByAggregateInput = {
    so_sao?: Prisma.SortOrder;
};
export type DanhgiaListRelationFilter = {
    every?: Prisma.danhgiaWhereInput;
    some?: Prisma.danhgiaWhereInput;
    none?: Prisma.danhgiaWhereInput;
};
export type danhgiaOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type danhgiaCreateNestedManyWithoutDatsanchitietInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput> | Prisma.danhgiaCreateWithoutDatsanchitietInput[] | Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput | Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput[];
    createMany?: Prisma.danhgiaCreateManyDatsanchitietInputEnvelope;
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
};
export type danhgiaUncheckedCreateNestedManyWithoutDatsanchitietInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput> | Prisma.danhgiaCreateWithoutDatsanchitietInput[] | Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput | Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput[];
    createMany?: Prisma.danhgiaCreateManyDatsanchitietInputEnvelope;
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
};
export type danhgiaUpdateManyWithoutDatsanchitietNestedInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput> | Prisma.danhgiaCreateWithoutDatsanchitietInput[] | Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput | Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput[];
    upsert?: Prisma.danhgiaUpsertWithWhereUniqueWithoutDatsanchitietInput | Prisma.danhgiaUpsertWithWhereUniqueWithoutDatsanchitietInput[];
    createMany?: Prisma.danhgiaCreateManyDatsanchitietInputEnvelope;
    set?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    disconnect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    delete?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    update?: Prisma.danhgiaUpdateWithWhereUniqueWithoutDatsanchitietInput | Prisma.danhgiaUpdateWithWhereUniqueWithoutDatsanchitietInput[];
    updateMany?: Prisma.danhgiaUpdateManyWithWhereWithoutDatsanchitietInput | Prisma.danhgiaUpdateManyWithWhereWithoutDatsanchitietInput[];
    deleteMany?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
};
export type danhgiaUncheckedUpdateManyWithoutDatsanchitietNestedInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput> | Prisma.danhgiaCreateWithoutDatsanchitietInput[] | Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput | Prisma.danhgiaCreateOrConnectWithoutDatsanchitietInput[];
    upsert?: Prisma.danhgiaUpsertWithWhereUniqueWithoutDatsanchitietInput | Prisma.danhgiaUpsertWithWhereUniqueWithoutDatsanchitietInput[];
    createMany?: Prisma.danhgiaCreateManyDatsanchitietInputEnvelope;
    set?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    disconnect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    delete?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    update?: Prisma.danhgiaUpdateWithWhereUniqueWithoutDatsanchitietInput | Prisma.danhgiaUpdateWithWhereUniqueWithoutDatsanchitietInput[];
    updateMany?: Prisma.danhgiaUpdateManyWithWhereWithoutDatsanchitietInput | Prisma.danhgiaUpdateManyWithWhereWithoutDatsanchitietInput[];
    deleteMany?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
};
export type danhgiaCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput> | Prisma.danhgiaCreateWithoutNguoidungInput[] | Prisma.danhgiaUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutNguoidungInput | Prisma.danhgiaCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.danhgiaCreateManyNguoidungInputEnvelope;
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
};
export type danhgiaUncheckedCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput> | Prisma.danhgiaCreateWithoutNguoidungInput[] | Prisma.danhgiaUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutNguoidungInput | Prisma.danhgiaCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.danhgiaCreateManyNguoidungInputEnvelope;
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
};
export type danhgiaUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput> | Prisma.danhgiaCreateWithoutNguoidungInput[] | Prisma.danhgiaUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutNguoidungInput | Prisma.danhgiaCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.danhgiaUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.danhgiaUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.danhgiaCreateManyNguoidungInputEnvelope;
    set?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    disconnect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    delete?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    update?: Prisma.danhgiaUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.danhgiaUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.danhgiaUpdateManyWithWhereWithoutNguoidungInput | Prisma.danhgiaUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
};
export type danhgiaUncheckedUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput> | Prisma.danhgiaCreateWithoutNguoidungInput[] | Prisma.danhgiaUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.danhgiaCreateOrConnectWithoutNguoidungInput | Prisma.danhgiaCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.danhgiaUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.danhgiaUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.danhgiaCreateManyNguoidungInputEnvelope;
    set?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    disconnect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    delete?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    connect?: Prisma.danhgiaWhereUniqueInput | Prisma.danhgiaWhereUniqueInput[];
    update?: Prisma.danhgiaUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.danhgiaUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.danhgiaUpdateManyWithWhereWithoutNguoidungInput | Prisma.danhgiaUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
};
export type danhgiaCreateWithoutDatsanchitietInput = {
    ma_danh_gia: string;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDanhgiaInput;
};
export type danhgiaUncheckedCreateWithoutDatsanchitietInput = {
    ma_danh_gia: string;
    ma_nguoi_dung?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaCreateOrConnectWithoutDatsanchitietInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput>;
};
export type danhgiaCreateManyDatsanchitietInputEnvelope = {
    data: Prisma.danhgiaCreateManyDatsanchitietInput | Prisma.danhgiaCreateManyDatsanchitietInput[];
    skipDuplicates?: boolean;
};
export type danhgiaUpsertWithWhereUniqueWithoutDatsanchitietInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    update: Prisma.XOR<Prisma.danhgiaUpdateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedUpdateWithoutDatsanchitietInput>;
    create: Prisma.XOR<Prisma.danhgiaCreateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedCreateWithoutDatsanchitietInput>;
};
export type danhgiaUpdateWithWhereUniqueWithoutDatsanchitietInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    data: Prisma.XOR<Prisma.danhgiaUpdateWithoutDatsanchitietInput, Prisma.danhgiaUncheckedUpdateWithoutDatsanchitietInput>;
};
export type danhgiaUpdateManyWithWhereWithoutDatsanchitietInput = {
    where: Prisma.danhgiaScalarWhereInput;
    data: Prisma.XOR<Prisma.danhgiaUpdateManyMutationInput, Prisma.danhgiaUncheckedUpdateManyWithoutDatsanchitietInput>;
};
export type danhgiaScalarWhereInput = {
    AND?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
    OR?: Prisma.danhgiaScalarWhereInput[];
    NOT?: Prisma.danhgiaScalarWhereInput | Prisma.danhgiaScalarWhereInput[];
    ma_danh_gia?: Prisma.StringFilter<"danhgia"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    ma_dat_san_chi_tiet?: Prisma.StringNullableFilter<"danhgia"> | string | null;
    so_sao?: Prisma.IntNullableFilter<"danhgia"> | number | null;
    ngay_danh_gia?: Prisma.DateTimeNullableFilter<"danhgia"> | Date | string | null;
};
export type danhgiaCreateWithoutNguoidungInput = {
    ma_danh_gia: string;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietCreateNestedOneWithoutDanhgiaInput;
};
export type danhgiaUncheckedCreateWithoutNguoidungInput = {
    ma_danh_gia: string;
    ma_dat_san_chi_tiet?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaCreateOrConnectWithoutNguoidungInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    create: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput>;
};
export type danhgiaCreateManyNguoidungInputEnvelope = {
    data: Prisma.danhgiaCreateManyNguoidungInput | Prisma.danhgiaCreateManyNguoidungInput[];
    skipDuplicates?: boolean;
};
export type danhgiaUpsertWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    update: Prisma.XOR<Prisma.danhgiaUpdateWithoutNguoidungInput, Prisma.danhgiaUncheckedUpdateWithoutNguoidungInput>;
    create: Prisma.XOR<Prisma.danhgiaCreateWithoutNguoidungInput, Prisma.danhgiaUncheckedCreateWithoutNguoidungInput>;
};
export type danhgiaUpdateWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.danhgiaWhereUniqueInput;
    data: Prisma.XOR<Prisma.danhgiaUpdateWithoutNguoidungInput, Prisma.danhgiaUncheckedUpdateWithoutNguoidungInput>;
};
export type danhgiaUpdateManyWithWhereWithoutNguoidungInput = {
    where: Prisma.danhgiaScalarWhereInput;
    data: Prisma.XOR<Prisma.danhgiaUpdateManyMutationInput, Prisma.danhgiaUncheckedUpdateManyWithoutNguoidungInput>;
};
export type danhgiaCreateManyDatsanchitietInput = {
    ma_danh_gia: string;
    ma_nguoi_dung?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaUpdateWithoutDatsanchitietInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDanhgiaNestedInput;
};
export type danhgiaUncheckedUpdateWithoutDatsanchitietInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaUncheckedUpdateManyWithoutDatsanchitietInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaCreateManyNguoidungInput = {
    ma_danh_gia: string;
    ma_dat_san_chi_tiet?: string | null;
    so_sao?: number | null;
    ngay_danh_gia?: Date | string | null;
};
export type danhgiaUpdateWithoutNguoidungInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUpdateOneWithoutDanhgiaNestedInput;
};
export type danhgiaUncheckedUpdateWithoutNguoidungInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san_chi_tiet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaUncheckedUpdateManyWithoutNguoidungInput = {
    ma_danh_gia?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dat_san_chi_tiet?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    so_sao?: Prisma.NullableIntFieldUpdateOperationsInput | number | null;
    ngay_danh_gia?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type danhgiaSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_danh_gia?: boolean;
    ma_nguoi_dung?: boolean;
    ma_dat_san_chi_tiet?: boolean;
    so_sao?: boolean;
    ngay_danh_gia?: boolean;
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["danhgia"]>;
export type danhgiaSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_danh_gia?: boolean;
    ma_nguoi_dung?: boolean;
    ma_dat_san_chi_tiet?: boolean;
    so_sao?: boolean;
    ngay_danh_gia?: boolean;
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["danhgia"]>;
export type danhgiaSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_danh_gia?: boolean;
    ma_nguoi_dung?: boolean;
    ma_dat_san_chi_tiet?: boolean;
    so_sao?: boolean;
    ngay_danh_gia?: boolean;
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["danhgia"]>;
export type danhgiaSelectScalar = {
    ma_danh_gia?: boolean;
    ma_nguoi_dung?: boolean;
    ma_dat_san_chi_tiet?: boolean;
    so_sao?: boolean;
    ngay_danh_gia?: boolean;
};
export type danhgiaOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_danh_gia" | "ma_nguoi_dung" | "ma_dat_san_chi_tiet" | "so_sao" | "ngay_danh_gia", ExtArgs["result"]["danhgia"]>;
export type danhgiaInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
};
export type danhgiaIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
};
export type danhgiaIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsanchitiet?: boolean | Prisma.danhgia$datsanchitietArgs<ExtArgs>;
    nguoidung?: boolean | Prisma.danhgia$nguoidungArgs<ExtArgs>;
};
export type $danhgiaPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "danhgia";
    objects: {
        datsanchitiet: Prisma.$datsanchitietPayload<ExtArgs> | null;
        nguoidung: Prisma.$nguoidungPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_danh_gia: string;
        ma_nguoi_dung: string | null;
        ma_dat_san_chi_tiet: string | null;
        so_sao: number | null;
        ngay_danh_gia: Date | null;
    }, ExtArgs["result"]["danhgia"]>;
    composites: {};
};
export type danhgiaGetPayload<S extends boolean | null | undefined | danhgiaDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$danhgiaPayload, S>;
export type danhgiaCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<danhgiaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DanhgiaCountAggregateInputType | true;
};
export interface danhgiaDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['danhgia'];
        meta: {
            name: 'danhgia';
        };
    };
    /**
     * Find zero or one Danhgia that matches the filter.
     * @param {danhgiaFindUniqueArgs} args - Arguments to find a Danhgia
     * @example
     * // Get one Danhgia
     * const danhgia = await prisma.danhgia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends danhgiaFindUniqueArgs>(args: Prisma.SelectSubset<T, danhgiaFindUniqueArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Danhgia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {danhgiaFindUniqueOrThrowArgs} args - Arguments to find a Danhgia
     * @example
     * // Get one Danhgia
     * const danhgia = await prisma.danhgia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends danhgiaFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, danhgiaFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Danhgia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaFindFirstArgs} args - Arguments to find a Danhgia
     * @example
     * // Get one Danhgia
     * const danhgia = await prisma.danhgia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends danhgiaFindFirstArgs>(args?: Prisma.SelectSubset<T, danhgiaFindFirstArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Danhgia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaFindFirstOrThrowArgs} args - Arguments to find a Danhgia
     * @example
     * // Get one Danhgia
     * const danhgia = await prisma.danhgia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends danhgiaFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, danhgiaFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Danhgias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Danhgias
     * const danhgias = await prisma.danhgia.findMany()
     *
     * // Get first 10 Danhgias
     * const danhgias = await prisma.danhgia.findMany({ take: 10 })
     *
     * // Only select the `ma_danh_gia`
     * const danhgiaWithMa_danh_giaOnly = await prisma.danhgia.findMany({ select: { ma_danh_gia: true } })
     *
     */
    findMany<T extends danhgiaFindManyArgs>(args?: Prisma.SelectSubset<T, danhgiaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Danhgia.
     * @param {danhgiaCreateArgs} args - Arguments to create a Danhgia.
     * @example
     * // Create one Danhgia
     * const Danhgia = await prisma.danhgia.create({
     *   data: {
     *     // ... data to create a Danhgia
     *   }
     * })
     *
     */
    create<T extends danhgiaCreateArgs>(args: Prisma.SelectSubset<T, danhgiaCreateArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Danhgias.
     * @param {danhgiaCreateManyArgs} args - Arguments to create many Danhgias.
     * @example
     * // Create many Danhgias
     * const danhgia = await prisma.danhgia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends danhgiaCreateManyArgs>(args?: Prisma.SelectSubset<T, danhgiaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Danhgias and returns the data saved in the database.
     * @param {danhgiaCreateManyAndReturnArgs} args - Arguments to create many Danhgias.
     * @example
     * // Create many Danhgias
     * const danhgia = await prisma.danhgia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Danhgias and only return the `ma_danh_gia`
     * const danhgiaWithMa_danh_giaOnly = await prisma.danhgia.createManyAndReturn({
     *   select: { ma_danh_gia: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends danhgiaCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, danhgiaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Danhgia.
     * @param {danhgiaDeleteArgs} args - Arguments to delete one Danhgia.
     * @example
     * // Delete one Danhgia
     * const Danhgia = await prisma.danhgia.delete({
     *   where: {
     *     // ... filter to delete one Danhgia
     *   }
     * })
     *
     */
    delete<T extends danhgiaDeleteArgs>(args: Prisma.SelectSubset<T, danhgiaDeleteArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Danhgia.
     * @param {danhgiaUpdateArgs} args - Arguments to update one Danhgia.
     * @example
     * // Update one Danhgia
     * const danhgia = await prisma.danhgia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends danhgiaUpdateArgs>(args: Prisma.SelectSubset<T, danhgiaUpdateArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Danhgias.
     * @param {danhgiaDeleteManyArgs} args - Arguments to filter Danhgias to delete.
     * @example
     * // Delete a few Danhgias
     * const { count } = await prisma.danhgia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends danhgiaDeleteManyArgs>(args?: Prisma.SelectSubset<T, danhgiaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Danhgias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Danhgias
     * const danhgia = await prisma.danhgia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends danhgiaUpdateManyArgs>(args: Prisma.SelectSubset<T, danhgiaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Danhgias and returns the data updated in the database.
     * @param {danhgiaUpdateManyAndReturnArgs} args - Arguments to update many Danhgias.
     * @example
     * // Update many Danhgias
     * const danhgia = await prisma.danhgia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Danhgias and only return the `ma_danh_gia`
     * const danhgiaWithMa_danh_giaOnly = await prisma.danhgia.updateManyAndReturn({
     *   select: { ma_danh_gia: true },
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
    updateManyAndReturn<T extends danhgiaUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, danhgiaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Danhgia.
     * @param {danhgiaUpsertArgs} args - Arguments to update or create a Danhgia.
     * @example
     * // Update or create a Danhgia
     * const danhgia = await prisma.danhgia.upsert({
     *   create: {
     *     // ... data to create a Danhgia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Danhgia we want to update
     *   }
     * })
     */
    upsert<T extends danhgiaUpsertArgs>(args: Prisma.SelectSubset<T, danhgiaUpsertArgs<ExtArgs>>): Prisma.Prisma__danhgiaClient<runtime.Types.Result.GetResult<Prisma.$danhgiaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Danhgias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaCountArgs} args - Arguments to filter Danhgias to count.
     * @example
     * // Count the number of Danhgias
     * const count = await prisma.danhgia.count({
     *   where: {
     *     // ... the filter for the Danhgias we want to count
     *   }
     * })
    **/
    count<T extends danhgiaCountArgs>(args?: Prisma.Subset<T, danhgiaCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DanhgiaCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Danhgia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DanhgiaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DanhgiaAggregateArgs>(args: Prisma.Subset<T, DanhgiaAggregateArgs>): Prisma.PrismaPromise<GetDanhgiaAggregateType<T>>;
    /**
     * Group by Danhgia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {danhgiaGroupByArgs} args - Group by arguments.
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
    groupBy<T extends danhgiaGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: danhgiaGroupByArgs['orderBy'];
    } : {
        orderBy?: danhgiaGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, danhgiaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDanhgiaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the danhgia model
     */
    readonly fields: danhgiaFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for danhgia.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__danhgiaClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    datsanchitiet<T extends Prisma.danhgia$datsanchitietArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.danhgia$datsanchitietArgs<ExtArgs>>): Prisma.Prisma__datsanchitietClient<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    nguoidung<T extends Prisma.danhgia$nguoidungArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.danhgia$nguoidungArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the danhgia model
 */
export interface danhgiaFieldRefs {
    readonly ma_danh_gia: Prisma.FieldRef<"danhgia", 'String'>;
    readonly ma_nguoi_dung: Prisma.FieldRef<"danhgia", 'String'>;
    readonly ma_dat_san_chi_tiet: Prisma.FieldRef<"danhgia", 'String'>;
    readonly so_sao: Prisma.FieldRef<"danhgia", 'Int'>;
    readonly ngay_danh_gia: Prisma.FieldRef<"danhgia", 'DateTime'>;
}
/**
 * danhgia findUnique
 */
export type danhgiaFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which danhgia to fetch.
     */
    where: Prisma.danhgiaWhereUniqueInput;
};
/**
 * danhgia findUniqueOrThrow
 */
export type danhgiaFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which danhgia to fetch.
     */
    where: Prisma.danhgiaWhereUniqueInput;
};
/**
 * danhgia findFirst
 */
export type danhgiaFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which danhgia to fetch.
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of danhgias to fetch.
     */
    orderBy?: Prisma.danhgiaOrderByWithRelationInput | Prisma.danhgiaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for danhgias.
     */
    cursor?: Prisma.danhgiaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` danhgias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` danhgias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of danhgias.
     */
    distinct?: Prisma.DanhgiaScalarFieldEnum | Prisma.DanhgiaScalarFieldEnum[];
};
/**
 * danhgia findFirstOrThrow
 */
export type danhgiaFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which danhgia to fetch.
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of danhgias to fetch.
     */
    orderBy?: Prisma.danhgiaOrderByWithRelationInput | Prisma.danhgiaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for danhgias.
     */
    cursor?: Prisma.danhgiaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` danhgias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` danhgias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of danhgias.
     */
    distinct?: Prisma.DanhgiaScalarFieldEnum | Prisma.DanhgiaScalarFieldEnum[];
};
/**
 * danhgia findMany
 */
export type danhgiaFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which danhgias to fetch.
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of danhgias to fetch.
     */
    orderBy?: Prisma.danhgiaOrderByWithRelationInput | Prisma.danhgiaOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing danhgias.
     */
    cursor?: Prisma.danhgiaWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` danhgias from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` danhgias.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of danhgias.
     */
    distinct?: Prisma.DanhgiaScalarFieldEnum | Prisma.DanhgiaScalarFieldEnum[];
};
/**
 * danhgia create
 */
export type danhgiaCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a danhgia.
     */
    data: Prisma.XOR<Prisma.danhgiaCreateInput, Prisma.danhgiaUncheckedCreateInput>;
};
/**
 * danhgia createMany
 */
export type danhgiaCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many danhgias.
     */
    data: Prisma.danhgiaCreateManyInput | Prisma.danhgiaCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * danhgia createManyAndReturn
 */
export type danhgiaCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the danhgia
     */
    select?: Prisma.danhgiaSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the danhgia
     */
    omit?: Prisma.danhgiaOmit<ExtArgs> | null;
    /**
     * The data used to create many danhgias.
     */
    data: Prisma.danhgiaCreateManyInput | Prisma.danhgiaCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.danhgiaIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * danhgia update
 */
export type danhgiaUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a danhgia.
     */
    data: Prisma.XOR<Prisma.danhgiaUpdateInput, Prisma.danhgiaUncheckedUpdateInput>;
    /**
     * Choose, which danhgia to update.
     */
    where: Prisma.danhgiaWhereUniqueInput;
};
/**
 * danhgia updateMany
 */
export type danhgiaUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update danhgias.
     */
    data: Prisma.XOR<Prisma.danhgiaUpdateManyMutationInput, Prisma.danhgiaUncheckedUpdateManyInput>;
    /**
     * Filter which danhgias to update
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * Limit how many danhgias to update.
     */
    limit?: number;
};
/**
 * danhgia updateManyAndReturn
 */
export type danhgiaUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the danhgia
     */
    select?: Prisma.danhgiaSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the danhgia
     */
    omit?: Prisma.danhgiaOmit<ExtArgs> | null;
    /**
     * The data used to update danhgias.
     */
    data: Prisma.XOR<Prisma.danhgiaUpdateManyMutationInput, Prisma.danhgiaUncheckedUpdateManyInput>;
    /**
     * Filter which danhgias to update
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * Limit how many danhgias to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.danhgiaIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * danhgia upsert
 */
export type danhgiaUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the danhgia to update in case it exists.
     */
    where: Prisma.danhgiaWhereUniqueInput;
    /**
     * In case the danhgia found by the `where` argument doesn't exist, create a new danhgia with this data.
     */
    create: Prisma.XOR<Prisma.danhgiaCreateInput, Prisma.danhgiaUncheckedCreateInput>;
    /**
     * In case the danhgia was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.danhgiaUpdateInput, Prisma.danhgiaUncheckedUpdateInput>;
};
/**
 * danhgia delete
 */
export type danhgiaDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which danhgia to delete.
     */
    where: Prisma.danhgiaWhereUniqueInput;
};
/**
 * danhgia deleteMany
 */
export type danhgiaDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which danhgias to delete
     */
    where?: Prisma.danhgiaWhereInput;
    /**
     * Limit how many danhgias to delete.
     */
    limit?: number;
};
/**
 * danhgia.datsanchitiet
 */
export type danhgia$datsanchitietArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    where?: Prisma.datsanchitietWhereInput;
};
/**
 * danhgia.nguoidung
 */
export type danhgia$nguoidungArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * danhgia without action
 */
export type danhgiaDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=danhgia.d.ts.map