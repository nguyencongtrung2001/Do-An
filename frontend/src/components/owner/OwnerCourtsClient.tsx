"use client";

import { useState, useEffect, useCallback } from "react";

type CourtType = "all" | "bong-da" | "cau-long" | "pickleball" | "bong-ro";

interface Court {
  ma_san: string;
  ten_san: string;
  loai_the_thao: string;
  trang_thai_san: string;
  gia_thue_30p: number;
  anhsan?: { duong_dan_anh: string }[];
}

const SPORT_LABELS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ"
};

import { useAuth } from "@/contexts/AuthContext";

export default function OwnerCourtsClient() {
  const [courts, setCourts] = useState<Court[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CourtType>("all");
  const { token } = useAuth();

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<Court | null>(null);

  // Form state for adding
  const [newCourtName, setNewCourtName] = useState("");
  const [newCourtType, setNewCourtType] = useState("");
  const [newCourtPrice, setNewCourtPrice] = useState("");
  const [newCourtStatus, setNewCourtStatus] = useState("Đang hoạt động");
  const [newCourtImages, setNewCourtImages] = useState<FileList | null>(null);
  const [editingCourtId, setEditingCourtId] = useState<string | null>(null);

  const fetchCourts = useCallback(async () => {
    if (!token) return;
    try {
      const res = await fetch("http://localhost:3000/owner/my-courts", {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      if (data.success) {
        setCourts(data.courts);
      }
    } catch (error) {
      console.error("Error fetching courts:", error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    const loadData = async () => {
      await fetchCourts();
    };
    loadData();
  }, [fetchCourts]);

  // Derived filtered state
  const filteredCourts = courts.filter((court) => {
    const matchSearch = court.ten_san.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || court.loai_the_thao === filterType;
    return matchSearch && matchType;
  });

  const handleOpenModal = (mode: "add" | "edit", id?: string) => {
    setModalMode(mode);
    if (mode === "edit" && id) {
      const court = courts.find(c => c.ma_san === id);
      if (court) {
        setNewCourtName(court.ten_san);
        setNewCourtType(court.loai_the_thao);
        setNewCourtPrice(court.gia_thue_30p.toString());
        setNewCourtStatus(court.trang_thai_san);
        setEditingCourtId(id);
      }
    } else {
      setNewCourtName("");
      setNewCourtType("");
      setNewCourtPrice("");
      setNewCourtStatus("Đang hoạt động");
      setNewCourtImages(null);
      setEditingCourtId(null);
    }
    setIsModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    document.body.style.overflow = "";
  };

  const handleConfirmDelete = (court: Court) => {
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
    if (courtToDelete) {
      setCourts(courts.filter((c) => c.ma_san !== courtToDelete.ma_san));
    }
    handleCloseDeleteModal();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("ten_san", newCourtName);
      formData.append("loai_the_thao", newCourtType);
      formData.append("gia_thue_30p", newCourtPrice);
      formData.append("trang_thai_san", newCourtStatus);
      if (newCourtImages) {
        for (let i = 0; i < newCourtImages.length; i++) {
          formData.append("images", newCourtImages[i]);
        }
      }

      const url = modalMode === "edit" 
        ? `http://localhost:3000/owner/update-court/${editingCourtId}`
        : "http://localhost:3000/owner/add-court";
      
      const method = modalMode === "edit" ? "PUT" : "POST";

      const headers: Record<string, string> = { Authorization: `Bearer ${token}` };
      let body: BodyInit = formData;

      if (modalMode === "edit" && (!newCourtImages || newCourtImages.length === 0)) {
        headers["Content-Type"] = "application/json";
        body = JSON.stringify({
          ten_san: newCourtName,
          loai_the_thao: newCourtType,
          gia_thue_30p: newCourtPrice,
          trang_thai_san: newCourtStatus
        });
      }

      const res = await fetch(url, {
        method,
        headers,
        body
      });
      
      const data = await res.json();
      if (data.success) {
        await fetchCourts();
        handleCloseModal();
        // Reset form
        setNewCourtName("");
        setNewCourtType("");
        setNewCourtPrice("");
        setNewCourtImages(null);
        setEditingCourtId(null);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error adding court:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusToggle = async (court: Court) => {
    if (!token) return;
    const newStatus = court.trang_thai_san === "Đang hoạt động" ? "Đang bảo trì" : "Đang hoạt động";
    
    try {
      const res = await fetch(`http://localhost:3000/owner/update-court/${court.ma_san}`, {
        method: "PUT",
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          ...court,
          trang_thai_san: newStatus
        })
      });
      const data = await res.json();
      if (data.success) {
        // Update local state for immediate feedback
        setCourts(courts.map(c => 
          c.ma_san === court.ma_san ? { ...c, trang_thai_san: newStatus } : c
        ));
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error toggling status:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        .court-card-admin { transition: all 0.3s ease; }
        .court-card-admin:hover { transform: translateY(-4px); box-shadow: 0 12px 30px rgba(0,0,0,0.1); }
        .upload-zone { border: 2px dashed #d1d5db; transition: all 0.2s ease; }
        .upload-zone:hover { border-color: #ec1313; background: rgba(236, 19, 19, 0.03); }
        @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .fade-in { animation: fadeInUp 0.5s ease forwards; }
      `}</style>

      {/* Top Bar */}
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

      {/* Filters Bar */}
      <div className="px-8 pt-6 flex items-center gap-4 flex-wrap">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-4 py-2.5 flex-1 max-w-sm focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
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
          className="bg-white border border-gray-200 rounded-xl px-4 py-2.5 text-sm text-slate-600 font-medium outline-none cursor-pointer focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all"
          value={filterType}
          onChange={(e) => setFilterType(e.target.value as CourtType)}
        >
          <option value="all">Tất cả bộ môn</option>
          <option value="bong-da">⚽ Bóng đá</option>
          <option value="cau-long">🏸 Cầu lông</option>
          <option value="pickleball">🏓 Pickleball</option>
          <option value="bong-ro">🏀 Bóng rổ</option>
        </select>

      </div>

      {/* Court Cards Grid */}
      <div className="p-8">
        <div
          className={
         "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
        }
        >
          {loading ? (
             <div className="col-span-full py-20 flex justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
             </div>
          ) : filteredCourts.map((court) => (
            <div
              key={court.ma_san}
              className={`court-card-admin fade-in bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${
                court.trang_thai_san === "Đang bảo trì" ? "ring-1 ring-amber-200" : ""
              }`}
            >
              <div className={`relative w-full aspect-4/3 overflow-hidden ${court.trang_thai_san === "Đang bảo trì" ? "grayscale-[0.5]" : ""}`}>
                {/* Trạng thái - Click để toggle */}
                <button 
                  onClick={() => handleStatusToggle(court)}
                  title="Nhấn để đổi trạng thái"
                  className={`absolute top-3 left-3 z-10 text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1 transition-all active:scale-95 shadow-sm ${
                    court.trang_thai_san === "Đang hoạt động" 
                      ? "bg-green-500 hover:bg-green-600 text-white" 
                      : "bg-amber-500 hover:bg-amber-600 text-white"
                  }`}
                >
                  <span className="material-symbols-outlined text-xs">
                    {court.trang_thai_san === "Đang hoạt động" ? "check_circle" : "build"}
                  </span> 
                  {court.trang_thai_san === "Đang hoạt động" ? "Hoạt động" : "Bảo trì"}
                </button>
                <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md">
                  {SPORT_LABELS[court.loai_the_thao] || court.loai_the_thao}
                </div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${court.anhsan?.[0]?.duong_dan_anh || '/hero-stadium.png'}")` }}
                ></div>
              </div>
              <div className="p-5">
                <h3
                  className={`text-base font-bold mb-1 ${
                    court.trang_thai_san === "Đang bảo trì" ? "text-slate-400" : "text-slate-900"
                  }`}
                >
                  {court.ten_san}
                </h3>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-slate-400">Giá thuê (30p)</p>
                    <p className={`text-lg font-bold ${court.trang_thai_san === "Đang bảo trì" ? "text-slate-400" : "text-primary"}`}>
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
          ))}
          {filteredCourts.length === 0 && (
            <div className="col-span-full py-12 text-center">
              <span className="material-symbols-outlined text-slate-300 text-5xl mb-2">sports_score</span>
              <p className="text-slate-500 font-medium">Không tìm thấy sân nào.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========== ADD/EDIT MODAL ========== */}
      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4 transition-opacity"
          onClick={handleCloseModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto shadow-2xl transition-transform transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
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

            {/* Modal Body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-5">
              {/* Tên sân */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Tên sân *</label>
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
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Loại sân *</label>
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
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Giá thuê/30p (VNĐ) *</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <span className="material-symbols-outlined text-slate-400 text-xl mr-2">payments</span>
                  <input 
                    type="number" 
                    placeholder="200000" 
                    className="flex-1 bg-transparent outline-none text-sm" 
                    required 
                    value={newCourtPrice}
                    onChange={(e) => setNewCourtPrice(e.target.value)}
                  />
                  <span className="text-xs font-semibold text-slate-400 ml-2">VNĐ</span>
                </div>
              </div>

              {/* Trạng thái sân */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Trạng thái sân *</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 cursor-pointer"
                  required
                  value={newCourtStatus}
                  onChange={(e) => setNewCourtStatus(e.target.value)}
                >
                  <option value="Đang hoạt động">🟢 Đang hoạt động</option>
                  <option value="Đang bảo trì">🟠 Đang bảo trì</option>
                </select>
              </div>

              {/* Hình ảnh */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hình ảnh sân</label>
                <div
                  className="upload-zone rounded-xl p-6 text-center cursor-pointer relative"
                >
                  <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">cloud_upload</span>
                  <p className="text-sm text-slate-500 font-medium">
                    {newCourtImages ? `${newCourtImages.length} ảnh đã chọn` : "Kéo thả hoặc nhấn để tải ảnh"}
                  </p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  <input 
                    type="file" 
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                    accept="image/*" 
                    multiple
                    onChange={(e) => setNewCourtImages(e.target.files)}
                  />
                </div>
              </div>

              {/* Buttons */}
              <div className="flex items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-colors"
                >
                  Hủy bỏ
                </button>
                <button
                  type="submit"
                  className="flex-1 py-3 bg-primary hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30 flex items-center justify-center gap-2"
                >
                  <span className="material-symbols-outlined text-lg">save</span>
                  <span>{modalMode === "edit" ? "Lưu thay đổi" : "Tạo sân"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========== DELETE CONFIRM MODAL ========== */}
      {isDeleteModalOpen && courtToDelete && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4 transition-opacity"
          onClick={handleCloseDeleteModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-sm shadow-2xl p-6 text-center transition-transform transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mx-auto mb-4">
              <span className="material-symbols-outlined text-red-500 text-3xl">delete_forever</span>
            </div>
            <h3 className="text-lg font-bold text-slate-900 mb-2">Xác nhận xóa sân</h3>
            <p className="text-sm text-slate-500 mb-6">
              Bạn có chắc chắn muốn xóa <strong className="text-slate-900">{courtToDelete.ten_san}</strong>? Hành động này không thể hoàn tác.
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
