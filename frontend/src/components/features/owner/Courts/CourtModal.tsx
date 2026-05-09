"use client";

import { useRef } from "react";
import Image from "next/image";
import { X, CloudUpload, Save, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { SPORT_LABELS } from "@/lib/constants/sports";

interface CourtModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: "add" | "edit";
  formData: {
    name: string;
    type: string;
    price: string;
  };
  setFormData: (data: any) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
  submitting: boolean;
  // Image handling
  selectedFiles: File[];
  previewUrls: string[];
  existingImages: { duong_dan_anh: string }[];
  onFilesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  removeSelectedFile: (idx: number) => void;
  removeExistingImage: (idx: number) => void;
}

export default function CourtModal({
  isOpen,
  onClose,
  mode,
  formData,
  setFormData,
  onSubmit,
  submitting,
  selectedFiles,
  previewUrls,
  existingImages,
  onFilesChange,
  removeSelectedFile,
  removeExistingImage,
}: CourtModalProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg max-h-[92vh] overflow-y-auto p-0 gap-0">
        <DialogHeader className="p-6 border-b border-gray-100 sticky top-0 bg-white z-10">
          <DialogTitle className="text-xl font-bold text-slate-900">
            {mode === "edit" ? "Chỉnh sửa thông tin sân" : "Thêm sân mới"}
          </DialogTitle>
          <p className="text-sm text-slate-400">Điền đầy đủ thông tin bên dưới</p>
        </DialogHeader>

        <form onSubmit={onSubmit} className="p-6 space-y-6">
          {/* Tên sân */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Tên sân *
            </label>
            <input
              type="text"
              placeholder="VD: Sân 5A, Sân CL-1..."
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            />
          </div>

          {/* Loại sân */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Loại sân *
            </label>
            <select
              className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 cursor-pointer"
              required
              value={formData.type}
              onChange={(e) => setFormData({ ...formData, type: e.target.value })}
            >
              <option value="">-- Chọn loại sân --</option>
              {Object.entries(SPORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>{label}</option>
              ))}
            </select>
          </div>

          {/* Giá thuê */}
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Giá thuê/30p (VNĐ) *
            </label>
            <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
              <input
                type="number"
                placeholder="200000"
                className="flex-1 bg-transparent outline-none text-sm"
                required
                min={0}
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: e.target.value })}
              />
              <span className="text-xs font-bold text-slate-400 ml-2">VNĐ</span>
            </div>
          </div>

          {/* Hình ảnh section */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-slate-600 uppercase tracking-wider">
              Hình ảnh sân
              {mode === "edit" && (
                <span className="ml-2 text-[10px] normal-case font-normal text-slate-400 italic">
                  (Chọn ảnh mới sẽ thay thế ảnh cũ)
                </span>
              )}
            </label>

            {/* Existing images */}
            {existingImages.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {existingImages.map((img, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                    <Image src={img.duong_dan_anh} alt="Court" fill sizes="80px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeExistingImage(idx)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* New file previews */}
            {previewUrls.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {previewUrls.map((url, idx) => (
                  <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border-2 border-primary/40 shadow-sm">
                    <Image src={url} alt="Preview" fill sizes="80px" className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removeSelectedFile(idx)}
                      className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                    >
                      <X className="w-5 h-5 text-white" />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {/* Upload zone */}
            <div className="relative border-2 border-dashed border-gray-200 rounded-xl p-8 text-center hover:border-primary hover:bg-primary/5 transition-all cursor-pointer">
              <CloudUpload className="w-8 h-8 text-slate-300 mx-auto mb-2" />
              <p className="text-sm text-slate-500 font-medium">Tải ảnh lên</p>
              <p className="text-[10px] text-slate-400 mt-1">PNG, JPG tối đa 5MB</p>
              <input
                ref={fileInputRef}
                type="file"
                multiple
                className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                accept="image/*"
                onChange={onFilesChange}
              />
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center gap-3 pt-4 sticky bottom-0 bg-white">
            <button
              type="button"
              onClick={onClose}
              disabled={submitting}
              className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-gray-50 transition-colors"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 py-3 bg-primary hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-70"
            >
              {submitting ? (
                <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  <span>{mode === "edit" ? "Lưu thay đổi" : "Tạo sân"}</span>
                </>
              )}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
