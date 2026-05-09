"use client";

import Image from "next/image";
import { Mail, Phone, Calendar, Check, ExternalLink, User } from "lucide-react";
import { formatDate } from "@/utils/date.utils";

interface PendingOwner {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  ngay_tao: string;
  anh_dai_dien: string | null;
  anh_cccd_truoc: string | null;
  anh_cccd_sau: string | null;
}

interface OwnerCardProps {
  owner: PendingOwner;
  onApprove: (id: string) => Promise<void>;
  isApproving: boolean;
}

export default function OwnerCard({ owner, onApprove, isApproving }: OwnerCardProps) {
  const initials = owner.ho_ten.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm hover:shadow-xl transition-all p-8 group animate-in fade-in slide-in-from-bottom-4">
      <div className="flex flex-col gap-8">
        {/* Top: Avatar + Info + Button */}
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Avatar */}
          <div className="w-20 h-20 rounded-3xl bg-slate-900 overflow-hidden shrink-0 shadow-2xl shadow-slate-200 group-hover:scale-105 transition-transform">
            {owner.anh_dai_dien ? (
              <Image
                src={owner.anh_dai_dien}
                alt={owner.ho_ten}
                width={80}
                height={80}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-primary/10 text-primary flex items-center justify-center text-xl font-black">
                {initials}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 space-y-4">
            <div>
              <h4 className="text-xl font-black text-slate-900 tracking-tight">{owner.ho_ten}</h4>
              <p className="text-[10px] font-black text-primary uppercase tracking-widest mt-1">Chủ sân mới</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-bold text-slate-500">
              <p className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100/50">
                <Mail className="w-4 h-4 text-primary" />
                <span className="truncate">{owner.email}</span>
              </p>
              <p className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100/50">
                <Phone className="w-4 h-4 text-primary" />
                {owner.so_dien_thoai || "Chưa cập nhật"}
              </p>
              <p className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100/50">
                <Calendar className="w-4 h-4 text-primary" />
                Đăng ký: {formatDate(owner.ngay_tao)}
              </p>
              <p className="flex items-center gap-2.5 bg-slate-50 px-3 py-2 rounded-xl border border-slate-100/50">
                <User className="w-4 h-4 text-primary" />
                ID: #{owner.ma_nguoi_dung.slice(-8).toUpperCase()}
              </p>
            </div>
          </div>

          {/* Action */}
          <button
            onClick={() => onApprove(owner.ma_nguoi_dung)}
            disabled={isApproving}
            className={`px-8 py-4 text-sm font-black text-white bg-green-500 hover:bg-green-600 rounded-2xl transition-all flex items-center gap-2.5 shadow-xl shadow-green-500/20 active:scale-95 shrink-0 ${
              isApproving ? "opacity-50 cursor-wait" : ""
            }`}
          >
            {isApproving ? (
              <div className="animate-spin rounded-full h-5 w-5 border-4 border-white/30 border-t-white" />
            ) : (
              <Check className="w-5 h-5" />
            )}
            <span>XÁC NHẬN DUYỆT</span>
          </button>
        </div>

        {/* CCCD Images */}
        {(owner.anh_cccd_truoc || owner.anh_cccd_sau) && (
          <div className="pt-8 border-t border-slate-100 space-y-4">
            <div className="flex items-center justify-between">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Giấy tờ tùy thân (CCCD/CMND)</p>
              <span className="text-[10px] font-bold text-amber-500 bg-amber-50 px-2 py-1 rounded">Yêu cầu kiểm tra kỹ</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {owner.anh_cccd_truoc && (
                <div className="space-y-2 group/img">
                  <a href={owner.anh_cccd_truoc} target="_blank" rel="noreferrer" className="relative block w-full h-56 rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-100 group-hover/img:border-primary transition-all">
                    <Image src={owner.anh_cccd_truoc} alt="Front" fill className="object-contain" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink className="text-white w-8 h-8" />
                    </div>
                  </a>
                  <p className="text-[11px] font-black text-slate-500 text-center uppercase tracking-widest">Mặt trước</p>
                </div>
              )}
              {owner.anh_cccd_sau && (
                <div className="space-y-2 group/img">
                  <a href={owner.anh_cccd_sau} target="_blank" rel="noreferrer" className="relative block w-full h-56 rounded-3xl overflow-hidden bg-slate-900 border-2 border-slate-100 group-hover/img:border-primary transition-all">
                    <Image src={owner.anh_cccd_sau} alt="Back" fill className="object-contain" />
                    <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <ExternalLink className="text-white w-8 h-8" />
                    </div>
                  </a>
                  <p className="text-[11px] font-black text-slate-500 text-center uppercase tracking-widest">Mặt sau</p>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
