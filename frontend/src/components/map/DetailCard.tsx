"use client";

import Link from "next/link";
import Image from "next/image";
import type { LocationMapData } from "@/types/court.types";
import { Button } from "../ui/button";

interface DetailCardProps {
  location: LocationMapData;
  onClose: () => void;
}

export default function DetailCard({ location, onClose }: DetailCardProps) {
  const slug = location.ten_dia_diem
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/đ/g, "d")
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();

  return (
    <div className="absolute bottom-8 left-8 w-96 max-w-[calc(100vw-2rem)] bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-800 overflow-hidden flex flex-col animate-in slide-in-from-bottom-5 duration-300 z-1001">
      {/* Banner Image */}
      <div className="h-32 bg-slate-200 dark:bg-slate-700 relative overflow-hidden">
        <Image src={location.image} alt={location.ten_dia_diem} fill sizes="(max-width: 768px) 100vw, 384px" className="object-cover" />
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 h-8 w-8 z-10 rounded-full bg-white/80 dark:bg-[#2a1d1d]/80 backdrop-blur-sm flex items-center justify-center text-slate-700 dark:text-slate-200 hover:text-primary transition-colors"
        >
          <span className="material-symbols-outlined text-sm">close</span>
        </button>
      </div>

      {/* Details */}
      <div className="p-5 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white leading-tight">{location.ten_dia_diem}</h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Địa chỉ : {location.dia_chi}</p>
          </div>
       
        </div>

        <div className="flex items-center gap-4 text-sm text-slate-600 dark:text-slate-300">
          
          <div className="flex items-center gap-1.5 flex-wrap">
             {location.sports.map((sport, index) => (
                <span key={index} className="px-2 py-1 bg-primary/10 text-primary text-xs font-bold rounded-md">
                  {sport}
                </span>
             ))}
          </div>
        </div>
        <div className="flex items-center justify-end mt-4">
          <Link href={`/courts/${slug}`}>
            <Button className="w-full font-bold bg-primary hover:bg-primary/90">
               Đặt lịch ngay
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}