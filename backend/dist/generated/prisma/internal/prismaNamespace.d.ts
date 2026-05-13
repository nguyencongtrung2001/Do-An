import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../models.js";
import { type PrismaClient } from "./class.js";
export type * from '../models.js';
export type DMMF = typeof runtime.DMMF;
export type PrismaPromise<T> = runtime.Types.Public.PrismaPromise<T>;
/**
 * Prisma Errors
 */
export declare const PrismaClientKnownRequestError: typeof runtime.PrismaClientKnownRequestError;
export type PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError;
export declare const PrismaClientUnknownRequestError: typeof runtime.PrismaClientUnknownRequestError;
export type PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError;
export declare const PrismaClientRustPanicError: typeof runtime.PrismaClientRustPanicError;
export type PrismaClientRustPanicError = runtime.PrismaClientRustPanicError;
export declare const PrismaClientInitializationError: typeof runtime.PrismaClientInitializationError;
export type PrismaClientInitializationError = runtime.PrismaClientInitializationError;
export declare const PrismaClientValidationError: typeof runtime.PrismaClientValidationError;
export type PrismaClientValidationError = runtime.PrismaClientValidationError;
/**
 * Re-export of sql-template-tag
 */
export declare const sql: typeof runtime.sqltag;
export declare const empty: runtime.Sql;
export declare const join: typeof runtime.join;
export declare const raw: typeof runtime.raw;
export declare const Sql: typeof runtime.Sql;
export type Sql = runtime.Sql;
/**
 * Decimal.js
 */
export declare const Decimal: typeof runtime.Decimal;
export type Decimal = runtime.Decimal;
export type DecimalJsLike = runtime.DecimalJsLike;
/**
* Extensions
*/
export type Extension = runtime.Types.Extensions.UserArgs;
export declare const getExtensionContext: typeof runtime.Extensions.getExtensionContext;
export type Args<T, F extends runtime.Operation> = runtime.Types.Public.Args<T, F>;
export type Payload<T, F extends runtime.Operation = never> = runtime.Types.Public.Payload<T, F>;
export type Result<T, A, F extends runtime.Operation> = runtime.Types.Public.Result<T, A, F>;
export type Exact<A, W> = runtime.Types.Public.Exact<A, W>;
export type PrismaVersion = {
    client: string;
    engine: string;
};
/**
 * Prisma Client JS version: 7.8.0
 * Query Engine version: 3c6e192761c0362d496ed980de936e2f3cebcd3a
 */
export declare const prismaVersion: PrismaVersion;
/**
 * Utility Types
 */
export type Bytes = runtime.Bytes;
export type JsonObject = runtime.JsonObject;
export type JsonArray = runtime.JsonArray;
export type JsonValue = runtime.JsonValue;
export type InputJsonObject = runtime.InputJsonObject;
export type InputJsonArray = runtime.InputJsonArray;
export type InputJsonValue = runtime.InputJsonValue;
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
export declare const DbNull: runtime.DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: runtime.JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: runtime.AnyNullClass;
type SelectAndInclude = {
    select: any;
    include: any;
};
type SelectAndOmit = {
    select: any;
    omit: any;
};
/**
 * From T, pick a set of properties whose keys are in the union K
 */
type Prisma__Pick<T, K extends keyof T> = {
    [P in K]: T[P];
};
export type Enumerable<T> = T | Array<T>;
/**
 * Subset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
 */
export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
};
/**
 * SelectSubset
 * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
 * Additionally, it validates, if both select and include are present. If the case, it errors.
 */
export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & (T extends SelectAndInclude ? 'Please either choose `select` or `include`.' : T extends SelectAndOmit ? 'Please either choose `select` or `omit`.' : {});
/**
 * Subset + Intersection
 * @desc From `T` pick properties that exist in `U` and intersect `K`
 */
export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
} & K;
type Without<T, U> = {
    [P in Exclude<keyof T, keyof U>]?: never;
};
/**
 * XOR is needed to have a real mutually exclusive union type
 * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
 */
export type XOR<T, U> = T extends object ? U extends object ? (Without<T, U> & U) | (Without<U, T> & T) : U : T;
/**
 * Is T a Record?
 */
type IsObject<T extends any> = T extends Array<any> ? False : T extends Date ? False : T extends Uint8Array ? False : T extends BigInt ? False : T extends object ? True : False;
/**
 * If it's T[], return T
 */
export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T;
/**
 * From ts-toolbelt
 */
