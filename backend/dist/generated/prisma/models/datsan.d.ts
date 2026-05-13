import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model datsan
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type datsanModel = runtime.Types.Result.DefaultSelection<Prisma.$datsanPayload>;
export type AggregateDatsan = {
    _count: DatsanCountAggregateOutputType | null;
    _avg: DatsanAvgAggregateOutputType | null;
    _sum: DatsanSumAggregateOutputType | null;
    _min: DatsanMinAggregateOutputType | null;
    _max: DatsanMaxAggregateOutputType | null;
};
export type DatsanAvgAggregateOutputType = {
    tong_tien: runtime.Decimal | null;
};
export type DatsanSumAggregateOutputType = {
    tong_tien: runtime.Decimal | null;
};
export type DatsanMinAggregateOutputType = {
    ma_dat_san: string | null;
    ma_nguoi_dung: string | null;
    tong_tien: runtime.Decimal | null;
    phuong_thuc_thanh_toan: string | null;
    ngay_tao: Date | null;
};
export type DatsanMaxAggregateOutputType = {
    ma_dat_san: string | null;
    ma_nguoi_dung: string | null;
    tong_tien: runtime.Decimal | null;
    phuong_thuc_thanh_toan: string | null;
    ngay_tao: Date | null;
};
export type DatsanCountAggregateOutputType = {
    ma_dat_san: number;
    ma_nguoi_dung: number;
    tong_tien: number;
    phuong_thuc_thanh_toan: number;
    ngay_tao: number;
    _all: number;
};
export type DatsanAvgAggregateInputType = {
    tong_tien?: true;
};
export type DatsanSumAggregateInputType = {
    tong_tien?: true;
};
export type DatsanMinAggregateInputType = {
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    tong_tien?: true;
    phuong_thuc_thanh_toan?: true;
    ngay_tao?: true;
};
export type DatsanMaxAggregateInputType = {
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    tong_tien?: true;
    phuong_thuc_thanh_toan?: true;
    ngay_tao?: true;
};
export type DatsanCountAggregateInputType = {
    ma_dat_san?: true;
    ma_nguoi_dung?: true;
    tong_tien?: true;
    phuong_thuc_thanh_toan?: true;
    ngay_tao?: true;
    _all?: true;
};
export type DatsanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which datsan to aggregate.
     */
    where?: Prisma.datsanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsans to fetch.
     */
    orderBy?: Prisma.datsanOrderByWithRelationInput | Prisma.datsanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.datsanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned datsans
    **/
    _count?: true | DatsanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: DatsanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: DatsanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: DatsanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: DatsanMaxAggregateInputType;
};
export type GetDatsanAggregateType<T extends DatsanAggregateArgs> = {
    [P in keyof T & keyof AggregateDatsan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateDatsan[P]> : Prisma.GetScalarType<T[P], AggregateDatsan[P]>;
};
export type datsanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.datsanWhereInput;
    orderBy?: Prisma.datsanOrderByWithAggregationInput | Prisma.datsanOrderByWithAggregationInput[];
    by: Prisma.DatsanScalarFieldEnum[] | Prisma.DatsanScalarFieldEnum;
    having?: Prisma.datsanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: DatsanCountAggregateInputType | true;
    _avg?: DatsanAvgAggregateInputType;
    _sum?: DatsanSumAggregateInputType;
    _min?: DatsanMinAggregateInputType;
    _max?: DatsanMaxAggregateInputType;
};
export type DatsanGroupByOutputType = {
    ma_dat_san: string;
    ma_nguoi_dung: string | null;
    tong_tien: runtime.Decimal;
    phuong_thuc_thanh_toan: string;
    ngay_tao: Date | null;
    _count: DatsanCountAggregateOutputType | null;
    _avg: DatsanAvgAggregateOutputType | null;
    _sum: DatsanSumAggregateOutputType | null;
    _min: DatsanMinAggregateOutputType | null;
    _max: DatsanMaxAggregateOutputType | null;
};
export type GetDatsanGroupByPayload<T extends datsanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<DatsanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof DatsanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], DatsanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], DatsanGroupByOutputType[P]>;
}>>;
export type datsanWhereInput = {
    AND?: Prisma.datsanWhereInput | Prisma.datsanWhereInput[];
    OR?: Prisma.datsanWhereInput[];
    NOT?: Prisma.datsanWhereInput | Prisma.datsanWhereInput[];
    ma_dat_san?: Prisma.StringFilter<"datsan"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"datsan"> | string | null;
    tong_tien?: Prisma.DecimalFilter<"datsan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFilter<"datsan"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"datsan"> | Date | string | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
    datsanchitiet?: Prisma.DatsanchitietListRelationFilter;
    giaodich?: Prisma.GiaodichListRelationFilter;
};
export type datsanOrderByWithRelationInput = {
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    tong_tien?: Prisma.SortOrder;
    phuong_thuc_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    nguoidung?: Prisma.nguoidungOrderByWithRelationInput;
    datsanchitiet?: Prisma.datsanchitietOrderByRelationAggregateInput;
    giaodich?: Prisma.giaodichOrderByRelationAggregateInput;
};
export type datsanWhereUniqueInput = Prisma.AtLeast<{
    ma_dat_san?: string;
    AND?: Prisma.datsanWhereInput | Prisma.datsanWhereInput[];
    OR?: Prisma.datsanWhereInput[];
    NOT?: Prisma.datsanWhereInput | Prisma.datsanWhereInput[];
    ma_nguoi_dung?: Prisma.StringNullableFilter<"datsan"> | string | null;
    tong_tien?: Prisma.DecimalFilter<"datsan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFilter<"datsan"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"datsan"> | Date | string | null;
    nguoidung?: Prisma.XOR<Prisma.NguoidungNullableScalarRelationFilter, Prisma.nguoidungWhereInput> | null;
    datsanchitiet?: Prisma.DatsanchitietListRelationFilter;
    giaodich?: Prisma.GiaodichListRelationFilter;
}, "ma_dat_san">;
export type datsanOrderByWithAggregationInput = {
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrderInput | Prisma.SortOrder;
    tong_tien?: Prisma.SortOrder;
    phuong_thuc_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.datsanCountOrderByAggregateInput;
    _avg?: Prisma.datsanAvgOrderByAggregateInput;
    _max?: Prisma.datsanMaxOrderByAggregateInput;
    _min?: Prisma.datsanMinOrderByAggregateInput;
    _sum?: Prisma.datsanSumOrderByAggregateInput;
};
export type datsanScalarWhereWithAggregatesInput = {
    AND?: Prisma.datsanScalarWhereWithAggregatesInput | Prisma.datsanScalarWhereWithAggregatesInput[];
    OR?: Prisma.datsanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.datsanScalarWhereWithAggregatesInput | Prisma.datsanScalarWhereWithAggregatesInput[];
    ma_dat_san?: Prisma.StringWithAggregatesFilter<"datsan"> | string;
    ma_nguoi_dung?: Prisma.StringNullableWithAggregatesFilter<"datsan"> | string | null;
    tong_tien?: Prisma.DecimalWithAggregatesFilter<"datsan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringWithAggregatesFilter<"datsan"> | string;
    ngay_tao?: Prisma.DateTimeNullableWithAggregatesFilter<"datsan"> | Date | string | null;
};
export type datsanCreateInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDatsanInput;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutDatsanInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutDatsanInput;
};
export type datsanUncheckedCreateInput = {
    ma_dat_san: string;
    ma_nguoi_dung?: string | null;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutDatsanInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutDatsanInput;
};
export type datsanUpdateInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDatsanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutDatsanNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutDatsanNestedInput;
};
export type datsanUncheckedUpdateInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutDatsanNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutDatsanNestedInput;
};
export type datsanCreateManyInput = {
    ma_dat_san: string;
    ma_nguoi_dung?: string | null;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
};
export type datsanUpdateManyMutationInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type datsanUncheckedUpdateManyInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type datsanCountOrderByAggregateInput = {
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    tong_tien?: Prisma.SortOrder;
    phuong_thuc_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type datsanAvgOrderByAggregateInput = {
    tong_tien?: Prisma.SortOrder;
};
export type datsanMaxOrderByAggregateInput = {
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    tong_tien?: Prisma.SortOrder;
    phuong_thuc_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type datsanMinOrderByAggregateInput = {
    ma_dat_san?: Prisma.SortOrder;
    ma_nguoi_dung?: Prisma.SortOrder;
    tong_tien?: Prisma.SortOrder;
    phuong_thuc_thanh_toan?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type datsanSumOrderByAggregateInput = {
    tong_tien?: Prisma.SortOrder;
};
export type DatsanNullableScalarRelationFilter = {
    is?: Prisma.datsanWhereInput | null;
    isNot?: Prisma.datsanWhereInput | null;
};
export type DatsanListRelationFilter = {
    every?: Prisma.datsanWhereInput;
    some?: Prisma.datsanWhereInput;
    none?: Prisma.datsanWhereInput;
};
export type datsanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type datsanCreateNestedOneWithoutDatsanchitietInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutDatsanchitietInput, Prisma.datsanUncheckedCreateWithoutDatsanchitietInput>;
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutDatsanchitietInput;
    connect?: Prisma.datsanWhereUniqueInput;
};
export type datsanUpdateOneWithoutDatsanchitietNestedInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutDatsanchitietInput, Prisma.datsanUncheckedCreateWithoutDatsanchitietInput>;
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutDatsanchitietInput;
    upsert?: Prisma.datsanUpsertWithoutDatsanchitietInput;
    disconnect?: Prisma.datsanWhereInput | boolean;
    delete?: Prisma.datsanWhereInput | boolean;
    connect?: Prisma.datsanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.datsanUpdateToOneWithWhereWithoutDatsanchitietInput, Prisma.datsanUpdateWithoutDatsanchitietInput>, Prisma.datsanUncheckedUpdateWithoutDatsanchitietInput>;
};
export type datsanCreateNestedOneWithoutGiaodichInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutGiaodichInput, Prisma.datsanUncheckedCreateWithoutGiaodichInput>;
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutGiaodichInput;
    connect?: Prisma.datsanWhereUniqueInput;
};
export type datsanUpdateOneWithoutGiaodichNestedInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutGiaodichInput, Prisma.datsanUncheckedCreateWithoutGiaodichInput>;
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutGiaodichInput;
    upsert?: Prisma.datsanUpsertWithoutGiaodichInput;
    disconnect?: Prisma.datsanWhereInput | boolean;
    delete?: Prisma.datsanWhereInput | boolean;
    connect?: Prisma.datsanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.datsanUpdateToOneWithWhereWithoutGiaodichInput, Prisma.datsanUpdateWithoutGiaodichInput>, Prisma.datsanUncheckedUpdateWithoutGiaodichInput>;
};
export type datsanCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput> | Prisma.datsanCreateWithoutNguoidungInput[] | Prisma.datsanUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutNguoidungInput | Prisma.datsanCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.datsanCreateManyNguoidungInputEnvelope;
    connect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
};
export type datsanUncheckedCreateNestedManyWithoutNguoidungInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput> | Prisma.datsanCreateWithoutNguoidungInput[] | Prisma.datsanUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutNguoidungInput | Prisma.datsanCreateOrConnectWithoutNguoidungInput[];
    createMany?: Prisma.datsanCreateManyNguoidungInputEnvelope;
    connect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
};
export type datsanUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput> | Prisma.datsanCreateWithoutNguoidungInput[] | Prisma.datsanUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutNguoidungInput | Prisma.datsanCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.datsanUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.datsanUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.datsanCreateManyNguoidungInputEnvelope;
    set?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    disconnect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    delete?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    connect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    update?: Prisma.datsanUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.datsanUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.datsanUpdateManyWithWhereWithoutNguoidungInput | Prisma.datsanUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.datsanScalarWhereInput | Prisma.datsanScalarWhereInput[];
};
export type datsanUncheckedUpdateManyWithoutNguoidungNestedInput = {
    create?: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput> | Prisma.datsanCreateWithoutNguoidungInput[] | Prisma.datsanUncheckedCreateWithoutNguoidungInput[];
    connectOrCreate?: Prisma.datsanCreateOrConnectWithoutNguoidungInput | Prisma.datsanCreateOrConnectWithoutNguoidungInput[];
    upsert?: Prisma.datsanUpsertWithWhereUniqueWithoutNguoidungInput | Prisma.datsanUpsertWithWhereUniqueWithoutNguoidungInput[];
    createMany?: Prisma.datsanCreateManyNguoidungInputEnvelope;
    set?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    disconnect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    delete?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    connect?: Prisma.datsanWhereUniqueInput | Prisma.datsanWhereUniqueInput[];
    update?: Prisma.datsanUpdateWithWhereUniqueWithoutNguoidungInput | Prisma.datsanUpdateWithWhereUniqueWithoutNguoidungInput[];
    updateMany?: Prisma.datsanUpdateManyWithWhereWithoutNguoidungInput | Prisma.datsanUpdateManyWithWhereWithoutNguoidungInput[];
    deleteMany?: Prisma.datsanScalarWhereInput | Prisma.datsanScalarWhereInput[];
};
export type datsanCreateWithoutDatsanchitietInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDatsanInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutDatsanInput;
};
export type datsanUncheckedCreateWithoutDatsanchitietInput = {
    ma_dat_san: string;
    ma_nguoi_dung?: string | null;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutDatsanInput;
};
export type datsanCreateOrConnectWithoutDatsanchitietInput = {
    where: Prisma.datsanWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanCreateWithoutDatsanchitietInput, Prisma.datsanUncheckedCreateWithoutDatsanchitietInput>;
};
export type datsanUpsertWithoutDatsanchitietInput = {
    update: Prisma.XOR<Prisma.datsanUpdateWithoutDatsanchitietInput, Prisma.datsanUncheckedUpdateWithoutDatsanchitietInput>;
    create: Prisma.XOR<Prisma.datsanCreateWithoutDatsanchitietInput, Prisma.datsanUncheckedCreateWithoutDatsanchitietInput>;
    where?: Prisma.datsanWhereInput;
};
export type datsanUpdateToOneWithWhereWithoutDatsanchitietInput = {
    where?: Prisma.datsanWhereInput;
    data: Prisma.XOR<Prisma.datsanUpdateWithoutDatsanchitietInput, Prisma.datsanUncheckedUpdateWithoutDatsanchitietInput>;
};
export type datsanUpdateWithoutDatsanchitietInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDatsanNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutDatsanNestedInput;
};
export type datsanUncheckedUpdateWithoutDatsanchitietInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutDatsanNestedInput;
};
export type datsanCreateWithoutGiaodichInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    nguoidung?: Prisma.nguoidungCreateNestedOneWithoutDatsanInput;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutDatsanInput;
};
export type datsanUncheckedCreateWithoutGiaodichInput = {
    ma_dat_san: string;
    ma_nguoi_dung?: string | null;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutDatsanInput;
};
export type datsanCreateOrConnectWithoutGiaodichInput = {
    where: Prisma.datsanWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanCreateWithoutGiaodichInput, Prisma.datsanUncheckedCreateWithoutGiaodichInput>;
};
export type datsanUpsertWithoutGiaodichInput = {
    update: Prisma.XOR<Prisma.datsanUpdateWithoutGiaodichInput, Prisma.datsanUncheckedUpdateWithoutGiaodichInput>;
    create: Prisma.XOR<Prisma.datsanCreateWithoutGiaodichInput, Prisma.datsanUncheckedCreateWithoutGiaodichInput>;
    where?: Prisma.datsanWhereInput;
};
export type datsanUpdateToOneWithWhereWithoutGiaodichInput = {
    where?: Prisma.datsanWhereInput;
    data: Prisma.XOR<Prisma.datsanUpdateWithoutGiaodichInput, Prisma.datsanUncheckedUpdateWithoutGiaodichInput>;
};
export type datsanUpdateWithoutGiaodichInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    nguoidung?: Prisma.nguoidungUpdateOneWithoutDatsanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutDatsanNestedInput;
};
export type datsanUncheckedUpdateWithoutGiaodichInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_nguoi_dung?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutDatsanNestedInput;
};
export type datsanCreateWithoutNguoidungInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutDatsanInput;
    giaodich?: Prisma.giaodichCreateNestedManyWithoutDatsanInput;
};
export type datsanUncheckedCreateWithoutNguoidungInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutDatsanInput;
    giaodich?: Prisma.giaodichUncheckedCreateNestedManyWithoutDatsanInput;
};
export type datsanCreateOrConnectWithoutNguoidungInput = {
    where: Prisma.datsanWhereUniqueInput;
    create: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput>;
};
export type datsanCreateManyNguoidungInputEnvelope = {
    data: Prisma.datsanCreateManyNguoidungInput | Prisma.datsanCreateManyNguoidungInput[];
    skipDuplicates?: boolean;
};
export type datsanUpsertWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.datsanWhereUniqueInput;
    update: Prisma.XOR<Prisma.datsanUpdateWithoutNguoidungInput, Prisma.datsanUncheckedUpdateWithoutNguoidungInput>;
    create: Prisma.XOR<Prisma.datsanCreateWithoutNguoidungInput, Prisma.datsanUncheckedCreateWithoutNguoidungInput>;
};
export type datsanUpdateWithWhereUniqueWithoutNguoidungInput = {
    where: Prisma.datsanWhereUniqueInput;
    data: Prisma.XOR<Prisma.datsanUpdateWithoutNguoidungInput, Prisma.datsanUncheckedUpdateWithoutNguoidungInput>;
};
export type datsanUpdateManyWithWhereWithoutNguoidungInput = {
    where: Prisma.datsanScalarWhereInput;
    data: Prisma.XOR<Prisma.datsanUpdateManyMutationInput, Prisma.datsanUncheckedUpdateManyWithoutNguoidungInput>;
};
export type datsanScalarWhereInput = {
    AND?: Prisma.datsanScalarWhereInput | Prisma.datsanScalarWhereInput[];
    OR?: Prisma.datsanScalarWhereInput[];
    NOT?: Prisma.datsanScalarWhereInput | Prisma.datsanScalarWhereInput[];
    ma_dat_san?: Prisma.StringFilter<"datsan"> | string;
    ma_nguoi_dung?: Prisma.StringNullableFilter<"datsan"> | string | null;
    tong_tien?: Prisma.DecimalFilter<"datsan"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFilter<"datsan"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"datsan"> | Date | string | null;
};
export type datsanCreateManyNguoidungInput = {
    ma_dat_san: string;
    tong_tien: runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan: string;
    ngay_tao?: Date | string | null;
};
export type datsanUpdateWithoutNguoidungInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutDatsanNestedInput;
    giaodich?: Prisma.giaodichUpdateManyWithoutDatsanNestedInput;
};
export type datsanUncheckedUpdateWithoutNguoidungInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutDatsanNestedInput;
    giaodich?: Prisma.giaodichUncheckedUpdateManyWithoutDatsanNestedInput;
};
export type datsanUncheckedUpdateManyWithoutNguoidungInput = {
    ma_dat_san?: Prisma.StringFieldUpdateOperationsInput | string;
    tong_tien?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    phuong_thuc_thanh_toan?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type DatsanCountOutputType
 */
export type DatsanCountOutputType = {
    datsanchitiet: number;
    giaodich: number;
};
export type DatsanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    datsanchitiet?: boolean | DatsanCountOutputTypeCountDatsanchitietArgs;
    giaodich?: boolean | DatsanCountOutputTypeCountGiaodichArgs;
};
/**
 * DatsanCountOutputType without action
 */
