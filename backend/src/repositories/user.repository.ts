import prisma from '../config/prisma.js';

export class UserRepository {
  async findById(id: string) {
    return prisma.nguoidung.findUnique({
      where: { ma_nguoi_dung: id }
    });
  }

  async findByEmailOrPhone(email: string, so_dien_thoai: string) {
    return prisma.nguoidung.findFirst({
      where: {
        OR: [{ email }, { so_dien_thoai }]
      }
    });
  }

  async findByEmail(email: string) {
    return prisma.nguoidung.findUnique({
      where: { email }
    });
  }

  async findAll() {
    return prisma.nguoidung.findMany();
  }

  async create(data: {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai?: string;
    mat_khau?: string;
    ma_google?: string;
    anh_dai_dien?: string;
    vai_tro?: string;
    trang_thai?: boolean;
    anh_cccd_truoc?: string;
    anh_cccd_sau?: string;
  }) {
    return prisma.nguoidung.create({ data });
  }

  async update(id: string, data: any) {
    return prisma.nguoidung.update({
      where: { ma_nguoi_dung: id },
      data
    });
  }

  async generateNextUserId(): Promise<string> {
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

  async updateStatus(id: string, trang_thai: boolean) {
    return prisma.nguoidung.update({
      where: { ma_nguoi_dung: id },
      data: { trang_thai }
    });
  }

  async delete(id: string) {
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

  async approveOwner(id: string) {
    return prisma.nguoidung.update({
      where: { ma_nguoi_dung: id },
      data: { trang_thai: true }
    });
  }
}

export const userRepository = new UserRepository();
