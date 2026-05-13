import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace.js";
/**
 * Model san
 * This table contains check constraints and requires additional setup for migrations. Visit https://pris.ly/d/check-constraints for more info.
 */
export type sanModel = runtime.Types.Result.DefaultSelection<Prisma.$sanPayload>;
export type AggregateSan = {
    _count: SanCountAggregateOutputType | null;
    _avg: SanAvgAggregateOutputType | null;
    _sum: SanSumAggregateOutputType | null;
    _min: SanMinAggregateOutputType | null;
    _max: SanMaxAggregateOutputType | null;
};
export type SanAvgAggregateOutputType = {
    gia_thue_30p: runtime.Decimal | null;
};
export type SanSumAggregateOutputType = {
    gia_thue_30p: runtime.Decimal | null;
};
export type SanMinAggregateOutputType = {
    ma_san: string | null;
    ma_dia_diem: string | null;
    ten_san: string | null;
    loai_the_thao: string | null;
    gia_thue_30p: runtime.Decimal | null;
    trang_thai_san: string | null;
    ngay_tao: Date | null;
};
export type SanMaxAggregateOutputType = {
    ma_san: string | null;
    ma_dia_diem: string | null;
    ten_san: string | null;
    loai_the_thao: string | null;
    gia_thue_30p: runtime.Decimal | null;
    trang_thai_san: string | null;
    ngay_tao: Date | null;
};
export type SanCountAggregateOutputType = {
    ma_san: number;
    ma_dia_diem: number;
    ten_san: number;
    loai_the_thao: number;
    gia_thue_30p: number;
    trang_thai_san: number;
    ngay_tao: number;
    _all: number;
};
export type SanAvgAggregateInputType = {
    gia_thue_30p?: true;
};
export type SanSumAggregateInputType = {
    gia_thue_30p?: true;
};
export type SanMinAggregateInputType = {
    ma_san?: true;
    ma_dia_diem?: true;
    ten_san?: true;
    loai_the_thao?: true;
    gia_thue_30p?: true;
    trang_thai_san?: true;
    ngay_tao?: true;
};
export type SanMaxAggregateInputType = {
    ma_san?: true;
    ma_dia_diem?: true;
    ten_san?: true;
    loai_the_thao?: true;
    gia_thue_30p?: true;
    trang_thai_san?: true;
    ngay_tao?: true;
};
export type SanCountAggregateInputType = {
    ma_san?: true;
    ma_dia_diem?: true;
    ten_san?: true;
    loai_the_thao?: true;
    gia_thue_30p?: true;
    trang_thai_san?: true;
    ngay_tao?: true;
    _all?: true;
};
export type SanAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which san to aggregate.
     */
    where?: Prisma.sanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sans to fetch.
     */
    orderBy?: Prisma.sanOrderByWithRelationInput | Prisma.sanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.sanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned sans
    **/
    _count?: true | SanCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SanAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SanSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SanMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SanMaxAggregateInputType;
};
export type GetSanAggregateType<T extends SanAggregateArgs> = {
    [P in keyof T & keyof AggregateSan]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSan[P]> : Prisma.GetScalarType<T[P], AggregateSan[P]>;
};
export type sanGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.sanWhereInput;
    orderBy?: Prisma.sanOrderByWithAggregationInput | Prisma.sanOrderByWithAggregationInput[];
    by: Prisma.SanScalarFieldEnum[] | Prisma.SanScalarFieldEnum;
    having?: Prisma.sanScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SanCountAggregateInputType | true;
    _avg?: SanAvgAggregateInputType;
    _sum?: SanSumAggregateInputType;
    _min?: SanMinAggregateInputType;
    _max?: SanMaxAggregateInputType;
};
export type SanGroupByOutputType = {
    ma_san: string;
    ma_dia_diem: string | null;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal;
    trang_thai_san: string;
    ngay_tao: Date | null;
    _count: SanCountAggregateOutputType | null;
    _avg: SanAvgAggregateOutputType | null;
    _sum: SanSumAggregateOutputType | null;
    _min: SanMinAggregateOutputType | null;
    _max: SanMaxAggregateOutputType | null;
};
export type GetSanGroupByPayload<T extends sanGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SanGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SanGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SanGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SanGroupByOutputType[P]>;
}>>;
export type sanWhereInput = {
    AND?: Prisma.sanWhereInput | Prisma.sanWhereInput[];
    OR?: Prisma.sanWhereInput[];
    NOT?: Prisma.sanWhereInput | Prisma.sanWhereInput[];
    ma_san?: Prisma.StringFilter<"san"> | string;
    ma_dia_diem?: Prisma.StringNullableFilter<"san"> | string | null;
    ten_san?: Prisma.StringFilter<"san"> | string;
    loai_the_thao?: Prisma.StringFilter<"san"> | string;
    gia_thue_30p?: Prisma.DecimalFilter<"san"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFilter<"san"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"san"> | Date | string | null;
    anhsan?: Prisma.AnhsanListRelationFilter;
    datsanchitiet?: Prisma.DatsanchitietListRelationFilter;
    diadiem?: Prisma.XOR<Prisma.DiadiemNullableScalarRelationFilter, Prisma.diadiemWhereInput> | null;
};
export type sanOrderByWithRelationInput = {
    ma_san?: Prisma.SortOrder;
    ma_dia_diem?: Prisma.SortOrderInput | Prisma.SortOrder;
    ten_san?: Prisma.SortOrder;
    loai_the_thao?: Prisma.SortOrder;
    gia_thue_30p?: Prisma.SortOrder;
    trang_thai_san?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    anhsan?: Prisma.anhsanOrderByRelationAggregateInput;
    datsanchitiet?: Prisma.datsanchitietOrderByRelationAggregateInput;
    diadiem?: Prisma.diadiemOrderByWithRelationInput;
};
export type sanWhereUniqueInput = Prisma.AtLeast<{
    ma_san?: string;
    AND?: Prisma.sanWhereInput | Prisma.sanWhereInput[];
    OR?: Prisma.sanWhereInput[];
    NOT?: Prisma.sanWhereInput | Prisma.sanWhereInput[];
    ma_dia_diem?: Prisma.StringNullableFilter<"san"> | string | null;
    ten_san?: Prisma.StringFilter<"san"> | string;
    loai_the_thao?: Prisma.StringFilter<"san"> | string;
    gia_thue_30p?: Prisma.DecimalFilter<"san"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFilter<"san"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"san"> | Date | string | null;
    anhsan?: Prisma.AnhsanListRelationFilter;
    datsanchitiet?: Prisma.DatsanchitietListRelationFilter;
    diadiem?: Prisma.XOR<Prisma.DiadiemNullableScalarRelationFilter, Prisma.diadiemWhereInput> | null;
}, "ma_san">;
export type sanOrderByWithAggregationInput = {
    ma_san?: Prisma.SortOrder;
    ma_dia_diem?: Prisma.SortOrderInput | Prisma.SortOrder;
    ten_san?: Prisma.SortOrder;
    loai_the_thao?: Prisma.SortOrder;
    gia_thue_30p?: Prisma.SortOrder;
    trang_thai_san?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.sanCountOrderByAggregateInput;
    _avg?: Prisma.sanAvgOrderByAggregateInput;
    _max?: Prisma.sanMaxOrderByAggregateInput;
    _min?: Prisma.sanMinOrderByAggregateInput;
    _sum?: Prisma.sanSumOrderByAggregateInput;
};
export type sanScalarWhereWithAggregatesInput = {
    AND?: Prisma.sanScalarWhereWithAggregatesInput | Prisma.sanScalarWhereWithAggregatesInput[];
    OR?: Prisma.sanScalarWhereWithAggregatesInput[];
    NOT?: Prisma.sanScalarWhereWithAggregatesInput | Prisma.sanScalarWhereWithAggregatesInput[];
    ma_san?: Prisma.StringWithAggregatesFilter<"san"> | string;
    ma_dia_diem?: Prisma.StringNullableWithAggregatesFilter<"san"> | string | null;
    ten_san?: Prisma.StringWithAggregatesFilter<"san"> | string;
    loai_the_thao?: Prisma.StringWithAggregatesFilter<"san"> | string;
    gia_thue_30p?: Prisma.DecimalWithAggregatesFilter<"san"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringWithAggregatesFilter<"san"> | string;
    ngay_tao?: Prisma.DateTimeNullableWithAggregatesFilter<"san"> | Date | string | null;
};
export type sanCreateInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanCreateNestedManyWithoutSanInput;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutSanInput;
    diadiem?: Prisma.diadiemCreateNestedOneWithoutSanInput;
};
export type sanUncheckedCreateInput = {
    ma_san: string;
    ma_dia_diem?: string | null;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanUncheckedCreateNestedManyWithoutSanInput;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutSanInput;
};
export type sanUpdateInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUpdateManyWithoutSanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutSanNestedInput;
    diadiem?: Prisma.diadiemUpdateOneWithoutSanNestedInput;
};
export type sanUncheckedUpdateInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dia_diem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUncheckedUpdateManyWithoutSanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutSanNestedInput;
};
export type sanCreateManyInput = {
    ma_san: string;
    ma_dia_diem?: string | null;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
};
export type sanUpdateManyMutationInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type sanUncheckedUpdateManyInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dia_diem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type SanNullableScalarRelationFilter = {
    is?: Prisma.sanWhereInput | null;
    isNot?: Prisma.sanWhereInput | null;
};
export type SanListRelationFilter = {
    every?: Prisma.sanWhereInput;
    some?: Prisma.sanWhereInput;
    none?: Prisma.sanWhereInput;
};
export type sanOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type sanCountOrderByAggregateInput = {
    ma_san?: Prisma.SortOrder;
    ma_dia_diem?: Prisma.SortOrder;
    ten_san?: Prisma.SortOrder;
    loai_the_thao?: Prisma.SortOrder;
    gia_thue_30p?: Prisma.SortOrder;
    trang_thai_san?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type sanAvgOrderByAggregateInput = {
    gia_thue_30p?: Prisma.SortOrder;
};
export type sanMaxOrderByAggregateInput = {
    ma_san?: Prisma.SortOrder;
    ma_dia_diem?: Prisma.SortOrder;
    ten_san?: Prisma.SortOrder;
    loai_the_thao?: Prisma.SortOrder;
    gia_thue_30p?: Prisma.SortOrder;
    trang_thai_san?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type sanMinOrderByAggregateInput = {
    ma_san?: Prisma.SortOrder;
    ma_dia_diem?: Prisma.SortOrder;
    ten_san?: Prisma.SortOrder;
    loai_the_thao?: Prisma.SortOrder;
    gia_thue_30p?: Prisma.SortOrder;
    trang_thai_san?: Prisma.SortOrder;
    ngay_tao?: Prisma.SortOrder;
};
export type sanSumOrderByAggregateInput = {
    gia_thue_30p?: Prisma.SortOrder;
};
export type sanCreateNestedOneWithoutAnhsanInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutAnhsanInput, Prisma.sanUncheckedCreateWithoutAnhsanInput>;
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutAnhsanInput;
    connect?: Prisma.sanWhereUniqueInput;
};
export type sanUpdateOneWithoutAnhsanNestedInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutAnhsanInput, Prisma.sanUncheckedCreateWithoutAnhsanInput>;
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutAnhsanInput;
    upsert?: Prisma.sanUpsertWithoutAnhsanInput;
    disconnect?: Prisma.sanWhereInput | boolean;
    delete?: Prisma.sanWhereInput | boolean;
    connect?: Prisma.sanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.sanUpdateToOneWithWhereWithoutAnhsanInput, Prisma.sanUpdateWithoutAnhsanInput>, Prisma.sanUncheckedUpdateWithoutAnhsanInput>;
};
export type sanCreateNestedOneWithoutDatsanchitietInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDatsanchitietInput, Prisma.sanUncheckedCreateWithoutDatsanchitietInput>;
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDatsanchitietInput;
    connect?: Prisma.sanWhereUniqueInput;
};
export type sanUpdateOneWithoutDatsanchitietNestedInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDatsanchitietInput, Prisma.sanUncheckedCreateWithoutDatsanchitietInput>;
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDatsanchitietInput;
    upsert?: Prisma.sanUpsertWithoutDatsanchitietInput;
    disconnect?: Prisma.sanWhereInput | boolean;
    delete?: Prisma.sanWhereInput | boolean;
    connect?: Prisma.sanWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.sanUpdateToOneWithWhereWithoutDatsanchitietInput, Prisma.sanUpdateWithoutDatsanchitietInput>, Prisma.sanUncheckedUpdateWithoutDatsanchitietInput>;
};
export type sanCreateNestedManyWithoutDiadiemInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput> | Prisma.sanCreateWithoutDiadiemInput[] | Prisma.sanUncheckedCreateWithoutDiadiemInput[];
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDiadiemInput | Prisma.sanCreateOrConnectWithoutDiadiemInput[];
    createMany?: Prisma.sanCreateManyDiadiemInputEnvelope;
    connect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
};
export type sanUncheckedCreateNestedManyWithoutDiadiemInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput> | Prisma.sanCreateWithoutDiadiemInput[] | Prisma.sanUncheckedCreateWithoutDiadiemInput[];
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDiadiemInput | Prisma.sanCreateOrConnectWithoutDiadiemInput[];
    createMany?: Prisma.sanCreateManyDiadiemInputEnvelope;
    connect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
};
export type sanUpdateManyWithoutDiadiemNestedInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput> | Prisma.sanCreateWithoutDiadiemInput[] | Prisma.sanUncheckedCreateWithoutDiadiemInput[];
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDiadiemInput | Prisma.sanCreateOrConnectWithoutDiadiemInput[];
    upsert?: Prisma.sanUpsertWithWhereUniqueWithoutDiadiemInput | Prisma.sanUpsertWithWhereUniqueWithoutDiadiemInput[];
    createMany?: Prisma.sanCreateManyDiadiemInputEnvelope;
    set?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    disconnect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    delete?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    connect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    update?: Prisma.sanUpdateWithWhereUniqueWithoutDiadiemInput | Prisma.sanUpdateWithWhereUniqueWithoutDiadiemInput[];
    updateMany?: Prisma.sanUpdateManyWithWhereWithoutDiadiemInput | Prisma.sanUpdateManyWithWhereWithoutDiadiemInput[];
    deleteMany?: Prisma.sanScalarWhereInput | Prisma.sanScalarWhereInput[];
};
export type sanUncheckedUpdateManyWithoutDiadiemNestedInput = {
    create?: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput> | Prisma.sanCreateWithoutDiadiemInput[] | Prisma.sanUncheckedCreateWithoutDiadiemInput[];
    connectOrCreate?: Prisma.sanCreateOrConnectWithoutDiadiemInput | Prisma.sanCreateOrConnectWithoutDiadiemInput[];
    upsert?: Prisma.sanUpsertWithWhereUniqueWithoutDiadiemInput | Prisma.sanUpsertWithWhereUniqueWithoutDiadiemInput[];
    createMany?: Prisma.sanCreateManyDiadiemInputEnvelope;
    set?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    disconnect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    delete?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    connect?: Prisma.sanWhereUniqueInput | Prisma.sanWhereUniqueInput[];
    update?: Prisma.sanUpdateWithWhereUniqueWithoutDiadiemInput | Prisma.sanUpdateWithWhereUniqueWithoutDiadiemInput[];
    updateMany?: Prisma.sanUpdateManyWithWhereWithoutDiadiemInput | Prisma.sanUpdateManyWithWhereWithoutDiadiemInput[];
    deleteMany?: Prisma.sanScalarWhereInput | Prisma.sanScalarWhereInput[];
};
export type sanCreateWithoutAnhsanInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutSanInput;
    diadiem?: Prisma.diadiemCreateNestedOneWithoutSanInput;
};
export type sanUncheckedCreateWithoutAnhsanInput = {
    ma_san: string;
    ma_dia_diem?: string | null;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutSanInput;
};
export type sanCreateOrConnectWithoutAnhsanInput = {
    where: Prisma.sanWhereUniqueInput;
    create: Prisma.XOR<Prisma.sanCreateWithoutAnhsanInput, Prisma.sanUncheckedCreateWithoutAnhsanInput>;
};
export type sanUpsertWithoutAnhsanInput = {
    update: Prisma.XOR<Prisma.sanUpdateWithoutAnhsanInput, Prisma.sanUncheckedUpdateWithoutAnhsanInput>;
    create: Prisma.XOR<Prisma.sanCreateWithoutAnhsanInput, Prisma.sanUncheckedCreateWithoutAnhsanInput>;
    where?: Prisma.sanWhereInput;
};
export type sanUpdateToOneWithWhereWithoutAnhsanInput = {
    where?: Prisma.sanWhereInput;
    data: Prisma.XOR<Prisma.sanUpdateWithoutAnhsanInput, Prisma.sanUncheckedUpdateWithoutAnhsanInput>;
};
export type sanUpdateWithoutAnhsanInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutSanNestedInput;
    diadiem?: Prisma.diadiemUpdateOneWithoutSanNestedInput;
};
export type sanUncheckedUpdateWithoutAnhsanInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dia_diem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutSanNestedInput;
};
export type sanCreateWithoutDatsanchitietInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanCreateNestedManyWithoutSanInput;
    diadiem?: Prisma.diadiemCreateNestedOneWithoutSanInput;
};
export type sanUncheckedCreateWithoutDatsanchitietInput = {
    ma_san: string;
    ma_dia_diem?: string | null;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanUncheckedCreateNestedManyWithoutSanInput;
};
export type sanCreateOrConnectWithoutDatsanchitietInput = {
    where: Prisma.sanWhereUniqueInput;
    create: Prisma.XOR<Prisma.sanCreateWithoutDatsanchitietInput, Prisma.sanUncheckedCreateWithoutDatsanchitietInput>;
};
export type sanUpsertWithoutDatsanchitietInput = {
    update: Prisma.XOR<Prisma.sanUpdateWithoutDatsanchitietInput, Prisma.sanUncheckedUpdateWithoutDatsanchitietInput>;
    create: Prisma.XOR<Prisma.sanCreateWithoutDatsanchitietInput, Prisma.sanUncheckedCreateWithoutDatsanchitietInput>;
    where?: Prisma.sanWhereInput;
};
export type sanUpdateToOneWithWhereWithoutDatsanchitietInput = {
    where?: Prisma.sanWhereInput;
    data: Prisma.XOR<Prisma.sanUpdateWithoutDatsanchitietInput, Prisma.sanUncheckedUpdateWithoutDatsanchitietInput>;
};
export type sanUpdateWithoutDatsanchitietInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUpdateManyWithoutSanNestedInput;
    diadiem?: Prisma.diadiemUpdateOneWithoutSanNestedInput;
};
export type sanUncheckedUpdateWithoutDatsanchitietInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ma_dia_diem?: Prisma.NullableStringFieldUpdateOperationsInput | string | null;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUncheckedUpdateManyWithoutSanNestedInput;
};
export type sanCreateWithoutDiadiemInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanCreateNestedManyWithoutSanInput;
    datsanchitiet?: Prisma.datsanchitietCreateNestedManyWithoutSanInput;
};
export type sanUncheckedCreateWithoutDiadiemInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
    anhsan?: Prisma.anhsanUncheckedCreateNestedManyWithoutSanInput;
    datsanchitiet?: Prisma.datsanchitietUncheckedCreateNestedManyWithoutSanInput;
};
export type sanCreateOrConnectWithoutDiadiemInput = {
    where: Prisma.sanWhereUniqueInput;
    create: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput>;
};
export type sanCreateManyDiadiemInputEnvelope = {
    data: Prisma.sanCreateManyDiadiemInput | Prisma.sanCreateManyDiadiemInput[];
    skipDuplicates?: boolean;
};
export type sanUpsertWithWhereUniqueWithoutDiadiemInput = {
    where: Prisma.sanWhereUniqueInput;
    update: Prisma.XOR<Prisma.sanUpdateWithoutDiadiemInput, Prisma.sanUncheckedUpdateWithoutDiadiemInput>;
    create: Prisma.XOR<Prisma.sanCreateWithoutDiadiemInput, Prisma.sanUncheckedCreateWithoutDiadiemInput>;
};
export type sanUpdateWithWhereUniqueWithoutDiadiemInput = {
    where: Prisma.sanWhereUniqueInput;
    data: Prisma.XOR<Prisma.sanUpdateWithoutDiadiemInput, Prisma.sanUncheckedUpdateWithoutDiadiemInput>;
};
export type sanUpdateManyWithWhereWithoutDiadiemInput = {
    where: Prisma.sanScalarWhereInput;
    data: Prisma.XOR<Prisma.sanUpdateManyMutationInput, Prisma.sanUncheckedUpdateManyWithoutDiadiemInput>;
};
export type sanScalarWhereInput = {
    AND?: Prisma.sanScalarWhereInput | Prisma.sanScalarWhereInput[];
    OR?: Prisma.sanScalarWhereInput[];
    NOT?: Prisma.sanScalarWhereInput | Prisma.sanScalarWhereInput[];
    ma_san?: Prisma.StringFilter<"san"> | string;
    ma_dia_diem?: Prisma.StringNullableFilter<"san"> | string | null;
    ten_san?: Prisma.StringFilter<"san"> | string;
    loai_the_thao?: Prisma.StringFilter<"san"> | string;
    gia_thue_30p?: Prisma.DecimalFilter<"san"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFilter<"san"> | string;
    ngay_tao?: Prisma.DateTimeNullableFilter<"san"> | Date | string | null;
};
export type sanCreateManyDiadiemInput = {
    ma_san: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: string;
    ngay_tao?: Date | string | null;
};
export type sanUpdateWithoutDiadiemInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUpdateManyWithoutSanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUpdateManyWithoutSanNestedInput;
};
export type sanUncheckedUpdateWithoutDiadiemInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    anhsan?: Prisma.anhsanUncheckedUpdateManyWithoutSanNestedInput;
    datsanchitiet?: Prisma.datsanchitietUncheckedUpdateManyWithoutSanNestedInput;
};
export type sanUncheckedUpdateManyWithoutDiadiemInput = {
    ma_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ten_san?: Prisma.StringFieldUpdateOperationsInput | string;
    loai_the_thao?: Prisma.StringFieldUpdateOperationsInput | string;
    gia_thue_30p?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    trang_thai_san?: Prisma.StringFieldUpdateOperationsInput | string;
    ngay_tao?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type SanCountOutputType
 */
export type SanCountOutputType = {
    anhsan: number;
    datsanchitiet: number;
};
export type SanCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    anhsan?: boolean | SanCountOutputTypeCountAnhsanArgs;
    datsanchitiet?: boolean | SanCountOutputTypeCountDatsanchitietArgs;
};
/**
 * SanCountOutputType without action
 */
