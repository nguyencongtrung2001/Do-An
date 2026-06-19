ALTER TABLE "san" DROP CONSTRAINT "san_trang_thai_san_check";
ALTER TABLE "san" ADD CONSTRAINT "san_trang_thai_san_check" CHECK ("trang_thai_san" IN ('Đang hoạt động', 'Đang bảo trì', 'Đã khóa', 'Đã xóa'));
