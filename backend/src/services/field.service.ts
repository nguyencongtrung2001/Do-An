import prisma from "../config/prisma.js"
export class FieldService {
  async getFields() {
    const sans = await prisma.san.findMany({
      include: {
        diadiem: true, 
        datsanchitiet: {
          include: {
            danhgia: true 
          }
        }
      }
    });

    const result = sans.map(san => {
      let totalStars = 0;
      let reviewCount = 0;

      san.datsanchitiet.forEach(dat => {
        dat.danhgia.forEach(dg => {
          if (dg.so_sao) {
            totalStars += dg.so_sao;
            reviewCount++;
          }
        });
      });

      const avgSao = reviewCount > 0 ? (totalStars / reviewCount) : 0;

      return {
        ma_san: san.ma_san,
        ten_san: san.ten_san,
        so_sao: Number(avgSao.toFixed(1)), 
        loai_the_thao: san.loai_the_thao,
        ten_dia_diem: san.diadiem?.ten_dia_diem || "",
        dia_chi: san.diadiem?.dia_chi || ""
      };
    });

    return result;
  }
}

export const fieldService = new FieldService();