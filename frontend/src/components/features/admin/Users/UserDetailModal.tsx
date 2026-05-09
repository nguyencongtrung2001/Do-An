"use client";

import Image from "next/image";
import { X, Mail, Phone, Calendar, Shield, MapPin, ExternalLink, User as UserIcon } from "lucide-react";
import { formatDate } from "@/utils/date.utils";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DbUser {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  trang_thai: boolean;
  ngay_tao: string;
  anh_dai_dien: string | null;
  anh_cccd_truoc: string | null;
  anh_cccd_sau: string | null;
}

interface UserDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: DbUser | null;
}

export default function UserDetailModal({
  isOpen,
  onClose,
  user,
}: UserDetailModalProps) {
  if (!user) return null;

  const initials = user.ho_ten.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl p-0 overflow-hidden rounded-[40px] border-none shadow-2xl bg-white">
        <DialogHeader className="p-10 bg-slate-900 text-white relative">
          <div className="flex items-center gap-8 relative z-10">
            <div className="w-24 h-24 rounded-[32px] bg-white/10 backdrop-blur-md overflow-hidden border border-white/20 shadow-2xl">
              {user.anh_dai_dien ? (
                <Image src={user.anh_dai_dien} alt={user.ho_ten} width={96} height={96} className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-2xl font-black text-white">
                  {initials}
                </div>
              )}
            </div>
            <div className="space-y-2">
              <DialogTitle className="text-3xl font-black tracking-tighter">{user.ho_ten}</DialogTitle>
              <div className="flex items-center gap-3">
                <span className="px-3 py-1 rounded-full bg-primary text-[10px] font-black uppercase tracking-widest text-white shadow-lg shadow-primary/20">
                  {user.vai_tro}
                </span>
                <span className={`px-3 py-1 rounded-full border text-[10px] font-black uppercase tracking-widest ${user.trang_thai ? "bg-green-500/10 text-green-400 border-green-500/20" : "bg-red-500/10 text-red-400 border-red-500/20"}`}>
                  {user.trang_thai ? "ĐANG HOẠT ĐỘNG" : "BỊ KHÓA / VÔ HIỆU"}
                </span>
              </div>
            </div>
          </div>
          
          <button onClick={onClose} className="absolute top-8 right-8 w-10 h-10 rounded-full bg-white/5 hover:bg-white/10 transition-all flex items-center justify-center border border-white/10">
             <X className="w-5 h-5 text-slate-400 hover:text-white" />
          </button>
        </DialogHeader>

        <div className="p-10 space-y-10">
          {/* General Information */}
          <div className="grid grid-cols-2 gap-8">
            <div className="space-y-6">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Mail className="w-3 h-3 text-primary" /> EMAIL TÀI KHOẢN
                 </p>
                 <p className="text-sm font-black text-slate-900">{user.email}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Phone className="w-3 h-3 text-primary" /> SỐ ĐIỆN THOẠI
                 </p>
                 <p className="text-sm font-black text-slate-900">{user.so_dien_thoai || "Chưa cập nhật"}</p>
               </div>
            </div>

            <div className="space-y-6">
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Shield className="w-3 h-3 text-primary" /> MÃ ĐỊNH DANH (UID)
                 </p>
                 <p className="text-sm font-black text-slate-900 font-mono tracking-tight">{user.ma_nguoi_dung}</p>
               </div>
               <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                   <Calendar className="w-3 h-3 text-primary" /> NGÀY THAM GIA
                 </p>
                 <p className="text-sm font-black text-slate-900">{formatDate(user.ngay_tao)}</p>
               </div>
            </div>
          </div>

          {/* Legal Documents for Owners */}
          {user.vai_tro === "Chủ sân" && (user.anh_cccd_truoc || user.anh_cccd_sau) && (
            <div className="pt-10 border-t border-slate-100 space-y-6">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">HỒ SƠ PHÁP LÝ (CCCD/CMND)</h4>
               <div className="grid grid-cols-2 gap-8">
                  {user.anh_cccd_truoc && (
                    <div className="space-y-3 group/img">
                      <a href={user.anh_cccd_truoc} target="_blank" rel="noreferrer" className="block relative w-full h-48 rounded-3xl bg-slate-900 overflow-hidden border-2 border-slate-100 group-hover/img:border-primary transition-all">
                        <Image src={user.anh_cccd_truoc} alt="Front" fill className="object-contain" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="text-white w-8 h-8" />
                        </div>
                      </a>
                      <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">MẶT TRƯỚC</p>
                    </div>
                  )}
                  {user.anh_cccd_sau && (
                    <div className="space-y-3 group/img">
                      <a href={user.anh_cccd_sau} target="_blank" rel="noreferrer" className="block relative w-full h-48 rounded-3xl bg-slate-900 overflow-hidden border-2 border-slate-100 group-hover/img:border-primary transition-all">
                        <Image src={user.anh_cccd_sau} alt="Back" fill className="object-contain" />
                        <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                          <ExternalLink className="text-white w-8 h-8" />
                        </div>
                      </a>
                      <p className="text-center text-[10px] font-black text-slate-500 uppercase tracking-widest">MẶT SAU</p>
                    </div>
                  )}
               </div>
            </div>
          )}

          <div className="flex justify-end pt-4">
             <button onClick={onClose} className="px-8 py-4 rounded-2xl bg-slate-100 hover:bg-slate-200 text-slate-900 text-xs font-black uppercase tracking-widest transition-all">
               ĐÓNG HỒ SƠ
             </button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
