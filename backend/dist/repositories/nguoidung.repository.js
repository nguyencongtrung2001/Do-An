import prisma from '../config/prisma.js';
export class UserRepository {
    async TimTheoId(id) {
        return prisma.nguoidung.findUnique({
            where: { ma_nguoi_dung: id }
        });
    }
    async TimTheoEmailHoacSdt(email, so_dien_thoai) {
        return prisma.nguoidung.findFirst({
            where: {
                OR: [{ email }, { so_dien_thoai }]
            },
            include: { diadiem: true }
        });
    }
    async TimTheoEmail(email) {
        return prisma.nguoidung.findUnique({
            where: { email }
        });
    }
    async LayTatCa() {
        return prisma.nguoidung.findMany();
    }
    async TaoMoi(data) {
        return prisma.nguoidung.create({ data });
    }
    async CapNhat(id, data) {
        return prisma.nguoidung.update({
            where: { ma_nguoi_dung: id },
            data
        });
    }
    async TaoMaNguoiDungTiepTheo() {
        const lastUser = await prisma.nguoidung.findFirst({
            orderBy: { ma_nguoi_dung: 'desc' }
        });
        let newId = "U001";
        if (lastUser && lastUser.ma_nguoi_dung.startsWith("U")) {
            const lastNumber = parseInt(lastUser.ma_nguoi_dung.replace("U", ""), 10);
            if (!isNaN(lastNumber)) {
                newId = `U${String(lastNumber + 1).padStart(3, '0')}`;
            }
        }
        return newId;
    }
    async CapNhatTrangThai(id, trang_thai) {
        return prisma.nguoidung.update({
            where: { ma_nguoi_dung: id },
            data: { trang_thai }
        });
    }
    async Xoa(id) {
        return prisma.nguoidung.delete({
            where: { ma_nguoi_dung: id }
        });
    }
    async TimChuSanChoDuyet() {
        return prisma.nguoidung.findMany({
            where: {
                vai_tro: 'Chủ sân',
                trang_thai: false
            }
        });
    }
    async DuyetChuSan(id) {
        return prisma.nguoidung.update({
            where: { ma_nguoi_dung: id },
            data: { trang_thai: true }
        });
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=nguoidung.repository.js.map