type __Either<O extends object, K extends Key> = Omit<O, K> & {
    [P in K]: Prisma__Pick<O, P & keyof O>;
}[K];
type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>;
type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>;
type _Either<O extends object, K extends Key, strict extends Boolean> = {
    1: EitherStrict<O, K>;
    0: EitherLoose<O, K>;
}[strict];
export type Either<O extends object, K extends Key, strict extends Boolean = 1> = O extends unknown ? _Either<O, K, strict> : never;
export type Union = any;
export type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K];
} & {};
/** Helper Types for "Merge" **/
export type IntersectOf<U extends Union> = (U extends unknown ? (k: U) => void : never) extends (k: infer I) => void ? I : never;
export type Overwrite<O extends object, O1 extends object> = {
    [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
} & {};
type _Merge<U extends object> = IntersectOf<Overwrite<U, {
    [K in keyof U]-?: At<U, K>;
}>>;
type Key = string | number | symbol;
type AtStrict<O extends object, K extends Key> = O[K & keyof O];
type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
    1: AtStrict<O, K>;
    0: AtLoose<O, K>;
}[strict];
export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
} & {};
export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
} & {};
type _Record<K extends keyof any, T> = {
    [P in K]: T;
};
type NoExpand<T> = T extends unknown ? T : never;
export type AtLeast<O extends object, K extends string> = NoExpand<O extends unknown ? (K extends keyof O ? {
    [P in K]: O[P];
} & O : O) | {
    [P in keyof O as P extends K ? P : never]-?: O[P];
} & O : never>;
type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;
export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
/** End Helper Types for "Merge" **/
export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;
export type Boolean = True | False;
export type True = 1;
export type False = 0;
export type Not<B extends Boolean> = {
    0: 1;
    1: 0;
}[B];
export type Extends<A1 extends any, A2 extends any> = [A1] extends [never] ? 0 : A1 extends A2 ? 1 : 0;
export type Has<U extends Union, U1 extends Union> = Not<Extends<Exclude<U1, U>, U1>>;
export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
        0: 0;
        1: 1;
    };
    1: {
        0: 1;
        1: 1;
    };
}[B1][B2];
export type Keys<U extends Union> = U extends unknown ? keyof U : never;
export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O ? O[P] : never;
} : never;
type FieldPaths<T, U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>> = IsObject<T> extends True ? U : T;
export type GetHavingFields<T> = {
    [K in keyof T]: Or<Or<Extends<'OR', K>, Extends<'AND', K>>, Extends<'NOT', K>> extends True ? T[K] extends infer TK ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never> : never : {} extends FieldPaths<T[K]> ? never : K;
}[keyof T];
/**
 * Convert tuple to union
 */
type _TupleToUnion<T> = T extends (infer E)[] ? E : never;
type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>;
export type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T;
/**
 * Like `Pick`, but additionally can also accept an array of keys
 */
export type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>;
/**
 * Exclude all keys with underscores
 */
