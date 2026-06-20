import prisma from '../config/prisma.js';
export class LocationRepository {
    async TimTheoChuSan(userId) {
        return prisma.diadiem.findMany({
            where: { ma_nguoi_dung: userId },
            include: {
                san: {
                    where: {
                        trang_thai_san: {
                            not: "Đã xóa"
                        }
                    },
                    include: {
                        anhsan: true
                    }
                }
            }
        });
    }
    async TimDauTienTheoChuSan(userId) {
        return prisma.diadiem.findFirst({
            where: { ma_nguoi_dung: userId }
        });
    }
    async TaoMoi(data) {
        return prisma.diadiem.create({ data });
    }
    async TaoMaDiaDiemTiepTheo() {
        const lastLocation = await prisma.diadiem.findFirst({
            orderBy: { ma_dia_diem: 'desc' }
        });
        let newLocationId = "DD001";
        if (lastLocation && lastLocation.ma_dia_diem.startsWith("DD")) {
            const lastLocNumber = parseInt(lastLocation.ma_dia_diem.replace("DD", ""), 10);
            if (!isNaN(lastLocNumber)) {
                newLocationId = `DD${String(lastLocNumber + 1).padStart(3, '0')}`;
            }
        }
        return newLocationId;
    }
    async LayTatCa() {
        return prisma.diadiem.findMany({
            include: {
                nguoidung: {
                    select: { ma_nguoi_dung: true, ho_ten: true, email: true, so_dien_thoai: true, trang_thai: true }
                },
                san: true
            },
            orderBy: { ngay_tao: 'desc' }
        });
    }
    async TimChoDuyet() {
        return prisma.diadiem.findMany({
            where: { trang_thai_duyet: false },
            include: {
                nguoidung: {
                    select: { ma_nguoi_dung: true, ho_ten: true, email: true, so_dien_thoai: true, trang_thai: true }
                },
                san: true
            },
            orderBy: { ngay_tao: 'desc' }
        });
    }
    async Duyet(id) {
        return prisma.diadiem.update({
            where: { ma_dia_diem: id },
            data: { trang_thai_duyet: true }
        });
    }
    async TuChoi(id, mo_ta) {
        return prisma.diadiem.update({
            where: { ma_dia_diem: id },
            data: {
                trang_thai_duyet: false,
                ...(mo_ta ? { mo_ta } : {})
            }
        });
    }
    async CapNhatTrangThaiTheoChuSan(userId, status) {
        return prisma.diadiem.updateMany({
            where: { ma_nguoi_dung: userId },
            data: { trang_thai_duyet: status }
        });
    }
}
export const locationRepository = new LocationRepository();
//# sourceMappingURL=diadiem.repository.js.map