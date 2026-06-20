import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class.js";
import * as Prisma from "./internal/prismaNamespace.js";
export * as $Enums from './enums.js';
export * from "./enums.js";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more Anhsans
 * const anhsans = await prisma.anhsan.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model anhsan
 *
 */
export type anhsan = Prisma.anhsanModel;
/**
 * Model danhgia
 *
 */
export type danhgia = Prisma.danhgiaModel;
/**
 * Model datsan
 *
 */
export type datsan = Prisma.datsanModel;
/**
 * Model datsanchitiet
 *
 */
export type datsanchitiet = Prisma.datsanchitietModel;
/**
 * Model diadiem
 *
 */
export type diadiem = Prisma.diadiemModel;
/**
 * Model giaodich
 *
 */
export type giaodich = Prisma.giaodichModel;
/**
 * Model nguoidung
 *
 */
export type nguoidung = Prisma.nguoidungModel;
/**
 * Model san
 *
 */
export type san = Prisma.sanModel;
//# sourceMappingURL=client.d.ts.map