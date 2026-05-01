import prisma from '../config/prisma.js';

export class CourtRepository {
  async findByLocationId(locationId: string) {
    return prisma.san.findMany({
      where: { ma_dia_diem: locationId }
    });
  }

  async findByIdAndOwnerId(courtId: string, userId: string) {
    return prisma.san.findFirst({
      where: {
        ma_san: courtId,
        diadiem: { ma_nguoi_dung: userId }
      }
    });
  }

  async findById(courtId: string) {
    return prisma.san.findUnique({
      where: { ma_san: courtId }
    });
  }

  async findImagesByCourtId(courtId: string) {
    return prisma.anhsan.findMany({
      where: { ma_san: courtId }
    });
  }

  async deleteImagesByCourtId(courtId: string) {
    return prisma.anhsan.deleteMany({
      where: { ma_san: courtId }
    });
  }

  async create(data: {
    ma_san: string;
    ma_dia_diem: string;
    ten_san: string;
    loai_the_thao: string;
    gia_thue_30p: number;
    trang_thai_san?: string;
  }) {
    return prisma.san.create({ data });
  }

  async update(courtId: string, data: {
    ten_san?: string;
    loai_the_thao?: string;
    gia_thue_30p?: number;
    trang_thai_san?: string;
  }) {
    return prisma.san.update({
      where: { ma_san: courtId },
      data
    });
  }

  async createCourtImages(images: { ma_anh_san: string; ma_san: string; duong_dan_anh: string; ma_cloudinary: string }[]) {
    return prisma.anhsan.createMany({ data: images });
  }

  async findAllWithDetails() {
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

  async generateNextCourtId(): Promise<string> {
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

  async generateNextImageId(): Promise<string> {
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
}

export const courtRepository = new CourtRepository();
