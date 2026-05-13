import prisma from '../config/prisma.js';
export class LocationRepository {
    async findByOwnerId(userId) {
        return prisma.diadiem.findMany({
            where: { ma_nguoi_dung: userId },
            include: {
                san: {
                    include: {
                        anhsan: true
                    }
                }
            }
        });
    }
    async findFirstByOwnerId(userId) {
        return prisma.diadiem.findFirst({
            where: { ma_nguoi_dung: userId }
        });
    }
    async create(data) {
        return prisma.diadiem.create({ data });
    }
    async generateNextLocationId() {
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
    async findAll() {
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
    async findPending() {
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
    async approve(id) {
        return prisma.diadiem.update({
            where: { ma_dia_diem: id },
            data: { trang_thai_duyet: true }
        });
    }
    async reject(id) {
        return prisma.diadiem.update({
            where: { ma_dia_diem: id },
            data: { trang_thai_duyet: false }
        });
    }
    async updateStatusByOwnerId(userId, status) {
        return prisma.diadiem.updateMany({
            where: { ma_nguoi_dung: userId },
            data: { trang_thai_duyet: status }
        });
    }
}
export const locationRepository = new LocationRepository();
//# sourceMappingURL=location.repository.js.map