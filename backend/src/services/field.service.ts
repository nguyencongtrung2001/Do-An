import { courtRepository } from "../repositories/court.repository.js";

export class FieldService {
  async getFields() {
    const sans = await courtRepository.findAllWithDetails();

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
      const anh_dai_dien = san.anhsan?.[0]?.duong_dan_anh || "/images/categories/soccer.png";

      return {
        ma_san: san.ma_san,
        ten_san: san.ten_san,
        so_sao: Number(avgSao.toFixed(1)),
        loai_the_thao: san.loai_the_thao,
        ten_dia_diem: san.diadiem?.ten_dia_diem || "",
        dia_chi: san.diadiem?.dia_chi || "",
        anh_dai_dien: anh_dai_dien,
        kinh_do: san.diadiem?.kinh_do ? Number(san.diadiem.kinh_do) : null,
        vi_do: san.diadiem?.vi_do ? Number(san.diadiem.vi_do) : null,
        gia_thue_30p: san.gia_thue_30p ? Number(san.gia_thue_30p) : 0
      };
    });

    return result;
  }
}

export const fieldService = new FieldService();
