import { courtRepository } from "../repositories/court.repository.js";
import prisma from '../config/prisma.js';

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

  async getMapLocations(sportType: string) {
    const whereClause: any = {
      trang_thai_duyet: true,
    };

    if (sportType !== 'all') {
      const sportMap: Record<string, string> = {
        'bong-da': 'Bóng đá',
        'cau-long': 'Cầu lông',
        'pickleball': 'Pickleball',
        'bong-ro': 'Bóng rổ',
        'tennis': 'Tennis',
        'bida': 'Bida'
      };
      const dbSportName = sportMap[sportType] || sportType;

      whereClause.san = {
        some: {
          loai_the_thao: {
            contains: dbSportName,
            mode: 'insensitive'
          }
        },
      };
    }

    const locations = await prisma.diadiem.findMany({
      where: whereClause,
      include: {
        san: {
          select: {
            loai_the_thao: true,
            anhsan: {
              take: 1,
              select: { duong_dan_anh: true }
            }
          },
        },
      },
    });

    return locations.map(loc => {
      const sports = Array.from(new Set(loc.san.map(s => s.loai_the_thao)));
      // Lấy ảnh đại diện từ sân đầu tiên nếu có
      let image = "/images/categories/soccer.png";
      for (const s of loc.san) {
        if (s.anhsan && s.anhsan.length > 0 && s.anhsan[0]?.duong_dan_anh) {
          image = s.anhsan[0].duong_dan_anh;
          break;
        }
      }

      return {
        ma_dia_diem: loc.ma_dia_diem,
        ten_dia_diem: loc.ten_dia_diem,
        dia_chi: loc.dia_chi,
        lat: Number(loc.vi_do),
        lng: Number(loc.kinh_do),
        sports: sports,
        image: image
      };
    });
  }
}

export const fieldService = new FieldService();
