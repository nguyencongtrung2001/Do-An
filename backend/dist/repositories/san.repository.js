import prisma from '../config/prisma.js';
export class CourtRepository {
    async TimTheoDiaDiem(locationId) {
        return prisma.san.findMany({
            where: { ma_dia_diem: locationId }
        });
    }
    async TimTheoIdVaChuSan(courtId, userId) {
        return prisma.san.findFirst({
            where: {
                ma_san: courtId,
                diadiem: { ma_nguoi_dung: userId }
            }
        });
    }
    async TimTheoId(courtId) {
        return prisma.san.findUnique({
            where: { ma_san: courtId }
        });
    }
    async TimAnhTheoSan(courtId) {
        return prisma.anhsan.findMany({
            where: { ma_san: courtId }
        });
    }
    async XoaAnhTheoSan(courtId) {
        return prisma.anhsan.deleteMany({
            where: { ma_san: courtId }
        });
    }
    async TaoMoi(data) {
        return prisma.san.create({ data });
    }
    async CapNhat(courtId, data) {
        return prisma.san.update({
            where: { ma_san: courtId },
            data
        });
    }
    async TaoAnhSan(images) {
        return prisma.anhsan.createMany({ data: images });
    }
    async LayTatCaVoiChiTiet() {
        return prisma.san.findMany({
            include: {
                anhsan: true,
                diadiem: true,
                datsanchitiet: {
                    include: {
                        danhgia: true
                    }
                }
            }
        });
    }
    async TaoMaSanTiepTheo() {
        const lastSan = await prisma.san.findFirst({
            orderBy: { ma_san: 'desc' }
        });
        let newSanId = "S001";
        if (lastSan && lastSan.ma_san.startsWith("S")) {
            const lastNumber = parseInt(lastSan.ma_san.replace("S", ""), 10);
            if (!isNaN(lastNumber)) {
                newSanId = `S${String(lastNumber + 1).padStart(3, '0')}`;
            }
        }
        return newSanId;
    }
    async TaoMaAnhTiepTheo() {
        const lastImg = await prisma.anhsan.findFirst({
            orderBy: { ma_anh_san: 'desc' }
        });
        let newImgId = "IMG001";
        if (lastImg && lastImg.ma_anh_san.startsWith("IMG")) {
            const lastNumber = parseInt(lastImg.ma_anh_san.replace("IMG", ""), 10);
            if (!isNaN(lastNumber)) {
                newImgId = `IMG${String(lastNumber + 1).padStart(3, '0')}`;
            }
        }
        return newImgId;
    }
    async TimDiaDiemTheoSlug(slug) {
        const locations = await prisma.diadiem.findMany({
            where: { trang_thai_duyet: true },
            include: {
                san: {
                    where: { trang_thai_san: "Đang hoạt động" },
                    include: {
                        anhsan: true,
                        datsanchitiet: {
                            include: { danhgia: true }
                        }
                    }
                },
                nguoidung: {
                    select: { so_dien_thoai: true, anh_dai_dien: true }
                }
            }
        });
        const slugify = (str) => str
            .toLowerCase()
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/đ/g, "d")
            .replace(/[^a-z0-9\s-]/g, "")
            .replace(/\s+/g, "-")
            .replace(/-+/g, "-")
            .trim();
        return locations.find(loc => slugify(loc.ten_dia_diem) === slug) || null;
    }
}
export const courtRepository = new CourtRepository();
//# sourceMappingURL=san.repository.js.map