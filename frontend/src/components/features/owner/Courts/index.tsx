"use client";

import { useState } from "react";
import { useOwnerCourts } from "@/hooks/useOwnerCourts";
import { useAuth } from "@/contexts/AuthContext";
import { useOwnerCourtsForm } from "@/hooks/useOwnerCourtsForm";
import { OwnerCourt } from "@/types/court.types";
import { Plus, Search } from "lucide-react";

// Sub-components
import CourtCard from "./CourtCard";
import CourtModal from "./CourtModal";

type CourtType = "all" | "bong-da" | "cau-long" | "pickleball" | "bong-ro";

export default function OwnerCourtsClient() {
  const { courts, loading, fetchCourts } = useOwnerCourts();
  const { token } = useAuth();
  
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CourtType>("all");

  const form = useOwnerCourtsForm(token, courts, fetchCourts);

  const filteredCourts = courts.filter((court) => {
    const matchSearch = court.ten_san.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || court.loai_the_thao === filterType;
    return matchSearch && matchType;
  });

  return (
    <div className="flex flex-col min-h-screen bg-gray-50/30">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-5 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">Quản lý hệ thống sân</h2>
          <p className="text-sm text-slate-400">Tối ưu hóa doanh thu bằng cách quản lý sân hiệu quả</p>
        </div>
        <button
          onClick={() => form.openModal("add")}
          className="flex items-center gap-2 px-6 py-3 bg-primary hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-primary/20 hover:shadow-primary/30 active:scale-[0.98]"
        >
          <Plus className="w-5 h-5" />
          <span>Thêm sân mới</span>
        </button>
      </header>

      {/* Filter Bar */}
      <div className="px-8 pt-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[240px] max-w-sm focus-within:border-primary focus-within:ring-4 focus-within:ring-primary/5 transition-all shadow-sm">
          <Search className="w-5 h-5 text-slate-400" />
          <input
            type="text"
            placeholder="Tìm theo tên sân..."
            className="bg-transparent outline-none text-sm flex-1 text-slate-700 placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        
        <div className="flex bg-white p-1 rounded-xl border border-gray-200 shadow-sm">
          {(["all", "bong-da", "cau-long", "pickleball", "bong-ro"] as const).map((type) => (
            <button
              key={type}
              onClick={() => setFilterType(type)}
              className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${
                filterType === type 
                ? "bg-slate-900 text-white shadow-md" 
                : "text-slate-500 hover:bg-gray-50"
              }`}
            >
              {type === "all" ? "Tất cả" : 
               type === "bong-da" ? "Bóng đá" :
               type === "cau-long" ? "Cầu lông" :
               type === "pickleball" ? "Pickleball" : "Bóng rổ"}
            </button>
          ))}
        </div>

        <p className="ml-auto text-xs font-bold text-slate-400 bg-gray-100 px-3 py-1.5 rounded-full">
          {filteredCourts.length} sân đang hoạt động
        </p>
      </div>

      {/* Grid */}
      <main className="p-8">
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center">
            <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin mb-4" />
            <p className="text-slate-500 font-bold animate-pulse">Đang tải dữ liệu sân...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredCourts.map((court) => (
              <CourtCard
                key={court.ma_san}
                court={court}
                onEdit={(id) => form.openModal("edit", id)}
                onDelete={() => { /* Handle delete modal if needed */ }}
              />
            ))}
            
            {filteredCourts.length === 0 && (
              <div className="col-span-full py-20 flex flex-col items-center justify-center bg-white rounded-3xl border-2 border-dashed border-gray-100">
                <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
                  <Search className="w-10 h-10 text-slate-300" />
                </div>
                <h3 className="text-lg font-bold text-slate-900">Không tìm thấy kết quả</h3>
                <p className="text-slate-400 text-sm mt-1">Hãy thử thay đổi từ khóa hoặc bộ lọc</p>
              </div>
            )}
          </div>
        )}
      </main>

      <CourtModal
        isOpen={form.isModalOpen}
        onClose={form.closeModal}
        mode={form.modalMode}
        formData={form.formData}
        setFormData={form.setFormData}
        onSubmit={form.handleSubmit}
        submitting={form.submitting}
        selectedFiles={form.selectedFiles}
        previewUrls={form.previewUrls}
        existingImages={form.existingImages}
        onFilesChange={form.handleFilesChange}
        removeSelectedFile={form.removeSelectedFile}
        removeExistingImage={form.removeExistingImage}
      />
    </div>
  );
}
