const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  await prisma.$executeRawUnsafe(`ALTER TABLE "san" DROP CONSTRAINT "san_trang_thai_san_check"`);
  await prisma.$executeRawUnsafe(`ALTER TABLE "san" ADD CONSTRAINT "san_trang_thai_san_check" CHECK ("trang_thai_san" IN ('Đang hoạt động', 'Đang bảo trì', 'Đã khóa', 'Đã xóa'))`);
  console.log("Updated san check constraint");
}

main().catch(console.error).finally(() => prisma.$disconnect());