export type DatsanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DatsanCountOutputType
     */
    select?: Prisma.DatsanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * DatsanCountOutputType without action
 */
export type DatsanCountOutputTypeCountDatsanchitietArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.datsanchitietWhereInput;
};
/**
 * DatsanCountOutputType without action
 */
export type DatsanCountOutputTypeCountGiaodichArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.giaodichWhereInput;
};
export type datsanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    tong_tien?: boolean;
    phuong_thuc_thanh_toan?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
    datsanchitiet?: boolean | Prisma.datsan$datsanchitietArgs<ExtArgs>;
    giaodich?: boolean | Prisma.datsan$giaodichArgs<ExtArgs>;
    _count?: boolean | Prisma.DatsanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["datsan"]>;
export type datsanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    tong_tien?: boolean;
    phuong_thuc_thanh_toan?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["datsan"]>;
export type datsanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    tong_tien?: boolean;
    phuong_thuc_thanh_toan?: boolean;
    ngay_tao?: boolean;
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
}, ExtArgs["result"]["datsan"]>;
export type datsanSelectScalar = {
    ma_dat_san?: boolean;
    ma_nguoi_dung?: boolean;
    tong_tien?: boolean;
    phuong_thuc_thanh_toan?: boolean;
    ngay_tao?: boolean;
};
export type datsanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_dat_san" | "ma_nguoi_dung" | "tong_tien" | "phuong_thuc_thanh_toan" | "ngay_tao", ExtArgs["result"]["datsan"]>;
export type datsanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
    datsanchitiet?: boolean | Prisma.datsan$datsanchitietArgs<ExtArgs>;
    giaodich?: boolean | Prisma.datsan$giaodichArgs<ExtArgs>;
    _count?: boolean | Prisma.DatsanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type datsanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
};
export type datsanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    nguoidung?: boolean | Prisma.datsan$nguoidungArgs<ExtArgs>;
};
export type $datsanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "datsan";
    objects: {
        nguoidung: Prisma.$nguoidungPayload<ExtArgs> | null;
        datsanchitiet: Prisma.$datsanchitietPayload<ExtArgs>[];
        giaodich: Prisma.$giaodichPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_dat_san: string;
        ma_nguoi_dung: string | null;
        tong_tien: runtime.Decimal;
        phuong_thuc_thanh_toan: string;
        ngay_tao: Date | null;
    }, ExtArgs["result"]["datsan"]>;
    composites: {};
};
export type datsanGetPayload<S extends boolean | null | undefined | datsanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$datsanPayload, S>;
export type datsanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<datsanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: DatsanCountAggregateInputType | true;
};
export interface datsanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['datsan'];
        meta: {
            name: 'datsan';
        };
    };
    /**
     * Find zero or one Datsan that matches the filter.
     * @param {datsanFindUniqueArgs} args - Arguments to find a Datsan
     * @example
     * // Get one Datsan
     * const datsan = await prisma.datsan.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends datsanFindUniqueArgs>(args: Prisma.SelectSubset<T, datsanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Datsan that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {datsanFindUniqueOrThrowArgs} args - Arguments to find a Datsan
     * @example
     * // Get one Datsan
     * const datsan = await prisma.datsan.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends datsanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, datsanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Datsan that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanFindFirstArgs} args - Arguments to find a Datsan
     * @example
     * // Get one Datsan
     * const datsan = await prisma.datsan.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends datsanFindFirstArgs>(args?: Prisma.SelectSubset<T, datsanFindFirstArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Datsan that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanFindFirstOrThrowArgs} args - Arguments to find a Datsan
     * @example
     * // Get one Datsan
     * const datsan = await prisma.datsan.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends datsanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, datsanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Datsans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Datsans
     * const datsans = await prisma.datsan.findMany()
     *
     * // Get first 10 Datsans
     * const datsans = await prisma.datsan.findMany({ take: 10 })
     *
     * // Only select the `ma_dat_san`
     * const datsanWithMa_dat_sanOnly = await prisma.datsan.findMany({ select: { ma_dat_san: true } })
     *
     */
    findMany<T extends datsanFindManyArgs>(args?: Prisma.SelectSubset<T, datsanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Datsan.
     * @param {datsanCreateArgs} args - Arguments to create a Datsan.
     * @example
     * // Create one Datsan
     * const Datsan = await prisma.datsan.create({
     *   data: {
     *     // ... data to create a Datsan
     *   }
     * })
     *
     */
    create<T extends datsanCreateArgs>(args: Prisma.SelectSubset<T, datsanCreateArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Datsans.
     * @param {datsanCreateManyArgs} args - Arguments to create many Datsans.
     * @example
     * // Create many Datsans
     * const datsan = await prisma.datsan.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends datsanCreateManyArgs>(args?: Prisma.SelectSubset<T, datsanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Datsans and returns the data saved in the database.
     * @param {datsanCreateManyAndReturnArgs} args - Arguments to create many Datsans.
     * @example
     * // Create many Datsans
     * const datsan = await prisma.datsan.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Datsans and only return the `ma_dat_san`
     * const datsanWithMa_dat_sanOnly = await prisma.datsan.createManyAndReturn({
     *   select: { ma_dat_san: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends datsanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, datsanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Datsan.
     * @param {datsanDeleteArgs} args - Arguments to delete one Datsan.
     * @example
     * // Delete one Datsan
     * const Datsan = await prisma.datsan.delete({
     *   where: {
     *     // ... filter to delete one Datsan
     *   }
     * })
     *
     */
    delete<T extends datsanDeleteArgs>(args: Prisma.SelectSubset<T, datsanDeleteArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Datsan.
     * @param {datsanUpdateArgs} args - Arguments to update one Datsan.
     * @example
     * // Update one Datsan
     * const datsan = await prisma.datsan.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends datsanUpdateArgs>(args: Prisma.SelectSubset<T, datsanUpdateArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Datsans.
     * @param {datsanDeleteManyArgs} args - Arguments to filter Datsans to delete.
     * @example
     * // Delete a few Datsans
     * const { count } = await prisma.datsan.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends datsanDeleteManyArgs>(args?: Prisma.SelectSubset<T, datsanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Datsans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Datsans
     * const datsan = await prisma.datsan.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends datsanUpdateManyArgs>(args: Prisma.SelectSubset<T, datsanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Datsans and returns the data updated in the database.
     * @param {datsanUpdateManyAndReturnArgs} args - Arguments to update many Datsans.
     * @example
     * // Update many Datsans
     * const datsan = await prisma.datsan.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Datsans and only return the `ma_dat_san`
     * const datsanWithMa_dat_sanOnly = await prisma.datsan.updateManyAndReturn({
     *   select: { ma_dat_san: true },
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
    updateManyAndReturn<T extends datsanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, datsanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Datsan.
     * @param {datsanUpsertArgs} args - Arguments to update or create a Datsan.
     * @example
     * // Update or create a Datsan
     * const datsan = await prisma.datsan.upsert({
     *   create: {
     *     // ... data to create a Datsan
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Datsan we want to update
     *   }
     * })
     */
    upsert<T extends datsanUpsertArgs>(args: Prisma.SelectSubset<T, datsanUpsertArgs<ExtArgs>>): Prisma.Prisma__datsanClient<runtime.Types.Result.GetResult<Prisma.$datsanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Datsans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanCountArgs} args - Arguments to filter Datsans to count.
     * @example
     * // Count the number of Datsans
     * const count = await prisma.datsan.count({
     *   where: {
     *     // ... the filter for the Datsans we want to count
     *   }
     * })
    **/
    count<T extends datsanCountArgs>(args?: Prisma.Subset<T, datsanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], DatsanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Datsan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DatsanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DatsanAggregateArgs>(args: Prisma.Subset<T, DatsanAggregateArgs>): Prisma.PrismaPromise<GetDatsanAggregateType<T>>;
    /**
     * Group by Datsan.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {datsanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends datsanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: datsanGroupByArgs['orderBy'];
    } : {
        orderBy?: datsanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, datsanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDatsanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the datsan model
     */
    readonly fields: datsanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for datsan.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__datsanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    nguoidung<T extends Prisma.datsan$nguoidungArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsan$nguoidungArgs<ExtArgs>>): Prisma.Prisma__nguoidungClient<runtime.Types.Result.GetResult<Prisma.$nguoidungPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    datsanchitiet<T extends Prisma.datsan$datsanchitietArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsan$datsanchitietArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    giaodich<T extends Prisma.datsan$giaodichArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.datsan$giaodichArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$giaodichPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the datsan model
 */
export interface datsanFieldRefs {
    readonly ma_dat_san: Prisma.FieldRef<"datsan", 'String'>;
    readonly ma_nguoi_dung: Prisma.FieldRef<"datsan", 'String'>;
    readonly tong_tien: Prisma.FieldRef<"datsan", 'Decimal'>;
    readonly phuong_thuc_thanh_toan: Prisma.FieldRef<"datsan", 'String'>;
    readonly ngay_tao: Prisma.FieldRef<"datsan", 'DateTime'>;
}
/**
 * datsan findUnique
 */
export type datsanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which datsan to fetch.
     */
    where: Prisma.datsanWhereUniqueInput;
};
/**
 * datsan findUniqueOrThrow
 */
export type datsanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which datsan to fetch.
     */
    where: Prisma.datsanWhereUniqueInput;
};
/**
 * datsan findFirst
 */
export type datsanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which datsan to fetch.
     */
    where?: Prisma.datsanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsans to fetch.
     */
    orderBy?: Prisma.datsanOrderByWithRelationInput | Prisma.datsanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for datsans.
     */
    cursor?: Prisma.datsanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsans.
     */
    distinct?: Prisma.DatsanScalarFieldEnum | Prisma.DatsanScalarFieldEnum[];
};
/**
 * datsan findFirstOrThrow
 */
export type datsanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which datsan to fetch.
     */
    where?: Prisma.datsanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsans to fetch.
     */
    orderBy?: Prisma.datsanOrderByWithRelationInput | Prisma.datsanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for datsans.
     */
    cursor?: Prisma.datsanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsans.
     */
    distinct?: Prisma.DatsanScalarFieldEnum | Prisma.DatsanScalarFieldEnum[];
};
/**
 * datsan findMany
 */
export type datsanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which datsans to fetch.
     */
    where?: Prisma.datsanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of datsans to fetch.
     */
    orderBy?: Prisma.datsanOrderByWithRelationInput | Prisma.datsanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing datsans.
     */
    cursor?: Prisma.datsanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` datsans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` datsans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of datsans.
     */
    distinct?: Prisma.DatsanScalarFieldEnum | Prisma.DatsanScalarFieldEnum[];
};
/**
 * datsan create
 */
export type datsanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a datsan.
     */
    data: Prisma.XOR<Prisma.datsanCreateInput, Prisma.datsanUncheckedCreateInput>;
};
/**
 * datsan createMany
 */
export type datsanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many datsans.
     */
    data: Prisma.datsanCreateManyInput | Prisma.datsanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * datsan createManyAndReturn
 */
export type datsanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsan
     */
    select?: Prisma.datsanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the datsan
     */
    omit?: Prisma.datsanOmit<ExtArgs> | null;
    /**
     * The data used to create many datsans.
     */
    data: Prisma.datsanCreateManyInput | Prisma.datsanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * datsan update
 */
export type datsanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a datsan.
     */
    data: Prisma.XOR<Prisma.datsanUpdateInput, Prisma.datsanUncheckedUpdateInput>;
    /**
     * Choose, which datsan to update.
     */
    where: Prisma.datsanWhereUniqueInput;
};
/**
 * datsan updateMany
 */
export type datsanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update datsans.
     */
    data: Prisma.XOR<Prisma.datsanUpdateManyMutationInput, Prisma.datsanUncheckedUpdateManyInput>;
    /**
     * Filter which datsans to update
     */
    where?: Prisma.datsanWhereInput;
    /**
     * Limit how many datsans to update.
     */
    limit?: number;
};
/**
 * datsan updateManyAndReturn
 */
export type datsanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the datsan
     */
    select?: Prisma.datsanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the datsan
     */
    omit?: Prisma.datsanOmit<ExtArgs> | null;
    /**
     * The data used to update datsans.
     */
    data: Prisma.XOR<Prisma.datsanUpdateManyMutationInput, Prisma.datsanUncheckedUpdateManyInput>;
    /**
     * Filter which datsans to update
     */
    where?: Prisma.datsanWhereInput;
    /**
     * Limit how many datsans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.datsanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * datsan upsert
 */
export type datsanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the datsan to update in case it exists.
     */
    where: Prisma.datsanWhereUniqueInput;
    /**
     * In case the datsan found by the `where` argument doesn't exist, create a new datsan with this data.
     */
    create: Prisma.XOR<Prisma.datsanCreateInput, Prisma.datsanUncheckedCreateInput>;
    /**
     * In case the datsan was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.datsanUpdateInput, Prisma.datsanUncheckedUpdateInput>;
};
/**
 * datsan delete
 */
export type datsanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which datsan to delete.
     */
    where: Prisma.datsanWhereUniqueInput;
};
/**
 * datsan deleteMany
 */
export type datsanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which datsans to delete
     */
    where?: Prisma.datsanWhereInput;
    /**
     * Limit how many datsans to delete.
     */
    limit?: number;
};
/**
 * datsan.nguoidung
 */
export type datsan$nguoidungArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * datsan.datsanchitiet
 */
export type datsan$datsanchitietArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    orderBy?: Prisma.datsanchitietOrderByWithRelationInput | Prisma.datsanchitietOrderByWithRelationInput[];
    cursor?: Prisma.datsanchitietWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.DatsanchitietScalarFieldEnum | Prisma.DatsanchitietScalarFieldEnum[];
};
/**
 * datsan.giaodich
 */
export type datsan$giaodichArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * datsan without action
 */
export type datsanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=datsan.d.ts.map