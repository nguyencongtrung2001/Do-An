"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useOwnerCourts } from "@/hooks/useOwnerCourts";
import { courtService } from "@/services/court.service";
import type { OwnerCourt } from "@/types/court.types";
import { useAuth } from "@/contexts/AuthContext";

type CourtType = "all" | "bong-da" | "cau-long" | "pickleball" | "bong-ro";

const SPORT_LABELS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ",
};

export default function OwnerCourtsClient() {
  const { courts, loading, fetchCourts } = useOwnerCourts();
  const { token } = useAuth();
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CourtType>("all");
  const [submitting, setSubmitting] = useState(false);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<OwnerCourt | null>(null);

  // Form fields
  const [newCourtName, setNewCourtName] = useState("");
  const [newCourtType, setNewCourtType] = useState("");
  const [newCourtPrice, setNewCourtPrice] = useState("");
  const [editingCourtId, setEditingCourtId] = useState<string | null>(null);

  // Image state
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ duong_dan_anh: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Filtered courts
  const filteredCourts = courts.filter((court) => {
    const matchSearch = court.ten_san.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || court.loai_the_thao === filterType;
    return matchSearch && matchType;
  });

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const resetForm = () => {
    setNewCourtName("");
    setNewCourtType("");
    setNewCourtPrice("");
    setEditingCourtId(null);
    setSelectedFiles([]);
    setPreviewUrls([]);
    setExistingImages([]);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  // ── Modal handlers ────────────────────────────────────────────────────────────

  const handleOpenModal = (mode: "add" | "edit", id?: string) => {
    resetForm();
    setModalMode(mode);

    if (mode === "edit" && id) {
      const court = courts.find((c) => c.ma_san === id);
      if (court) {
        setNewCourtName(court.ten_san);
        setNewCourtType(court.loai_the_thao);
        setNewCourtPrice(court.gia_thue_30p.toString());
        setEditingCourtId(id);
        setExistingImages(court.anhsan || []);
      }
    }

    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
    resetForm();
  };

  // ── Image picker ─────────────────────────────────────────────────────────────

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Revoke old object URLs to avoid memory leak
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles(files);
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
    // When new images are chosen in edit mode → replace existing (clear existing preview)
    if (modalMode === "edit") {
      setExistingImages([]);
    }
  };

  const removeSelectedFile = (index: number) => {
    URL.revokeObjectURL(previewUrls[index]);
    const newFiles = selectedFiles.filter((_, i) => i !== index);
    const newPreviews = previewUrls.filter((_, i) => i !== index);
    setSelectedFiles(newFiles);
    setPreviewUrls(newPreviews);
  };

  const removeExistingImage = (index: number) => {
    setExistingImages((prev) => prev.filter((_, i) => i !== index));
  };

  // ── Submit ────────────────────────────────────────────────────────────────────

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);

    try {
      // Always use FormData so images can be included for both add & edit
      const formData = new FormData();
      formData.append("ten_san", newCourtName);
      formData.append("loai_the_thao", newCourtType);
      formData.append("gia_thue_30p", newCourtPrice);

      selectedFiles.forEach((file) => {
        formData.append("images", file);
      });

      if (modalMode === "edit") {
        if (!editingCourtId) {
          alert("Không xác định được sân cần chỉnh sửa.");
          return;
        }
        await courtService.updateCourt(token, editingCourtId, formData as unknown as Record<string, unknown>);
      } else {
        await courtService.addCourt(token, formData);
      }

      await fetchCourts();
      handleCloseModal();
    } catch (error) {
      console.error("Error saving court:", error);
      alert("Có lỗi xảy ra khi lưu sân. Vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  // ── Delete ────────────────────────────────────────────────────────────────────

  const handleConfirmDelete = (court: OwnerCourt) => {
    setCourtToDelete(court);
    setIsDeleteModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setCourtToDelete(null);
    document.body.style.overflow = "";
  };

  const handleDelete = () => {
    // TODO: Call delete API when available
    handleCloseDeleteModal();
  };

  // ── Render ────────────────────────────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        .court-card-admin { transition: all 0.3s ease; }
        .court-card-admin:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.10); }
        .upload-zone { border: 2px dashed #d1d5db; transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #ec1313; background: rgba(236,19,19,0.03); }
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease forwards; }
      `}</style>

      {/* ── Top Bar ── */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Quản lý sân</h2>
          <p className="text-sm text-slate-400">Thêm mới, chỉnh sửa thông tin và giá cả các sân</p>
        </div>
        <button
          onClick={() => handleOpenModal("add")}
          className="flex items-center gap-2 px-5 py-2.5 bg-primary hover:bg-red-600 text-white text-sm font-bold rounded-xl transition-all duration-200 shadow-lg shadow-primary/30 hover:shadow-xl active:scale-[0.98]"
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Thêm sân mới
        </button>
      </header>

      {/* ── Filter Bar ── */}
      <div className="px-8 pt-5 pb-2 flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 min-w-[180px] max-w-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
          <span className="material-symbols-outlined text-slate-400 text-xl">search</span>
          <input
            type="text"
            placeholder="Tìm kiếm sân..."
            className="bg-transparent outline-none text-sm flex-1 text-slate-700 placeholder:text-slate-400"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 font-medium outline-none cursor-pointer focus:border-primary transition-all"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CourtType)}
        >
          <option value="all">Tất cả bộ môn</option>
          <option value="bong-da">⚽ Bóng đá</option>
          <option value="cau-long">🏸 Cầu lông</option>
          <option value="pickleball">🏓 Pickleball</option>
          <option value="bong-ro">🏀 Bóng rổ</option>
        </select>
        <p className="ml-auto text-xs text-slate-400 font-medium">
          {filteredCourts.length} sân
        </p>
      </div>

      {/* ── Court Cards Grid ── */}
      <div className="p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {loading ? (
            <div className="col-span-full py-20 flex justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : (
            filteredCourts.map((court) => (
              <div
                key={court.ma_san}
                className="court-card-admin fade-in bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm"
              >
                {/* Thumbnail */}
                <div className="relative w-full aspect-4/3 overflow-hidden">

                  {/* Sport label */}
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md">
                    {SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}
                  </div>

                  {/* Image count badge */}
                  {court.anhsan && court.anhsan.length > 1 && (
                    <div className="absolute bottom-3 right-3 z-10 bg-black/60 text-white text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                      <span className="material-symbols-outlined text-[10px]">photo_library</span>
                      {court.anhsan.length}
                    </div>
                  )}

                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url("${court.anhsan?.[0]?.duong_dan_anh || "/hero-stadium.png"}")`,
                    }}
                  />
                </div>

                {/* Card body */}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1 text-slate-900">
                    {court.ten_san}
                  </h3>



                  {/* Image count info */}
                  <p className="text-[11px] text-slate-400 mb-3 flex items-center gap-1">
                    <span className="material-symbols-outlined text-[11px]">image</span>
                    {court.anhsan && court.anhsan.length > 0
                      ? `${court.anhsan.length} hình ảnh`
                      : "Chưa có hình ảnh"}
                  </p>

                  <div className="flex items-center justify-between py-3 border-t border-gray-100">
                    <div>
                      <p className="text-xs text-slate-400">Giá thuê (30p)</p>
                      <p className="text-lg font-bold text-primary">
                        {Number(court.gia_thue_30p).toLocaleString()}đ
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleOpenModal("edit", court.ma_san)}
                        className="w-9 h-9 rounded-xl bg-blue-50 hover:bg-blue-100 flex items-center justify-center transition-colors"
                        title="Chỉnh sửa"
                      >
                        <span className="material-symbols-outlined text-blue-500 text-lg">edit</span>
                      </button>
                      <button
                        onClick={() => handleConfirmDelete(court)}
                        className="w-9 h-9 rounded-xl bg-red-50 hover:bg-red-100 flex items-center justify-center transition-colors"
                        title="Xóa"
                      >
                        <span className="material-symbols-outlined text-red-500 text-lg">delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}

          {!loading && filteredCourts.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <span className="material-symbols-outlined text-slate-300 text-5xl mb-2">sports_score</span>
              <p className="text-slate-500 font-medium">Không tìm thấy sân nào.</p>
            </div>
          )}
        </div>
      </div>

      {/* ══════════════════ ADD / EDIT MODAL ══════════════════ */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <div>
                <h3 className="text-lg font-bold text-slate-900">
                  {modalMode === "edit" ? "Chỉnh sửa thông tin sân" : "Thêm sân mới"}
                </h3>
                <p className="text-sm text-slate-400">Điền đầy đủ thông tin bên dưới</p>
              </div>
              <button
                onClick={handleCloseModal}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 text-xl">close</span>
              </button>
            </div>

            {/* Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Tên sân */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Tên sân *
                </label>
                <input
                  type="text"
                  placeholder="VD: Sân 5A, Sân CL-1..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50"
                  required
                  value={newCourtName}
                  onChange={(e) => setNewCourtName(e.target.value)}
                />
              </div>

              {/* Loại sân */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Loại sân *
                </label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 cursor-pointer"
                  required
                  value={newCourtType}
                  onChange={(e) => setNewCourtType(e.target.value)}
                >
                  <option value="">-- Chọn loại sân --</option>
                  <option value="bong-da">⚽ Bóng đá</option>
                  <option value="cau-long">🏸 Cầu lông</option>
                  <option value="pickleball">🏓 Pickleball</option>
                  <option value="bong-ro">🏀 Bóng rổ</option>
                </select>
              </div>


              {/* Giá thuê */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Giá thuê/30p (VNĐ) *
                </label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <span className="material-symbols-outlined text-slate-400 text-xl mr-2">payments</span>
                  <input
                    type="number"
                    placeholder="200000"
                    className="flex-1 bg-transparent outline-none text-sm"
                    required
                    min={0}
                    value={newCourtPrice}
                    onChange={(e) => setNewCourtPrice(e.target.value)}
                  />
                  <span className="text-xs font-semibold text-slate-400 ml-2">VNĐ</span>
                </div>
              </div>

              {/* ── Hình ảnh section ── */}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Hình ảnh sân
                  {modalMode === "edit" && (
                    <span className="ml-2 text-[10px] normal-case font-normal text-slate-400">
                      (chọn ảnh mới để thay thế ảnh cũ)
                    </span>
                  )}
                </label>

                {/* Existing images (edit mode, no new files chosen yet) */}
                {existingImages.length > 0 && (
                  <div>
                    <p className="text-[11px] text-slate-500 mb-1.5 font-medium">Ảnh hiện tại:</p>
                    <div className="flex flex-wrap gap-2">
                      {existingImages.map((img, idx) => (
                        <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-gray-200">
                          <Image
                            src={img.duong_dan_anh}
                            alt={`Ảnh sân ${idx + 1}`}
                            fill
                            sizes="80px"
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={() => removeExistingImage(idx)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-white text-lg">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New file previews */}
                {previewUrls.length > 0 && (
                  <div>
                    <p className="text-[11px] text-slate-500 mb-1.5 font-medium">
                      Ảnh mới đã chọn ({previewUrls.length}):
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {previewUrls.map((url, idx) => (
                        <div key={idx} className="relative group w-20 h-20 rounded-lg overflow-hidden border border-primary/40">
                          <Image src={url} alt={`Preview ${idx + 1}`} fill sizes="80px" className="object-cover" />
                          <button
                            type="button"
                            onClick={() => removeSelectedFile(idx)}
                            className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center"
                          >
                            <span className="material-symbols-outlined text-white text-lg">close</span>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload zone */}
                <div className="upload-zone rounded-xl p-5 text-center cursor-pointer relative">
                  <span className="material-symbols-outlined text-slate-300 text-4xl">cloud_upload</span>
                  <p className="text-sm text-slate-500 font-medium mt-1">
                    {selectedFiles.length > 0
                      ? `Nhấn để thêm/thay đổi ảnh`
                      : "Kéo thả hoặc nhấn để tải ảnh lên"}
                  </p>
                  <p className="text-xs text-slate-400 mt-0.5">PNG, JPG • Tối đa 5MB/ảnh • Nhiều ảnh</p>
                  <input
                    ref={fileInputRef}
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    accept="image/*"
                    multiple
                    onChange={handleFilesChange}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  disabled={submitting}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 py-3 bg-primary hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {submitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Đang lưu...</span>
                    </>
                  ) : (
                    <>
                      <span className="material-symbols-outlined text-lg">save</span>
                      <span>{modalMode === "edit" ? "Lưu thay đổi" : "Tạo sân"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ══════════════════ DELETE CONFIRM MODAL ══════════════════ */}
      {isDeleteModalOpen && courtToDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={handleCloseDeleteModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa sân</h3>
            <p className="text-sm text-slate-500 mb-6">
              Bạn có chắc chắn muốn xóa{" "}
              <strong className="text-slate-900">{courtToDelete.ten_san}</strong>? Hành động này không
              thể hoàn tác.
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={handleCloseDeleteModal}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-colors"
              >
                Hủy bỏ
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/30"
              >
                Xóa sân
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
