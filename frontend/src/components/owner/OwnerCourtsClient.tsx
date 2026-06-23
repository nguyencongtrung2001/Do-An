"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import { useOwnerCourts } from "@/hooks/useOwnerCourts";
import { courtService } from "@/services/court.service";
import type { OwnerCourt } from "@/types/court.types";
import { useAuth } from "@/contexts/AuthContext";
import { useOwnerApprovalStatus } from "@/hooks/useOwnerApprovalStatus";

type CourtType = "all" | "bong-da" | "cau-long" | "tennis" | "pickleball" | "bong-ro";

const SPORT_LABELS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ",
  "tennis": "🎾 Tennis",
};

export default function OwnerCourtsClient() {
  const { courts, loading, fetchCourts, deleteCourt } = useOwnerCourts();
  const { token } = useAuth();
  const { canAddCourt, isAccountApproved, isLocationApproved } = useOwnerApprovalStatus();

  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CourtType>("all");
  const [submitting, setSubmitting] = useState(false);

  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<OwnerCourt | null>(null);

  
  const [newCourtName, setNewCourtName] = useState("");
  const [newCourtType, setNewCourtType] = useState("");
  const [newCourtPrice, setNewCourtPrice] = useState("");
  const [editingCourtId, setEditingCourtId] = useState<string | null>(null);

  
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ duong_dan_anh: string }[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  
  const filteredCourts = courts.filter((court) => {
    const matchSearch = court.ten_san.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || court.loai_the_thao === filterType;
    return matchSearch && matchType;
  });

  

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

  

  const handleFilesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    
    previewUrls.forEach((url) => URL.revokeObjectURL(url));

    setSelectedFiles(files);
    setPreviewUrls(files.map((f) => URL.createObjectURL(f)));
    
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

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;
    setSubmitting(true);

    try {
      
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

  const handleDelete = async () => {
    if (!courtToDelete) return;
    
    setSubmitting(true);
    const success = await deleteCourt(courtToDelete.ma_san);
    setSubmitting(false);
    
    if (success) {
      handleCloseDeleteModal();
    }
  };

  

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

      {}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 md:px-8 py-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 sm:gap-0">
        <div>
          <h2 className="text-lg md:text-xl font-bold text-slate-900">Quản lý sân</h2>
          <p className="text-xs md:text-sm text-slate-400">Thêm mới, chỉnh sửa thông tin và giá cả các sân</p>
        </div>
        <button
          onClick={() => {
            if (!canAddCourt) {
              alert("Bạn chưa thể thêm sân mới. Vui lòng chờ Admin duyệt tài khoản và địa điểm của bạn.");
              return;
            }
            handleOpenModal("add");
          }}
          disabled={!canAddCourt}
          className={`w-full sm:w-auto justify-center flex items-center gap-2 px-5 py-2.5 text-sm font-bold rounded-xl transition-all duration-200 ${
            canAddCourt 
              ? "bg-primary hover:bg-red-600 text-white shadow-lg shadow-primary/30 hover:shadow-xl active:scale-[0.98]" 
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          title={!canAddCourt ? "Cần được Admin duyệt để thêm sân" : ""}
        >
          <span className="material-symbols-outlined text-lg">add</span>
          Thêm sân mới
        </button>
      </header>

      {}
      {!canAddCourt && (
        <div className="px-4 md:px-8 pt-4 md:pt-5">
          <div className="flex items-center gap-3 bg-amber-50 border border-amber-200 text-amber-700 rounded-xl px-4 py-3 text-sm font-medium">
            <span className="material-symbols-outlined text-amber-500">hourglass_top</span>
            {!isAccountApproved
              ? "Tài khoản của bạn đang chờ Admin duyệt. Bạn sẽ có thể thêm sân sau khi được duyệt."
              : !isLocationApproved
              ? "Địa điểm của bạn đang chờ Admin duyệt. Bạn sẽ có thể thêm sân sau khi địa điểm được duyệt."
              : null}
          </div>
        </div>
      )}

      {}
      <div className="px-4 md:px-8 pt-4 md:pt-5 pb-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 w-full sm:flex-1 sm:max-w-xs focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
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
          className="w-full sm:w-auto bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 font-medium outline-none cursor-pointer focus:border-primary transition-all"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CourtType)}
        >
          <option value="all">Tất cả bộ môn</option>
          <option value="bong-da">⚽ Bóng đá</option>
          <option value="cau-long">🏸 Cầu lông</option>
          <option value="pickleball">🏓 Pickleball</option>
          <option value="bong-ro">🏀 Bóng rổ</option>
        </select>
        <p className="w-full sm:w-auto sm:ml-auto text-xs text-slate-400 font-medium text-center sm:text-right">
          {filteredCourts.length} sân
        </p>
      </div>

      {}
      <div className="p-4 md:p-8">
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
                {}
                <div className="relative w-full aspect-4/3 overflow-hidden">

                  {}
                  <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md">
                    {SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}
                  </div>

                  {}
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

                {}
                <div className="p-5">
                  <h3 className="text-base font-bold mb-1 text-slate-900">
                    {court.ten_san}
                  </h3>



                  {}
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

      {}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[92vh] overflow-y-auto shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {}
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

            {}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {}
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

              {}
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


              {}
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

              {}
              <div className="space-y-2">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">
                  Hình ảnh sân
                  {modalMode === "edit" && (
                    <span className="ml-2 text-[10px] normal-case font-normal text-slate-400">
                      (chọn ảnh mới để thay thế ảnh cũ)
                    </span>
                  )}
                </label>

                {}
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

                {}
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

                {}
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

              {}
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

      {}
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
                disabled={submitting}
                className="flex-1 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/30 flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {submitting ? (
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : (
                  "Xóa sân"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
