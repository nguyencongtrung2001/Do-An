"use client";

import { useState } from "react";

type CourtStatus = "active" | "maintenance" | "locked";

interface Court {
  id: string;
  name: string;
  typeLabel: string;
  priceInfo: string;
  status: CourtStatus;
  statusText: string;
  image: string;
}

const INITIAL_COURTS: Court[] = [
  {
    id: "court-1",
    name: "Sân 5A - Bóng đá mini",
    typeLabel: "⚽ Bóng đá",
    priceInfo: "200.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL9PfB9Pi11UrXniOvyLud4ywZDr-x909HttzWQ2fhEYx9E0unG5Bn_mie_Z8PjjkkQ58SKk5FO_zVj_oNXOfr7Iqkqrf_AtMp1LsXnGuHnflE6Nxj4UEwez5wTGPT9d5uqW0jPaAli88GPdbwPorUBeNegzIpHOAt5HsQjlXG-LjIKT_WdKFOSbSrjo5u9b1ARfVLGED6evb_LDqjzNekRwWVYWofQjWjQZqYYTWBL98H5zdZyw1Ht5hrrHBVMONzg0cpcpNeYe5",
  },
  {
    id: "court-2",
    name: "Sân 5B - Bóng đá mini",
    typeLabel: "⚽ Bóng đá",
    priceInfo: "250.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
  {
    id: "court-3",
    name: "Sân 7A - Bóng đá 7 người",
    typeLabel: "⚽ Bóng đá",
    priceInfo: "350.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAlL9PfB9Pi11UrXniOvyLud4ywZDr-x909HttzWQ2fhEYx9E0unG5Bn_mie_Z8PjjkkQ58SKk5FO_zVj_oNXOfr7Iqkqrf_AtMp1LsXnGuHnflE6Nxj4UEwez5wTGPT9d5uqW0jPaAli88GPdbwPorUBeNegzIpHOAt5HsQjlXG-LjIKT_WdKFOSbSrjo5u9b1ARfVLGED6evb_LDqjzNekRwWVYWofQjWjQZqYYTWBL98H5zdZyw1Ht5hrrHBVMONzg0cpcpNeYe5",
  },
  {
    id: "court-4",
    name: "Sân 7B - Bóng đá 7 người",
    typeLabel: "⚽ Bóng đá",
    priceInfo: "350.000đ/giờ",
    status: "maintenance",
    statusText: "Bảo trì đến 25/03/2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
  {
    id: "court-5",
    name: "Sân CL-1 - Cầu lông đơn",
    typeLabel: "🏸 Cầu lông",
    priceInfo: "120.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_GkGMbk2xzEn2zN_E4CU7Fx4wj9oo9kNoaJOFbNuAXY6DwWp2OWqsdxo8TGheO8V4-jOtQqnRIEpi5nkzy3ht1rJrPMhvN65ZXogn8JyQHnZHUcRGodLdIH2wEa_dJUGYwsW5CL0sENglK0j1Bol-uyzEGqVcvUOxHQdcJztaEWHLxmWwsOrXPOMDPQuoBwx74OVO-qC3xxNPE6sd9wxUBtkCPw5Q53vZtap5WFttipdwZVn86AHZRPdzojm7v2sQ4D4Olda5034",
  },
  {
    id: "court-6",
    name: "Sân CL-2 - Cầu lông đôi",
    typeLabel: "🏸 Cầu lông",
    priceInfo: "150.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuAe_GkGMbk2xzEn2zN_E4CU7Fx4wj9oo9kNoaJOFbNuAXY6DwWp2OWqsdxo8TGheO8V4-jOtQqnRIEpi5nkzy3ht1rJrPMhvN65ZXogn8JyQHnZHUcRGodLdIH2wEa_dJUGYwsW5CL0sENglK0j1Bol-uyzEGqVcvUOxHQdcJztaEWHLxmWwsOrXPOMDPQuoBwx74OVO-qC3xxNPE6sd9wxUBtkCPw5Q53vZtap5WFttipdwZVn86AHZRPdzojm7v2sQ4D4Olda5034",
  },
  {
    id: "court-7",
    name: "Sân PB-1 - Pickleball",
    typeLabel: "🏓 Pickleball",
    priceInfo: "180.000đ/giờ",
    status: "locked",
    statusText: "Khóa đến 01/04/2026",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2-Nze4k50n2JaJ28iF53FDnQuURHgPKpdgFnRK1xYs_RuB08ktx3ACFbneI_Ok1QmannDbJkYEwII8zOIeKD7sTxdpVjHeqhL0mh3E6joNaIj7Cn1V3VpxQNoyDbx0hpZGY4cH2u96LD7CeXUbf2YgAh0gjLe0LTN38FXk29x4z0n0byJjTjH6pIrYaChNhvI2qZQ2pJC1z3jK1qwBV5UWXDHc9u3iLAYoap06Ujw-hjrvMQkiw-6CWXvYp1-U2bGe1RUh8YNyWFG",
  },
  {
    id: "court-8",
    name: "Sân BR-1 - Bóng rổ",
    typeLabel: "🏀 Bóng rổ",
    priceInfo: "300.000đ/giờ",
    status: "active",
    statusText: "",
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuB2vw68yFpBosLEXPzVabwaXELepx7gxuW6y2bzFjJSGxWbXM1FcCryI8mlbnaj0J5wHy73EBE52IPXuet4K9EE5YZCmUq_6OAw94n-q_YnIKpX7_bZdUdcs7Uk-YxKp2OIu8bhemZltVcAGRqja9-iRF4XDWa-xMrUJSyg7oPm5llFZXhlz9E6tN2v1zTXki7jU8lBebvkxSMWAdpcheX00G_fNyLqqde5hD4ZdPOpGDOwp-squI4eiyaiCuBtKR_5mrUcF5pFLE_9",
  },
];

export default function OwnerStatusClient() {
  const [courts, setCourts] = useState<Court[]>(INITIAL_COURTS);
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [isSelectModalOpen, setIsSelectModalOpen] = useState(false);
  const [selectedCourtsToLock, setSelectedCourtsToLock] = useState<Set<string>>(new Set());

  // Derived counts
  const activeCount = courts.filter((c) => c.status === "active").length;
  const maintenanceCount = courts.filter((c) => c.status === "maintenance").length;
  const lockedCount = courts.filter((c) => c.status === "locked").length;

  const toggleStatus = (courtId: string) => {
    setCourts((prevCourts) =>
      prevCourts.map((court) => {
        if (court.id === courtId) {
          if (court.status === "active") {
            return {
              ...court,
              status: "maintenance",
              statusText: "Bảo trì định kỳ",
            };
          } else {
            return {
              ...court,
              status: "active",
              statusText: "",
            };
          }
        }
        return court;
      })
    );
  };

  const handleLockAll = () => {
    if (!dateFrom || !dateTo) {
      alert("Vui lòng chọn khoảng ngày trước khi khóa sân!");
      return;
    }
    alert(`Đã khóa tất cả sân từ ${dateFrom} đến ${dateTo}`);
    // In a real app, this would update state/backend.
  };

  const handleOpenSelectModal = () => {
    if (!dateFrom || !dateTo) {
      alert("Vui lòng chọn khoảng ngày trước khi chọn sân!");
      return;
    }
    setIsSelectModalOpen(true);
    document.body.style.overflow = "hidden";
  };

  const handleCloseSelectModal = () => {
    setIsSelectModalOpen(false);
    setSelectedCourtsToLock(new Set());
    document.body.style.overflow = "";
  };

  const handleToggleCourtSelection = (courtId: string) => {
    const newSelection = new Set(selectedCourtsToLock);
    if (newSelection.has(courtId)) {
      newSelection.delete(courtId);
    } else {
      newSelection.add(courtId);
    }
    setSelectedCourtsToLock(newSelection);
  };

  const handleConfirmLockSelected = () => {
    if (selectedCourtsToLock.size === 0) {
      alert("Vui lòng chọn ít nhất 1 sân để khóa.");
      return;
    }
    alert(`Đã khóa ${selectedCourtsToLock.size} sân đã chọn!`);
    handleCloseSelectModal();
  };

  return (
    <div className="flex flex-col min-h-screen">
      <style>{`
        .toggle-switch {
            width: 52px; height: 28px;
            background: #d1d5db;
            border-radius: 14px;
            position: relative;
            cursor: pointer;
            transition: background 0.3s ease;
        }
        .toggle-switch.active { background: #22c55e; }
        .toggle-switch::after {
            content: '';
            position: absolute;
            top: 3px; left: 3px;
            width: 22px; height: 22px;
            background: white;
            border-radius: 50%;
            transition: transform 0.3s ease;
            box-shadow: 0 2px 4px rgba(0,0,0,0.15);
        }
        .toggle-switch.active::after { transform: translateX(24px); }

        .court-status-card { transition: all 0.3s ease; }
        .court-status-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
        .court-status-card.maintenance, .court-status-card.locked {
            background: #f9fafb;
            border-color: #e5e7eb;
        }
        .court-status-card.maintenance .court-image, .court-status-card.locked .court-image { 
            filter: grayscale(100%); opacity: 0.6; 
        }

        .holiday-card { transition: all 0.3s ease; }
        .holiday-card:hover { box-shadow: 0 8px 24px rgba(0,0,0,0.06); }
      `}</style>

      {/* Top Bar */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-bold text-slate-900">Trạng thái sân</h2>
          <p className="text-sm text-slate-400">Thiết lập trạng thái hoạt động và lịch bảo trì sân</p>
        </div>
      </header>

      <div className="p-8 space-y-8">
        {/* Status Summary */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                check_circle
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{activeCount}</p>
              <p className="text-sm text-slate-400">Đang hoạt động</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                build
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{maintenanceCount}</p>
              <p className="text-sm text-slate-400">Đang bảo trì</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-red-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                block
              </span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{lockedCount}</p>
              <p className="text-sm text-slate-400">Đã khóa</p>
            </div>
          </div>
        </div>

        {/* Court Status List */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Danh sách sân</h3>
            <div className="flex items-center gap-3 text-xs">
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span> Hoạt động
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span> Bảo trì
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-500"></span> Khóa
              </span>
            </div>
          </div>

          <div className="divide-y divide-gray-50">
            {courts.map((court) => {
              const isMaintenance = court.status === "maintenance";
              const isLocked = court.status === "locked";
              const isActive = court.status === "active";

              let badgeProps = {
                className: "status-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-green-50 text-green-600",
                text: "Hoạt động",
              };
              let statusTextProps = {
                className: "text-xs font-semibold text-green-600 status-text",
                text: "Đang hoạt động",
              };

              if (isMaintenance) {
                badgeProps = {
                  className: "status-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700",
                  text: "Maintenance Mode",
                };
                statusTextProps = {
                  className: "text-xs font-semibold text-amber-600 status-text",
                  text: "Đang bảo trì",
                };
              } else if (isLocked) {
                badgeProps = {
                  className: "status-badge px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-50 text-red-600",
                  text: "Đã khóa",
                };
                statusTextProps = {
                  className: "text-xs font-semibold text-red-600 status-text",
                  text: "Đã khóa",
                };
              }

              return (
                <div
                  key={court.id}
                  className={`court-status-card flex items-center gap-5 px-6 py-4 hover:bg-gray-50/50 transition-colors ${
                    !isActive ? "maintenance" : ""
                  }`}
                >
                  <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0">
                    <div
                      className="court-image w-full h-full bg-cover bg-center"
                      style={{ backgroundImage: `url("${court.image}")` }}
                    ></div>
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-sm font-bold ${isActive ? "text-slate-900" : "text-slate-400"}`}>{court.name}</h4>
                      <span className={badgeProps.className}>{badgeProps.text}</span>
                    </div>
                    <p className="text-xs text-slate-400">
                      {court.typeLabel} • {court.priceInfo}
                      {court.statusText && ` • ${court.statusText}`}
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">Trạng thái</p>
                      <p className={statusTextProps.className}>{statusTextProps.text}</p>
                    </div>
                    <div
                      className={`toggle-switch ${isActive ? "active" : ""}`}
                      onClick={() => toggleStatus(court.id)}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Holiday / Lock Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Date Range Picker */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  event_busy
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Lịch nghỉ lễ / Đột xuất</h3>
                <p className="text-xs text-slate-400">Chọn khoảng ngày để khóa sân</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Từ ngày</label>
                  <input
                    type="date"
                    value={dateFrom}
                    onChange={(e) => setDateFrom(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Đến ngày</label>
                  <input
                    type="date"
                    value={dateTo}
                    onChange={(e) => setDateTo(e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Lý do</label>
                <input
                  type="text"
                  placeholder="VD: Nghỉ lễ 30/4 - 1/5, Bảo trì định kỳ..."
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/10 transition-all bg-gray-50/50"
                />
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button
                  onClick={handleLockAll}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-red-500/20"
                >
                  <span className="material-symbols-outlined text-lg">lock</span>
                  Khóa tất cả sân
                </button>
                <button
                  onClick={handleOpenSelectModal}
                  className="flex-1 flex items-center justify-center gap-2 py-3 bg-amber-500 hover:bg-amber-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-amber-500/20"
                >
                  <span className="material-symbols-outlined text-lg">checklist</span>
                  Chọn sân để khóa
                </button>
              </div>
            </div>
          </div>

          {/* Existing Holidays */}
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center gap-3 mb-5">
              <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-purple-500 text-xl" style={{ fontVariationSettings: "'FILL' 1" }}>
                  calendar_month
                </span>
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900">Lịch khóa sắp tới</h3>
                <p className="text-xs text-slate-400">Các đợt khóa sân đã lên lịch</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="holiday-card flex items-center gap-4 p-4 bg-red-50/50 border border-red-100 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-red-100 flex flex-col items-center justify-center shrink-0">
                  <p className="text-xs font-bold text-red-600">30</p>
                  <p className="text-[9px] text-red-500 font-semibold">Th04</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Nghỉ lễ 30/4 - 1/5</p>
                  <p className="text-xs text-slate-400">30/04/2026 → 01/05/2026 • Tất cả sân</p>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-red-50 flex items-center justify-center transition-colors border border-red-100 cursor-pointer">
                  <span className="material-symbols-outlined text-red-400 text-lg">close</span>
                </button>
              </div>

              <div className="holiday-card flex items-center gap-4 p-4 bg-amber-50/50 border border-amber-100 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-amber-100 flex flex-col items-center justify-center shrink-0">
                  <p className="text-xs font-bold text-amber-600">15</p>
                  <p className="text-[9px] text-amber-500 font-semibold">Th04</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Bảo trì mặt cỏ</p>
                  <p className="text-xs text-slate-400">15/04/2026 → 17/04/2026 • Sân 5A, Sân 5B</p>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-amber-50 flex items-center justify-center transition-colors border border-amber-100 cursor-pointer">
                  <span className="material-symbols-outlined text-amber-400 text-lg">close</span>
                </button>
              </div>

              <div className="holiday-card flex items-center gap-4 p-4 bg-blue-50/50 border border-blue-100 rounded-xl">
                <div className="w-12 h-12 rounded-xl bg-blue-100 flex flex-col items-center justify-center shrink-0">
                  <p className="text-xs font-bold text-blue-600">02</p>
                  <p className="text-[9px] text-blue-500 font-semibold">Th09</p>
                </div>
                <div className="flex-1">
                  <p className="text-sm font-bold text-slate-900">Quốc khánh 2/9</p>
                  <p className="text-xs text-slate-400">02/09/2026 → 03/09/2026 • Tất cả sân</p>
                </div>
                <button className="w-8 h-8 rounded-lg bg-white hover:bg-blue-50 flex items-center justify-center transition-colors border border-blue-100 cursor-pointer">
                  <span className="material-symbols-outlined text-blue-400 text-lg">close</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Select Courts Modal */}
      {isSelectModalOpen && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-100 flex items-center justify-center p-4 transition-opacity"
          onClick={handleCloseSelectModal}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-md shadow-2xl transition-transform transform scale-100"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100">
              <h3 className="text-lg font-bold text-slate-900">Chọn sân để khóa</h3>
              <button
                onClick={handleCloseSelectModal}
                className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
              >
                <span className="material-symbols-outlined text-slate-500 text-xl">close</span>
              </button>
            </div>
            <div className="p-6 space-y-3 max-h-[50vh] overflow-y-auto">
              {courts.map((court) => (
                <label
                  key={court.id}
                  className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 cursor-pointer transition-colors"
                >
                  <input
                    type="checkbox"
                    checked={selectedCourtsToLock.has(court.id)}
                    onChange={() => handleToggleCourtSelection(court.id)}
                    className="w-4 h-4 rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span className="text-sm font-medium text-slate-700">{court.name}</span>
                </label>
              ))}
            </div>
            <div className="p-6 border-t border-gray-100 flex items-center gap-3">
              <button
                onClick={handleCloseSelectModal}
                className="flex-1 py-3 border border-gray-200 rounded-xl text-sm font-semibold text-slate-600 hover:bg-gray-50 transition-colors"
              >
                Hủy
              </button>
              <button
                onClick={handleConfirmLockSelected}
                className="flex-1 py-3 bg-primary hover:bg-red-600 text-white rounded-xl text-sm font-bold transition-all shadow-lg shadow-primary/30"
              >
                Khóa các sân đã chọn
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
