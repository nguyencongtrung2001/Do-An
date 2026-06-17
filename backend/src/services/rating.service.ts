import prisma from '../config/prisma.js';

export const ratingService = {
  /**
   * Tạo một đánh giá mới
   */
  async TaoDanhGia(data: {
    ma_nguoi_dung: string;
    ma_dat_san_chi_tiet: string;
    so_sao: number;
  }) {
    
    const bookingDetail = await prisma.datsanchitiet.findUnique({
      where: { ma_dat_san_chi_tiet: data.ma_dat_san_chi_tiet },
      include: {
        datsan: true
      }
    });

    if (!bookingDetail) {
      throw new Error("Chi tiết đặt sân không tồn tại");
    }

    
    if (bookingDetail.datsan?.ma_nguoi_dung !== data.ma_nguoi_dung) {
      throw new Error("Bạn không có quyền đánh giá đơn đặt sân này");
    }

    
    
    

    
    const existingRating = await prisma.danhgia.findFirst({
      where: {
        ma_nguoi_dung: data.ma_nguoi_dung,
        ma_dat_san_chi_tiet: data.ma_dat_san_chi_tiet
      }
    });

    if (existingRating) {
      
      return prisma.danhgia.update({
        where: { ma_danh_gia: existingRating.ma_danh_gia },
        data: { so_sao: data.so_sao, ngay_danh_gia: new Date() }
      });
    }

    
    const ma_danh_gia = `DG_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    
    return prisma.danhgia.create({
      data: {
        ma_danh_gia,
        ma_nguoi_dung: data.ma_nguoi_dung,
        ma_dat_san_chi_tiet: data.ma_dat_san_chi_tiet,
        so_sao: data.so_sao,
        ngay_danh_gia: new Date()
      }
    });
  },

  /**
   * Lấy điểm đánh giá trung bình của một địa điểm (dựa trên tất cả các sân thuộc địa điểm đó)
   */
  async LayDiemDanhGiaDiaDiem(ma_dia_diem: string) {
    const ratings = await prisma.danhgia.findMany({
      where: {
        datsanchitiet: {
          san: {
            ma_dia_diem: ma_dia_diem
          }
        }
      },
      select: {
        so_sao: true
      }
    });

    if (ratings.length === 0) {
      return { average: 0, count: 0 };
    }

    const totalStars = ratings.reduce((sum: number, r: { so_sao: number | null }) => sum + (r.so_sao || 0), 0);
    const average = totalStars / ratings.length;

    return {
      average: Number(average.toFixed(1)),
      count: ratings.length
    };
  },

  /**
   * Lấy điểm đánh giá trung bình của một sân cụ thể
   */
  async LayDiemDanhGiaSan(ma_san: string) {
    const ratings = await prisma.danhgia.findMany({
      where: {
        datsanchitiet: {
          ma_san: ma_san
        }
      },
      select: {
        so_sao: true
      }
    });

    if (ratings.length === 0) {
      return { average: 0, count: 0 };
    }

    const totalStars = ratings.reduce((sum: number, r: { so_sao: number | null }) => sum + (r.so_sao || 0), 0);
    const average = totalStars / ratings.length;

    return {
      average: Number(average.toFixed(1)),
      count: ratings.length
    };
  },
  
  /**
   * Lấy đánh giá của một người dùng cho một chi tiết đặt sân
   */
  async LayDanhGiaCuaToi(ma_nguoi_dung: string, ma_dat_san_chi_tiet: string) {
    return prisma.danhgia.findFirst({
      where: {
        ma_nguoi_dung,
        ma_dat_san_chi_tiet
      }
    });
  }
};
