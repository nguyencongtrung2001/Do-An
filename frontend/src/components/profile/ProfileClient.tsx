"use client";

import Image from "next/image";

export default function ProfileClient() {

 

  return (
    <div className="w-full max-w-3xl mx-auto px-4 lg:px-8 py-8 min-h-[calc(100vh-200px)]">
      {/* Profile Header */}
      <div className="bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-6 md:p-8 mb-6">
        <div className="flex items-center gap-5">
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 rounded-full bg-linear-to-br from-primary/20 to-primary/5 border-[3px] border-primary/30 overflow-hidden shadow-lg shadow-primary/10 relative">
              <Image
                src="https://ui-avatars.com/api/?name=Nguyen+Van+A&size=160&background=ec1313&color=fff&bold=true&font-size=0.4"
                alt="Avatar"
                fill
                className="object-cover"
                unoptimized
              />
            </div>
          </div>
          {/* User Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 mb-1.5 flex-wrap">
              <h1 className="text-xl md:text-2xl font-extrabold text-slate-900 dark:text-white truncate">Nguyễn Văn A</h1>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <span className="material-symbols-outlined text-sm">mail</span>
              nguyenvana@gmail.com
            </p>
          </div>
          {/* Edit Profile */}
          <button className="shrink-0 flex items-center gap-2 px-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all text-slate-600 dark:text-slate-300 font-semibold text-sm hover:border-primary hover:text-primary group">
            <span className="material-symbols-outlined text-lg group-hover:text-primary transition-colors">edit</span>
            <span className="hidden sm:inline">Chỉnh sửa</span>
          </button>
        </div>
      </div>

      {/* Wallet Card */}
      <div className="relative overflow-hidden rounded-2xl shadow-xl mb-6 group">
        {/* Gradient Background */}
        <div className="absolute inset-0 bg-linear-to-br from-emerald-500 via-emerald-600 to-teal-700" />
        
        {/* Decorative Patterns */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -bottom-12 -left-12 w-48 h-48 rounded-full bg-white" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-white/30 blur-3xl" />
        </div>
        
        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: "radial-gradient(rgba(255,255,255,0.08) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
          }}
        />

        <div className="relative p-6 md:p-8">
          <div className="flex items-center justify-between mb-1">
            <div className="flex items-center gap-2 text-emerald-100/80 text-xs font-semibold uppercase tracking-widest">
              <span className="material-symbols-outlined text-base">account_balance_wallet</span>
              Số dư ví
            </div>
            <div className="flex items-center gap-1 bg-white/15 backdrop-blur-sm px-3 py-1.5 rounded-full text-white/90 text-xs font-semibold">
              <span className="material-symbols-outlined text-sm">verified</span>
              Đã xác minh
            </div>
          </div>

          <div className="flex items-end justify-between gap-4 flex-wrap">
            <div>
              <p className="text-3xl md:text-4xl font-black text-white tracking-tight mb-3">
                150.000<span className="text-lg md:text-xl font-bold text-emerald-100/80 ml-1">VNĐ</span>
              </p>
            </div>
          </div>
        </div>
      </div>

    

      
    </div>
  );
}