export type SanCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SanCountOutputType
     */
    select?: Prisma.SanCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SanCountOutputType without action
 */
export type SanCountOutputTypeCountAnhsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.anhsanWhereInput;
};
/**
 * SanCountOutputType without action
 */
export type SanCountOutputTypeCountDatsanchitietArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.datsanchitietWhereInput;
};
export type sanSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_san?: boolean;
    ma_dia_diem?: boolean;
    ten_san?: boolean;
    loai_the_thao?: boolean;
    gia_thue_30p?: boolean;
    trang_thai_san?: boolean;
    ngay_tao?: boolean;
    anhsan?: boolean | Prisma.san$anhsanArgs<ExtArgs>;
    datsanchitiet?: boolean | Prisma.san$datsanchitietArgs<ExtArgs>;
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
    _count?: boolean | Prisma.SanCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["san"]>;
export type sanSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_san?: boolean;
    ma_dia_diem?: boolean;
    ten_san?: boolean;
    loai_the_thao?: boolean;
    gia_thue_30p?: boolean;
    trang_thai_san?: boolean;
    ngay_tao?: boolean;
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
}, ExtArgs["result"]["san"]>;
export type sanSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    ma_san?: boolean;
    ma_dia_diem?: boolean;
    ten_san?: boolean;
    loai_the_thao?: boolean;
    gia_thue_30p?: boolean;
    trang_thai_san?: boolean;
    ngay_tao?: boolean;
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
}, ExtArgs["result"]["san"]>;
export type sanSelectScalar = {
    ma_san?: boolean;
    ma_dia_diem?: boolean;
    ten_san?: boolean;
    loai_the_thao?: boolean;
    gia_thue_30p?: boolean;
    trang_thai_san?: boolean;
    ngay_tao?: boolean;
};
export type sanOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"ma_san" | "ma_dia_diem" | "ten_san" | "loai_the_thao" | "gia_thue_30p" | "trang_thai_san" | "ngay_tao", ExtArgs["result"]["san"]>;
export type sanInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    anhsan?: boolean | Prisma.san$anhsanArgs<ExtArgs>;
    datsanchitiet?: boolean | Prisma.san$datsanchitietArgs<ExtArgs>;
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
    _count?: boolean | Prisma.SanCountOutputTypeDefaultArgs<ExtArgs>;
};
export type sanIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
};
export type sanIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    diadiem?: boolean | Prisma.san$diadiemArgs<ExtArgs>;
};
export type $sanPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "san";
    objects: {
        anhsan: Prisma.$anhsanPayload<ExtArgs>[];
        datsanchitiet: Prisma.$datsanchitietPayload<ExtArgs>[];
        diadiem: Prisma.$diadiemPayload<ExtArgs> | null;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        ma_san: string;
        ma_dia_diem: string | null;
        ten_san: string;
        loai_the_thao: string;
        gia_thue_30p: runtime.Decimal;
        trang_thai_san: string;
        ngay_tao: Date | null;
    }, ExtArgs["result"]["san"]>;
    composites: {};
};
export type sanGetPayload<S extends boolean | null | undefined | sanDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$sanPayload, S>;
export type sanCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<sanFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SanCountAggregateInputType | true;
};
export interface sanDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['san'];
        meta: {
            name: 'san';
        };
    };
    /**
     * Find zero or one San that matches the filter.
     * @param {sanFindUniqueArgs} args - Arguments to find a San
     * @example
     * // Get one San
     * const san = await prisma.san.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends sanFindUniqueArgs>(args: Prisma.SelectSubset<T, sanFindUniqueArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one San that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {sanFindUniqueOrThrowArgs} args - Arguments to find a San
     * @example
     * // Get one San
     * const san = await prisma.san.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends sanFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, sanFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first San that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanFindFirstArgs} args - Arguments to find a San
     * @example
     * // Get one San
     * const san = await prisma.san.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends sanFindFirstArgs>(args?: Prisma.SelectSubset<T, sanFindFirstArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first San that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanFindFirstOrThrowArgs} args - Arguments to find a San
     * @example
     * // Get one San
     * const san = await prisma.san.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends sanFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, sanFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Sans that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Sans
     * const sans = await prisma.san.findMany()
     *
     * // Get first 10 Sans
     * const sans = await prisma.san.findMany({ take: 10 })
     *
     * // Only select the `ma_san`
     * const sanWithMa_sanOnly = await prisma.san.findMany({ select: { ma_san: true } })
     *
     */
    findMany<T extends sanFindManyArgs>(args?: Prisma.SelectSubset<T, sanFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a San.
     * @param {sanCreateArgs} args - Arguments to create a San.
     * @example
     * // Create one San
     * const San = await prisma.san.create({
     *   data: {
     *     // ... data to create a San
     *   }
     * })
     *
     */
    create<T extends sanCreateArgs>(args: Prisma.SelectSubset<T, sanCreateArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Sans.
     * @param {sanCreateManyArgs} args - Arguments to create many Sans.
     * @example
     * // Create many Sans
     * const san = await prisma.san.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends sanCreateManyArgs>(args?: Prisma.SelectSubset<T, sanCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Sans and returns the data saved in the database.
     * @param {sanCreateManyAndReturnArgs} args - Arguments to create many Sans.
     * @example
     * // Create many Sans
     * const san = await prisma.san.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Sans and only return the `ma_san`
     * const sanWithMa_sanOnly = await prisma.san.createManyAndReturn({
     *   select: { ma_san: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends sanCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, sanCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a San.
     * @param {sanDeleteArgs} args - Arguments to delete one San.
     * @example
     * // Delete one San
     * const San = await prisma.san.delete({
     *   where: {
     *     // ... filter to delete one San
     *   }
     * })
     *
     */
    delete<T extends sanDeleteArgs>(args: Prisma.SelectSubset<T, sanDeleteArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one San.
     * @param {sanUpdateArgs} args - Arguments to update one San.
     * @example
     * // Update one San
     * const san = await prisma.san.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends sanUpdateArgs>(args: Prisma.SelectSubset<T, sanUpdateArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Sans.
     * @param {sanDeleteManyArgs} args - Arguments to filter Sans to delete.
     * @example
     * // Delete a few Sans
     * const { count } = await prisma.san.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends sanDeleteManyArgs>(args?: Prisma.SelectSubset<T, sanDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Sans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Sans
     * const san = await prisma.san.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends sanUpdateManyArgs>(args: Prisma.SelectSubset<T, sanUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Sans and returns the data updated in the database.
     * @param {sanUpdateManyAndReturnArgs} args - Arguments to update many Sans.
     * @example
     * // Update many Sans
     * const san = await prisma.san.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Sans and only return the `ma_san`
     * const sanWithMa_sanOnly = await prisma.san.updateManyAndReturn({
     *   select: { ma_san: true },
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
    updateManyAndReturn<T extends sanUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, sanUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one San.
     * @param {sanUpsertArgs} args - Arguments to update or create a San.
     * @example
     * // Update or create a San
     * const san = await prisma.san.upsert({
     *   create: {
     *     // ... data to create a San
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the San we want to update
     *   }
     * })
     */
    upsert<T extends sanUpsertArgs>(args: Prisma.SelectSubset<T, sanUpsertArgs<ExtArgs>>): Prisma.Prisma__sanClient<runtime.Types.Result.GetResult<Prisma.$sanPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Sans.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanCountArgs} args - Arguments to filter Sans to count.
     * @example
     * // Count the number of Sans
     * const count = await prisma.san.count({
     *   where: {
     *     // ... the filter for the Sans we want to count
     *   }
     * })
    **/
    count<T extends sanCountArgs>(args?: Prisma.Subset<T, sanCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SanCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a San.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SanAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SanAggregateArgs>(args: Prisma.Subset<T, SanAggregateArgs>): Prisma.PrismaPromise<GetSanAggregateType<T>>;
    /**
     * Group by San.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {sanGroupByArgs} args - Group by arguments.
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
    groupBy<T extends sanGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: sanGroupByArgs['orderBy'];
    } : {
        orderBy?: sanGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, sanGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSanGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the san model
     */
    readonly fields: sanFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for san.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__sanClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    anhsan<T extends Prisma.san$anhsanArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.san$anhsanArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$anhsanPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    datsanchitiet<T extends Prisma.san$datsanchitietArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.san$datsanchitietArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$datsanchitietPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    diadiem<T extends Prisma.san$diadiemArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.san$diadiemArgs<ExtArgs>>): Prisma.Prisma__diadiemClient<runtime.Types.Result.GetResult<Prisma.$diadiemPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
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
 * Fields of the san model
 */
export interface sanFieldRefs {
    readonly ma_san: Prisma.FieldRef<"san", 'String'>;
    readonly ma_dia_diem: Prisma.FieldRef<"san", 'String'>;
    readonly ten_san: Prisma.FieldRef<"san", 'String'>;
    readonly loai_the_thao: Prisma.FieldRef<"san", 'String'>;
    readonly gia_thue_30p: Prisma.FieldRef<"san", 'Decimal'>;
    readonly trang_thai_san: Prisma.FieldRef<"san", 'String'>;
    readonly ngay_tao: Prisma.FieldRef<"san", 'DateTime'>;
}
/**
 * san findUnique
 */
export type sanFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which san to fetch.
     */
    where: Prisma.sanWhereUniqueInput;
};
/**
 * san findUniqueOrThrow
 */
export type sanFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which san to fetch.
     */
    where: Prisma.sanWhereUniqueInput;
};
/**
 * san findFirst
 */
export type sanFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which san to fetch.
     */
    where?: Prisma.sanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sans to fetch.
     */
    orderBy?: Prisma.sanOrderByWithRelationInput | Prisma.sanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for sans.
     */
    cursor?: Prisma.sanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of sans.
     */
    distinct?: Prisma.SanScalarFieldEnum | Prisma.SanScalarFieldEnum[];
};
/**
 * san findFirstOrThrow
 */
export type sanFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which san to fetch.
     */
    where?: Prisma.sanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sans to fetch.
     */
    orderBy?: Prisma.sanOrderByWithRelationInput | Prisma.sanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for sans.
     */
    cursor?: Prisma.sanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of sans.
     */
    distinct?: Prisma.SanScalarFieldEnum | Prisma.SanScalarFieldEnum[];
};
/**
 * san findMany
 */
export type sanFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter, which sans to fetch.
     */
    where?: Prisma.sanWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of sans to fetch.
     */
    orderBy?: Prisma.sanOrderByWithRelationInput | Prisma.sanOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing sans.
     */
    cursor?: Prisma.sanWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` sans from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` sans.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of sans.
     */
    distinct?: Prisma.SanScalarFieldEnum | Prisma.SanScalarFieldEnum[];
};
/**
 * san create
 */
export type sanCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to create a san.
     */
    data: Prisma.XOR<Prisma.sanCreateInput, Prisma.sanUncheckedCreateInput>;
};
/**
 * san createMany
 */
export type sanCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many sans.
     */
    data: Prisma.sanCreateManyInput | Prisma.sanCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * san createManyAndReturn
 */
export type sanCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the san
     */
    select?: Prisma.sanSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the san
     */
    omit?: Prisma.sanOmit<ExtArgs> | null;
    /**
     * The data used to create many sans.
     */
    data: Prisma.sanCreateManyInput | Prisma.sanCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.sanIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * san update
 */
export type sanUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The data needed to update a san.
     */
    data: Prisma.XOR<Prisma.sanUpdateInput, Prisma.sanUncheckedUpdateInput>;
    /**
     * Choose, which san to update.
     */
    where: Prisma.sanWhereUniqueInput;
};
/**
 * san updateMany
 */
export type sanUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update sans.
     */
    data: Prisma.XOR<Prisma.sanUpdateManyMutationInput, Prisma.sanUncheckedUpdateManyInput>;
    /**
     * Filter which sans to update
     */
    where?: Prisma.sanWhereInput;
    /**
     * Limit how many sans to update.
     */
    limit?: number;
};
/**
 * san updateManyAndReturn
 */
export type sanUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the san
     */
    select?: Prisma.sanSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the san
     */
    omit?: Prisma.sanOmit<ExtArgs> | null;
    /**
     * The data used to update sans.
     */
    data: Prisma.XOR<Prisma.sanUpdateManyMutationInput, Prisma.sanUncheckedUpdateManyInput>;
    /**
     * Filter which sans to update
     */
    where?: Prisma.sanWhereInput;
    /**
     * Limit how many sans to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.sanIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * san upsert
 */
export type sanUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * The filter to search for the san to update in case it exists.
     */
    where: Prisma.sanWhereUniqueInput;
    /**
     * In case the san found by the `where` argument doesn't exist, create a new san with this data.
     */
    create: Prisma.XOR<Prisma.sanCreateInput, Prisma.sanUncheckedCreateInput>;
    /**
     * In case the san was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.sanUpdateInput, Prisma.sanUncheckedUpdateInput>;
};
/**
 * san delete
 */
export type sanDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
    /**
     * Filter which san to delete.
     */
    where: Prisma.sanWhereUniqueInput;
};
/**
 * san deleteMany
 */
export type sanDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which sans to delete
     */
    where?: Prisma.sanWhereInput;
    /**
     * Limit how many sans to delete.
     */
    limit?: number;
};
/**
 * san.anhsan
 */
export type san$anhsanArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the anhsan
     */
    select?: Prisma.anhsanSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the anhsan
     */
    omit?: Prisma.anhsanOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.anhsanInclude<ExtArgs> | null;
    where?: Prisma.anhsanWhereInput;
    orderBy?: Prisma.anhsanOrderByWithRelationInput | Prisma.anhsanOrderByWithRelationInput[];
    cursor?: Prisma.anhsanWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.AnhsanScalarFieldEnum | Prisma.AnhsanScalarFieldEnum[];
};
/**
 * san.datsanchitiet
 */
export type san$datsanchitietArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
 * san.diadiem
 */
export type san$diadiemArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
/**
 * san without action
 */
export type sanDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
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
};
//# sourceMappingURL=san.d.ts.map