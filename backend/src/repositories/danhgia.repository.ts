import prisma from '../config/prisma.js';

export class DanhGiaRepository {
  async TimDatSanChiTiet(ma_dat_san_chi_tiet: string) {
    return prisma.datsanchitiet.findUnique({
      where: { ma_dat_san_chi_tiet },
      include: {
        datsan: true
      }
    });
  }

  async TimDanhGiaCuaNguoiDung(ma_nguoi_dung: string, ma_dat_san_chi_tiet: string) {
    return prisma.danhgia.findFirst({
      where: {
        ma_nguoi_dung,
        ma_dat_san_chi_tiet
      }
    });
  }

  async CapNhatDanhGia(ma_danh_gia: string, so_sao: number) {
    return prisma.danhgia.update({
      where: { ma_danh_gia },
      data: { so_sao, ngay_danh_gia: new Date() }
    });
  }

  async TaoDanhGia(data: {
    ma_danh_gia: string;
    ma_nguoi_dung: string;
    ma_dat_san_chi_tiet: string;
    so_sao: number;
  }) {
    return prisma.danhgia.create({
      data: {
        ...data,
        ngay_danh_gia: new Date()
      }
    });
  }

  async TimDanhGiaTheoDiaDiem(ma_dia_diem: string) {
    return prisma.danhgia.findMany({
      where: {
        datsanchitiet: {
          san: {
            ma_dia_diem
          }
        }
      },
      select: {
        so_sao: true
      }
    });
  }

  async TimDanhGiaTheoSan(ma_san: string) {
    return prisma.danhgia.findMany({
      where: {
        datsanchitiet: {
          ma_san
        }
      },
      select: {
        so_sao: true
      }
    });
  }
}

export const danhgiaRepository = new DanhGiaRepository();
