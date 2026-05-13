import prisma from '../config/prisma.js';
export class UserRepository {
    async findById(id) {
        return prisma.nguoidung.findUnique({
            where: { ma_nguoi_dung: id }
        });
    }
    async findByEmailOrPhone(email, so_dien_thoai) {
        return prisma.nguoidung.findFirst({
            where: {
                OR: [{ email }, { so_dien_thoai }]
            }
        });
    }
    async findAll() {
        return prisma.nguoidung.findMany();
    }
    async create(data) {
        return prisma.nguoidung.create({ data });
    }
    async generateNextUserId() {
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
    async updateStatus(id, trang_thai) {
        return prisma.nguoidung.update({
            where: { ma_nguoi_dung: id },
            data: { trang_thai }
        });
    }
    async delete(id) {
        return prisma.nguoidung.delete({
            where: { ma_nguoi_dung: id }
        });
    }
    async findOwnersPending() {
        return prisma.nguoidung.findMany({
            where: {
                vai_tro: 'Chủ sân',
                trang_thai: false
            }
        });
    }
    async approveOwner(id) {
        return prisma.nguoidung.update({
            where: { ma_nguoi_dung: id },
            data: { trang_thai: true }
        });
    }
}
export const userRepository = new UserRepository();
//# sourceMappingURL=user.repository.js.map