export type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T;
export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>;
type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>;
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
export interface TypeMapCb<GlobalOmitOptions = {}> extends runtime.Types.Utils.Fn<{
    extArgs: runtime.Types.Extensions.InternalArgs;
}, runtime.Types.Utils.Record<string, any>> {
    returns: TypeMap<this['params']['extArgs'], GlobalOmitOptions>;
}
export type TypeMap<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
        omit: GlobalOmitOptions;
    };
    meta: {
        modelProps: "anhsan" | "danhgia" | "datsan" | "datsanchitiet" | "diadiem" | "giaodich" | "nguoidung" | "san";
        txIsolationLevel: TransactionIsolationLevel;
    };
    model: {
        anhsan: {
            payload: Prisma.$anhsanPayload<ExtArgs>;
            fields: Prisma.anhsanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.anhsanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.anhsanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                findFirst: {
                    args: Prisma.anhsanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.anhsanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                findMany: {
                    args: Prisma.anhsanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>[];
                };
                create: {
                    args: Prisma.anhsanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                createMany: {
                    args: Prisma.anhsanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.anhsanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>[];
                };
                delete: {
                    args: Prisma.anhsanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                update: {
                    args: Prisma.anhsanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                deleteMany: {
                    args: Prisma.anhsanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.anhsanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.anhsanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>[];
                };
                upsert: {
                    args: Prisma.anhsanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$anhsanPayload>;
                };
                aggregate: {
                    args: Prisma.AnhsanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateAnhsan>;
                };
                groupBy: {
                    args: Prisma.anhsanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnhsanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.anhsanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AnhsanCountAggregateOutputType> | number;
                };
            };
        };
        danhgia: {
            payload: Prisma.$danhgiaPayload<ExtArgs>;
            fields: Prisma.danhgiaFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.danhgiaFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.danhgiaFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                findFirst: {
                    args: Prisma.danhgiaFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.danhgiaFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                findMany: {
                    args: Prisma.danhgiaFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>[];
                };
                create: {
                    args: Prisma.danhgiaCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                createMany: {
                    args: Prisma.danhgiaCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.danhgiaCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>[];
                };
                delete: {
                    args: Prisma.danhgiaDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                update: {
                    args: Prisma.danhgiaUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                deleteMany: {
                    args: Prisma.danhgiaDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.danhgiaUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.danhgiaUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>[];
                };
                upsert: {
                    args: Prisma.danhgiaUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$danhgiaPayload>;
                };
                aggregate: {
                    args: Prisma.DanhgiaAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDanhgia>;
                };
                groupBy: {
                    args: Prisma.danhgiaGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DanhgiaGroupByOutputType>[];
                };
                count: {
                    args: Prisma.danhgiaCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DanhgiaCountAggregateOutputType> | number;
                };
            };
        };
        datsan: {
            payload: Prisma.$datsanPayload<ExtArgs>;
            fields: Prisma.datsanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.datsanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.datsanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                findFirst: {
                    args: Prisma.datsanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.datsanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                findMany: {
                    args: Prisma.datsanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>[];
                };
                create: {
                    args: Prisma.datsanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                createMany: {
                    args: Prisma.datsanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.datsanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>[];
                };
                delete: {
                    args: Prisma.datsanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                update: {
                    args: Prisma.datsanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                deleteMany: {
                    args: Prisma.datsanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.datsanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.datsanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>[];
                };
                upsert: {
                    args: Prisma.datsanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanPayload>;
                };
                aggregate: {
                    args: Prisma.DatsanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDatsan>;
                };
                groupBy: {
                    args: Prisma.datsanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DatsanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.datsanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DatsanCountAggregateOutputType> | number;
                };
            };
        };
        datsanchitiet: {
            payload: Prisma.$datsanchitietPayload<ExtArgs>;
            fields: Prisma.datsanchitietFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.datsanchitietFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.datsanchitietFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                findFirst: {
                    args: Prisma.datsanchitietFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.datsanchitietFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                findMany: {
                    args: Prisma.datsanchitietFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>[];
                };
                create: {
                    args: Prisma.datsanchitietCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                createMany: {
                    args: Prisma.datsanchitietCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.datsanchitietCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>[];
                };
                delete: {
                    args: Prisma.datsanchitietDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                update: {
                    args: Prisma.datsanchitietUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                deleteMany: {
                    args: Prisma.datsanchitietDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.datsanchitietUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.datsanchitietUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>[];
                };
                upsert: {
                    args: Prisma.datsanchitietUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$datsanchitietPayload>;
                };
                aggregate: {
                    args: Prisma.DatsanchitietAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDatsanchitiet>;
                };
                groupBy: {
                    args: Prisma.datsanchitietGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DatsanchitietGroupByOutputType>[];
                };
                count: {
                    args: Prisma.datsanchitietCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DatsanchitietCountAggregateOutputType> | number;
                };
            };
        };
        diadiem: {
            payload: Prisma.$diadiemPayload<ExtArgs>;
            fields: Prisma.diadiemFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.diadiemFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.diadiemFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                findFirst: {
                    args: Prisma.diadiemFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.diadiemFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                findMany: {
                    args: Prisma.diadiemFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>[];
                };
                create: {
                    args: Prisma.diadiemCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                createMany: {
                    args: Prisma.diadiemCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.diadiemCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>[];
                };
                delete: {
                    args: Prisma.diadiemDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                update: {
                    args: Prisma.diadiemUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                deleteMany: {
                    args: Prisma.diadiemDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.diadiemUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.diadiemUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>[];
                };
                upsert: {
                    args: Prisma.diadiemUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$diadiemPayload>;
                };
                aggregate: {
                    args: Prisma.DiadiemAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateDiadiem>;
                };
                groupBy: {
                    args: Prisma.diadiemGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiadiemGroupByOutputType>[];
                };
                count: {
                    args: Prisma.diadiemCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.DiadiemCountAggregateOutputType> | number;
                };
            };
        };
        giaodich: {
            payload: Prisma.$giaodichPayload<ExtArgs>;
            fields: Prisma.giaodichFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.giaodichFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.giaodichFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                findFirst: {
                    args: Prisma.giaodichFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.giaodichFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                findMany: {
                    args: Prisma.giaodichFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>[];
                };
                create: {
                    args: Prisma.giaodichCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                createMany: {
                    args: Prisma.giaodichCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.giaodichCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>[];
                };
                delete: {
                    args: Prisma.giaodichDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                update: {
                    args: Prisma.giaodichUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                deleteMany: {
                    args: Prisma.giaodichDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.giaodichUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.giaodichUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>[];
                };
                upsert: {
                    args: Prisma.giaodichUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$giaodichPayload>;
                };
                aggregate: {
                    args: Prisma.GiaodichAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateGiaodich>;
                };
                groupBy: {
                    args: Prisma.giaodichGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GiaodichGroupByOutputType>[];
                };
                count: {
                    args: Prisma.giaodichCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.GiaodichCountAggregateOutputType> | number;
                };
            };
        };
        nguoidung: {
            payload: Prisma.$nguoidungPayload<ExtArgs>;
            fields: Prisma.nguoidungFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.nguoidungFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.nguoidungFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                findFirst: {
                    args: Prisma.nguoidungFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.nguoidungFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                findMany: {
                    args: Prisma.nguoidungFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>[];
                };
                create: {
                    args: Prisma.nguoidungCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                createMany: {
                    args: Prisma.nguoidungCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.nguoidungCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>[];
                };
                delete: {
                    args: Prisma.nguoidungDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                update: {
                    args: Prisma.nguoidungUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                deleteMany: {
                    args: Prisma.nguoidungDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.nguoidungUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.nguoidungUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>[];
                };
                upsert: {
                    args: Prisma.nguoidungUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$nguoidungPayload>;
                };
                aggregate: {
                    args: Prisma.NguoidungAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateNguoidung>;
                };
                groupBy: {
                    args: Prisma.nguoidungGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NguoidungGroupByOutputType>[];
                };
                count: {
                    args: Prisma.nguoidungCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.NguoidungCountAggregateOutputType> | number;
                };
            };
        };
        san: {
            payload: Prisma.$sanPayload<ExtArgs>;
            fields: Prisma.sanFieldRefs;
            operations: {
                findUnique: {
                    args: Prisma.sanFindUniqueArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload> | null;
                };
                findUniqueOrThrow: {
                    args: Prisma.sanFindUniqueOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                findFirst: {
                    args: Prisma.sanFindFirstArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload> | null;
                };
                findFirstOrThrow: {
                    args: Prisma.sanFindFirstOrThrowArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                findMany: {
                    args: Prisma.sanFindManyArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>[];
                };
                create: {
                    args: Prisma.sanCreateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                createMany: {
                    args: Prisma.sanCreateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                createManyAndReturn: {
                    args: Prisma.sanCreateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>[];
                };
                delete: {
                    args: Prisma.sanDeleteArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                update: {
                    args: Prisma.sanUpdateArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                deleteMany: {
                    args: Prisma.sanDeleteManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateMany: {
                    args: Prisma.sanUpdateManyArgs<ExtArgs>;
                    result: BatchPayload;
                };
                updateManyAndReturn: {
                    args: Prisma.sanUpdateManyAndReturnArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>[];
                };
                upsert: {
                    args: Prisma.sanUpsertArgs<ExtArgs>;
                    result: runtime.Types.Utils.PayloadToResult<Prisma.$sanPayload>;
                };
                aggregate: {
                    args: Prisma.SanAggregateArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.AggregateSan>;
                };
                groupBy: {
                    args: Prisma.sanGroupByArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SanGroupByOutputType>[];
                };
                count: {
                    args: Prisma.sanCountArgs<ExtArgs>;
                    result: runtime.Types.Utils.Optional<Prisma.SanCountAggregateOutputType> | number;
                };
            };
        };
    };
} & {
    other: {
        payload: any;
        operations: {
            $executeRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $executeRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
            $queryRaw: {
                args: [query: TemplateStringsArray | Sql, ...values: any[]];
                result: any;
            };
            $queryRawUnsafe: {
                args: [query: string, ...values: any[]];
                result: any;
            };
        };
    };
};
/**
 * Enums
 */
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
/**
 * Field references
 */
/**
 * Reference to a field of type 'String'
 */
export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>;
/**
 * Reference to a field of type 'String[]'
 */
export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>;
/**
 * Reference to a field of type 'DateTime'
 */
export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>;
/**
 * Reference to a field of type 'DateTime[]'
 */
export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>;
/**
 * Reference to a field of type 'Int'
 */
export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>;
/**
 * Reference to a field of type 'Int[]'
 */
export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>;
/**
 * Reference to a field of type 'Decimal'
 */
export type DecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal'>;
/**
 * Reference to a field of type 'Decimal[]'
 */
export type ListDecimalFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Decimal[]'>;
/**
 * Reference to a field of type 'Boolean'
 */
export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>;
/**
 * Reference to a field of type 'Float'
 */
export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>;
/**
 * Reference to a field of type 'Float[]'
 */
export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>;
/**
 * Batch Payload for updateMany & deleteMany & createMany
 */
export type BatchPayload = {
    count: number;
};
export declare const defineExtension: runtime.Types.Extensions.ExtendsHook<"define", TypeMapCb, runtime.Types.Extensions.DefaultArgs>;
export type DefaultPrismaClient = PrismaClient;
export type ErrorFormat = 'pretty' | 'colorless' | 'minimal';
export type PrismaClientOptions = ({
    /**
     * Instance of a Driver Adapter, e.g., like one provided by `@prisma/adapter-pg`.
     */
    adapter: runtime.SqlDriverAdapterFactory;
    accelerateUrl?: never;
} | {
    /**
     * Prisma Accelerate URL allowing the client to connect through Accelerate instead of a direct database.
     */
    accelerateUrl: string;
    adapter?: never;
}) & {
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat;
    /**
     * @example
     * ```
     * // Shorthand for `emit: 'stdout'`
     * log: ['query', 'info', 'warn', 'error']
     *
     * // Emit as events only
     * log: [
     *   { emit: 'event', level: 'query' },
     *   { emit: 'event', level: 'info' },
     *   { emit: 'event', level: 'warn' }
     *   { emit: 'event', level: 'error' }
     * ]
     *
     * / Emit as events and log to stdout
     * og: [
     *  { emit: 'stdout', level: 'query' },
     *  { emit: 'stdout', level: 'info' },
     *  { emit: 'stdout', level: 'warn' }
     *  { emit: 'stdout', level: 'error' }
     *
     * ```
     * Read more in our [docs](https://pris.ly/d/logging).
     */
    log?: (LogLevel | LogDefinition)[];
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: TransactionIsolationLevel;
    };
    /**
     * Global configuration for omitting model fields by default.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: GlobalOmitConfig;
    /**
     * SQL commenter plugins that add metadata to SQL queries as comments.
     * Comments follow the sqlcommenter format: https://google.github.io/sqlcommenter/
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   comments: [
     *     traceContext(),
     *     queryInsights(),
     *   ],
     * })
     * ```
     */
    comments?: runtime.SqlCommenterPlugin[];
    /**
     * Optional maximum size for the query plan cache. If not provided, a default size will be used.
     * A value of `0` can be used to disable the cache entirely. A higher cache size can improve
     * performance for applications that execute a large number of unique queries, while a smaller
     * cache size can reduce memory usage.
     *
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   adapter,
     *   queryPlanCacheMaxSize: 100,
     * })
     * ```
     */
    queryPlanCacheMaxSize?: number;
};
export type GlobalOmitConfig = {
    anhsan?: Prisma.anhsanOmit;
    danhgia?: Prisma.danhgiaOmit;
    datsan?: Prisma.datsanOmit;
    datsanchitiet?: Prisma.datsanchitietOmit;
    diadiem?: Prisma.diadiemOmit;
    giaodich?: Prisma.giaodichOmit;
    nguoidung?: Prisma.nguoidungOmit;
    san?: Prisma.sanOmit;
};
export type LogLevel = 'info' | 'query' | 'warn' | 'error';
export type LogDefinition = {
    level: LogLevel;
    emit: 'stdout' | 'event';
};
export type CheckIsLogLevel<T> = T extends LogLevel ? T : never;
export type GetLogType<T> = CheckIsLogLevel<T extends LogDefinition ? T['level'] : T>;
export type GetEvents<T extends any[]> = T extends Array<LogLevel | LogDefinition> ? GetLogType<T[number]> : never;
export type QueryEvent = {
    timestamp: Date;
    query: string;
    params: string;
    duration: number;
    target: string;
};
export type LogEvent = {
    timestamp: Date;
    message: string;
    target: string;
};
export type PrismaAction = 'findUnique' | 'findUniqueOrThrow' | 'findMany' | 'findFirst' | 'findFirstOrThrow' | 'create' | 'createMany' | 'createManyAndReturn' | 'update' | 'updateMany' | 'updateManyAndReturn' | 'upsert' | 'delete' | 'deleteMany' | 'executeRaw' | 'queryRaw' | 'aggregate' | 'count' | 'runCommandRaw' | 'findRaw' | 'groupBy';
/**
 * `PrismaClient` proxy available in interactive transactions.
 */
export type TransactionClient = Omit<DefaultPrismaClient, runtime.ITXClientDenyList>;
//# sourceMappingURL=prismaNamespace.d.ts.map