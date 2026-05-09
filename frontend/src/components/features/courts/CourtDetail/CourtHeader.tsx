"use client";

import { MapPin, Star, Phone } from "lucide-react";
import { LocationDetail } from "@/types/court.types";

interface CourtHeaderProps {
  location: LocationDetail;
}

export default function CourtHeader({ location }: CourtHeaderProps) {
  return (
    <>
      <section className="w-full bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-2">
                {location.ten_dia_diem}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-sm text-slate-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span>{location.dia_chi}</span>
                </div>
                {location.so_dien_thoai && (
                  <>
                    <span className="w-1 h-1 bg-slate-400 rounded-full" />
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-4 h-4 text-primary" />
                      <span>{location.so_dien_thoai}</span>
                    </div>
                  </>
                )}
                <span className="w-1 h-1 bg-slate-400 rounded-full" />
                <div className="flex items-center gap-1 text-yellow-500">
                  <Star className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                  <span className="text-slate-900 font-bold">{location.danh_gia_tb}</span>
                  <span className="text-slate-500">({location.so_danh_gia} đánh giá)</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="bg-green-100 text-green-700 px-3 py-1.5 rounded-lg text-xs font-bold uppercase flex items-center gap-1.5">
                <span className="w-2 h-2 bg-green-500 rounded-full" />
                Đang mở cửa
              </span>
            </div>
          </div>
        </div>
      </section>

      {location.mo_ta && (
        <section className="w-full bg-white border-b border-gray-100">
          <div className="max-w-7xl mx-auto px-4 lg:px-8 py-6">
            <h2 className="text-lg font-bold text-slate-900 mb-3">Giới thiệu</h2>
            <p className="text-sm text-slate-600 leading-relaxed">{location.mo_ta}</p>
          </div>
        </section>
      )}
    </>
  );
}
