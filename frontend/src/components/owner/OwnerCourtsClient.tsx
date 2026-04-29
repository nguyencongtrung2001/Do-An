"use client";

import { useState } from "react";

type CourtType = "all" | "bong-da" | "cau-long" | "pickleball" | "bong-ro";

interface Court {
  id: number;
  name: string;
  type: CourtType;
  typeLabel: string;
  status: "active" | "maintenance";
  price: string;
  description: string;
  image: string;
}

const INITIAL_COURTS: Court[] = [
  {
    id: 1,
    name: "Sân 5A - Bóng đá mini",
    type: "bong-da",
    typeLabel: "⚽ Bóng đá",
    status: "active",
    price: "200.000đ",
    description: "Sân cỏ nhân tạo chất lượng cao, hệ thống đèn chiếu sáng hiện đại, phòng thay đồ đầy đủ tiện nghi.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL9PfB9Pi11UrXniOvyLud4ywZDr-x909HttzWQ2fhEYx9E0unG5Bn_mie_Z8PjjkkQ58SKk5FO_zVj_oNXOfr7Iqkqrf_AtMp1LsXnGuHnflE6Nxj4UEwez5wTGPT9d5uqW0jPaAli88GPdbwPorUBeNegzIpHOAt5HsQjlXG-LjIKT_WdKFOSbSrjo5u9b1ARfVLGED6evb_LDqjzNekRwWVYWofQjWjQZqYYTWBL98H5zdZyw1Ht5hrrHBVMONzg0cpcpNeYe5",
  },
  {
    id: 2,
    name: "Sân 5B - Bóng đá mini",
    type: "bong-da",
    typeLabel: "⚽ Bóng đá",
    status: "active",
    price: "250.000đ",
    description: "Sân trong nhà có mái che, không lo mưa nắng. Hệ thống quạt mát.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
  {
    id: 3,
    name: "Sân 7A - Bóng đá 7 người",
    type: "bong-da",
    typeLabel: "⚽ Bóng đá",
    status: "active",
    price: "350.000đ",
    description: "Sân bóng 7 người tiêu chuẩn, mặt cỏ nhân tạo FIFA Quality. Khu vực khán đài.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL9PfB9Pi11UrXniOvyLud4ywZDr-x909HttzWQ2fhEYx9E0unG5Bn_mie_Z8PjjkkQ58SKk5FO_zVj_oNXOfr7Iqkqrf_AtMp1LsXnGuHnflE6Nxj4UEwez5wTGPT9d5uqW0jPaAli88GPdbwPorUBeNegzIpHOAt5HsQjlXG-LjIKT_WdKFOSbSrjo5u9b1ARfVLGED6evb_LDqjzNekRwWVYWofQjWjQZqYYTWBL98H5zdZyw1Ht5hrrHBVMONzg0cpcpNeYe5",
  },
  {
    id: 4,
    name: "Sân 7B - Bóng đá 7 người",
    type: "bong-da",
    typeLabel: "⚽ Bóng đá",
    status: "maintenance",
    price: "350.000đ",
    description: "Đang bảo trì mặt cỏ nhân tạo. Dự kiến hoàn tất 25/03/2026.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
  {
    id: 5,
    name: "Sân CL-1 - Cầu lông đơn",
    type: "cau-long",
    typeLabel: "🏸 Cầu lông",
    status: "active",
    price: "120.000đ",
    description: "Sân cầu lông tiêu chuẩn quốc tế, mặt sàn gỗ chống trượt, hệ thống đèn LED.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_GkGMbk2xzEn2zN_E4CU7Fx4wj9oo9kNoaJOFbNuAXY6DwWp2OWqsdxo8TGheO8V4-jOtQqnRIEpi5nkzy3ht1rJrPMhvN65ZXogn8JyQHnZHUcRGodLdIH2wEa_dJUGYwsW5CL0sENglK0j1Bol-uyzEGqVcvUOxHQdcJztaEWHLxmWwsOrXPOMDPQuoBwx74OVO-qC3xxNPE6sd9wxUBtkCPw5Q53vZtap5WFttipdwZVn86AHZRPdzojm7v2sQ4D4Olda5034",
  },
  {
    id: 6,
    name: "Sân CL-2 - Cầu lông đôi",
    type: "cau-long",
    typeLabel: "🏸 Cầu lông",
    status: "active",
    price: "150.000đ",
    description: "Sân rộng cho cầu lông đôi, có khu vực nghỉ, nước uống miễn phí cho khách thuê.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_GkGMbk2xzEn2zN_E4CU7Fx4wj9oo9kNoaJOFbNuAXY6DwWp2OWqsdxo8TGheO8V4-jOtQqnRIEpi5nkzy3ht1rJrPMhvN65ZXogn8JyQHnZHUcRGodLdIH2wEa_dJUGYwsW5CL0sENglK0j1Bol-uyzEGqVcvUOxHQdcJztaEWHLxmWwsOrXPOMDPQuoBwx74OVO-qC3xxNPE6sd9wxUBtkCPw5Q53vZtap5WFttipdwZVn86AHZRPdzojm7v2sQ4D4Olda5034",
  },
  {
    id: 7,
    name: "Sân PB-1 - Pickleball",
    type: "pickleball",
    typeLabel: "🏓 Pickleball",
    status: "active",
    price: "180.000đ",
    description: "Sân Pickleball tiêu chuẩn USAP, mặt sàn acrylic, có cho thuê vợt và bóng.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2-Nze4k50n2JaJ28iF53FDnQuURHgPKpdgFnRK1xYs_RuB08ktx3ACFbneI_Ok1QmannDbJkYEwII8zOIeKD7sTxdpVjHeqhL0mh3E6joNaIj7Cn1V3VpxQNoyDbx0hpZGY4cH2u96LD7CeXUbf2YgAh0gjLe0LTN38FXk29x4z0n0byJjTjH6pIrYaChNhvI2qZQ2pJC1z3jK1qwBV5UWXDHc9u3iLAYoap06Ujw-hjrvMQkiw-6CWXvYp1-U2bGe1RUh8YNyWFG",
  },
  {
    id: 8,
    name: "Sân BR-1 - Bóng rổ",
    type: "bong-ro",
    typeLabel: "🏀 Bóng rổ",
    status: "active",
    price: "300.000đ",
    description: "Sân bóng rổ full-court, sàn gỗ chuyên dụng, rổ tiêu chuẩn NBA.",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
];

export default function OwnerCourtsClient() {
  const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState<CourtType>("all");

  // Modals state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalMode, setModalMode] = useState<"add" | "edit">("add");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [courtToDelete, setCourtToDelete] = useState<Court | null>(null);

  // Derived filtered state
  const filteredCourts = courts.filter((court) => {
    const matchSearch = court.name.toLowerCase().includes(search.toLowerCase());
    const matchType = filterType === "all" || court.type === filterType;
    return matchSearch && matchType;
  });

  const handleOpenModal = (mode: "add" | "edit", id?: number) => {
    setModalMode(mode);
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
      setCourts(courts.filter((c) => c.id !== courtToDelete.id));
    }
    handleCloseDeleteModal();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleCloseModal();
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
          {filteredCourts.map((court) => (
            <div
              key={court.id}
              className={`court-card-admin fade-in bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm ${
                court.status === "maintenance" ? "opacity-70" : ""
              }`}
            >
              <div className={`relative w-full aspect-4/3 overflow-hidden ${court.status === "maintenance" ? "grayscale" : ""}`}>
                {court.status === "active" ? (
                  <div className="absolute top-3 left-3 z-10 bg-green-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">check_circle</span> Hoạt động
                  </div>
                ) : (
                  <div className="absolute top-3 left-3 z-10 bg-gray-500 text-white text-[10px] font-bold px-2 py-1 rounded-md flex items-center gap-1">
                    <span className="material-symbols-outlined text-xs">build</span> Bảo trì
                  </div>
                )}
                <div className="absolute top-3 right-3 z-10 bg-white/90 backdrop-blur-sm text-slate-900 text-xs font-bold px-2 py-1 rounded-md">
                  {court.typeLabel}
                </div>
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url("${court.image}")` }}
                ></div>
              </div>
              <div className="p-5">
                {court.status === "maintenance" && (
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-amber-100 text-amber-700 text-[10px] font-bold rounded-md">
                      MAINTENANCE MODE
                    </span>
                  </div>
                )}
                <h3
                  className={`text-base font-bold mb-1 ${
                    court.status === "maintenance" ? "text-slate-400" : "text-slate-900"
                  }`}
                >
                  {court.name}
                </h3>
                <p className={`text-sm mb-3 line-clamp-2 ${court.status === "maintenance" ? "text-slate-400" : "text-slate-500"}`}>
                  {court.description}
                </p>
                <div className="flex items-center justify-between py-3 border-t border-gray-100">
                  <div>
                    <p className="text-xs text-slate-400">Giá thuê/giờ</p>
                    <p className={`text-lg font-bold ${court.status === "maintenance" ? "text-slate-400" : "text-primary"}`}>
                      {court.price}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenModal("edit", court.id)}
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
                />
              </div>

              {/* Loại sân */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Loại sân *</label>
                <select
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 cursor-pointer"
                  required
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
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Giá thuê/giờ (VNĐ) *</label>
                <div className="flex items-center border border-gray-200 rounded-xl px-4 py-3 bg-gray-50/50 focus-within:border-primary focus-within:ring-2 focus-within:ring-primary/10 transition-all">
                  <span className="material-symbols-outlined text-slate-400 text-xl mr-2">payments</span>
                  <input type="number" placeholder="200000" className="flex-1 bg-transparent outline-none text-sm" required />
                  <span className="text-xs font-semibold text-slate-400 ml-2">VNĐ</span>
                </div>
              </div>

              {/* Hình ảnh */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Hình ảnh sân</label>
                <div
                  className="upload-zone rounded-xl p-6 text-center cursor-pointer relative"
                >
                  <span className="material-symbols-outlined text-slate-300 text-4xl mb-2">cloud_upload</span>
                  <p className="text-sm text-slate-500 font-medium">Kéo thả hoặc nhấn để tải ảnh</p>
                  <p className="text-xs text-slate-400 mt-1">PNG, JPG up to 5MB</p>
                  <input type="file" className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" accept="image/*" />
                </div>
              </div>

              {/* Mô tả */}
              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Mô tả ngắn</label>
                <textarea
                  placeholder="Mô tả tiện ích và đặc điểm của sân..."
                  rows={3}
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50 resize-none"
                ></textarea>
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
              Bạn có chắc chắn muốn xóa <strong className="text-slate-900">{courtToDelete.name}</strong>? Hành động này không thể hoàn tác.
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
