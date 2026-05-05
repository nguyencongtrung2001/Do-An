"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";

type TabType = "owners" | "locations";

interface PendingOwner {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  trang_thai: boolean;
  ngay_tao: string;
  anh_cccd_truoc: string | null;
  anh_cccd_sau: string | null;
}

interface Location {
  ma_dia_diem: string;
  ten_dia_diem: string;
  dia_chi: string;
  kinh_do: number;
  vi_do: number;
  trang_thai_duyet: boolean;
  ngay_tao: string;
  nguoidung: {
    ma_nguoi_dung: string;
    ho_ten: string;
    email: string;
    so_dien_thoai: string | null;
  };
  san: { ma_san: string }[];
}

export default function AdminApprovalsClient() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("owners");

  // Owner state
  const [pendingOwners, setPendingOwners] = useState<PendingOwner[]>([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [approvingOwnerId, setApprovingOwnerId] = useState<string | null>(null);

  // Location state
  const [locations, setLocations] = useState<Location[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [approvingLocationId, setApprovingLocationId] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<"all" | "pending" | "approved">("all");

  // ── Fetch ─────────────────────────────────────────────

  const fetchOwners = useCallback(async () => {
    if (!token) return;
    try {
      const res = await adminService.getPendingOwners(token);
      if (res.success) setPendingOwners(res.owners);
    } catch (err) {
      console.error("Error fetching pending owners:", err);
    } finally {
      setLoadingOwners(false);
    }
  }, [token]);

  const fetchLocations = useCallback(async () => {
    if (!token) return;
    try {
      const res = await adminService.getAllLocations(token);
      if (res.success) setLocations(res.locations);
    } catch (err) {
      console.error("Error fetching locations:", err);
    } finally {
      setLoadingLocations(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => { await fetchOwners(); })();
  }, [fetchOwners]);

  useEffect(() => {
    (async () => { await fetchLocations(); })();
  }, [fetchLocations]);

  // ── Actions ───────────────────────────────────────────

  const handleApproveOwner = async (id: string) => {
    if (!token || approvingOwnerId) return;
    setApprovingOwnerId(id);
    try {
      const res = await adminService.approveOwner(token, id);
      if (res.success) {
        setPendingOwners((prev) => prev.filter((o) => o.ma_nguoi_dung !== id));
      }
    } catch (err) {
      console.error("Error approving owner:", err);
    } finally {
      setApprovingOwnerId(null);
    }
  };

  const handleApproveLocation = async (id: string) => {
    if (!token || approvingLocationId) return;
    setApprovingLocationId(id);
    try {
      const res = await adminService.approveLocation(token, id);
      if (res.success) {
        setLocations((prev) =>
          prev.map((l) => (l.ma_dia_diem === id ? { ...l, trang_thai_duyet: true } : l))
        );
      }
    } catch (err) {
      console.error("Error approving location:", err);
    } finally {
      setApprovingLocationId(null);
    }
  };

  // ── Derived ───────────────────────────────────────────

  const pendingLocations = locations.filter((l) => !l.trang_thai_duyet);
  const approvedLocations = locations.filter((l) => l.trang_thai_duyet);
  const filteredLocations =
    locationFilter === "pending"
      ? pendingLocations
      : locationFilter === "approved"
      ? approvedLocations
      : locations;

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });

  const getInitials = (name: string) => {
    const p = name.split(" ");
    return (p[0]?.[0] || "") + (p[p.length - 1]?.[0] || "");
  };

  // ── Render ────────────────────────────────────────────

  return (
    <div className="flex flex-col min-h-screen pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-slate-900">Kiểm duyệt</h2>
        <p className="text-sm text-slate-400">Duyệt chủ sân và địa điểm mới</p>
      </header>

      <div className="p-8">
        {/* Tabs */}
        <div className="flex items-center gap-2 mb-8">
          <button
            onClick={() => setActiveTab("owners")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "owners"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-lg">person_check</span>
            Duyệt chủ sân
            {pendingOwners.length > 0 && (
              <span className={`ml-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activeTab === "owners" ? "bg-white text-red-600" : "bg-red-500 text-white"
              }`}>
                {pendingOwners.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setActiveTab("locations")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              activeTab === "locations"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-lg">location_on</span>
            Duyệt địa điểm
            {pendingLocations.length > 0 && (
              <span className={`ml-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                activeTab === "locations" ? "bg-white text-red-600" : "bg-red-500 text-white"
              }`}>
                {pendingLocations.length}
              </span>
            )}
          </button>
        </div>

        {/* ═══════════════ TAB: OWNERS ═══════════════ */}
        {activeTab === "owners" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{pendingOwners.length}</p>
                  <p className="text-sm text-slate-400">Chủ sân chờ duyệt</p>
                </div>
              </div>
            </div>

            {/* List */}
            {loadingOwners ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
              </div>
            ) : pendingOwners.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300">check_circle</span>
                <p className="text-lg font-bold text-slate-400 mt-2">Không có chủ sân chờ duyệt</p>
              </div>
            ) : (
              <div className="space-y-4">
                {pendingOwners.map((owner) => (
                  <div key={owner.ma_nguoi_dung} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-6">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                      {/* Avatar + Info */}
                      <div className="flex items-center gap-4 flex-1">
                        <div className="w-12 h-12 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center text-sm font-bold shrink-0">
                          {getInitials(owner.ho_ten)}
                        </div>
                        <div>
                          <h4 className="text-base font-bold text-slate-900">{owner.ho_ten}</h4>
                          <p className="text-sm text-slate-400">{owner.email} • {owner.so_dien_thoai || "—"}</p>
                          <p className="text-xs text-slate-400 mt-0.5">Đăng ký: {formatDate(owner.ngay_tao)}</p>
                        </div>
                      </div>

                      {/* CCCD info */}
                      <div className="flex items-center gap-2">
                        {owner.anh_cccd_truoc ? (
                          <span className="flex items-center gap-1 text-xs font-medium text-green-600">
                            <span className="material-symbols-outlined text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>verified</span>
                            Có CCCD
                          </span>
                        ) : (
                          <span className="flex items-center gap-1 text-xs font-medium text-amber-600">
                            <span className="material-symbols-outlined text-sm">warning</span>
                            Chưa có CCCD
                          </span>
                        )}
                      </div>

                      {/* Action */}
                      <button
                        onClick={() => handleApproveOwner(owner.ma_nguoi_dung)}
                        disabled={approvingOwnerId === owner.ma_nguoi_dung}
                        className={`px-5 py-2.5 text-sm font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-colors flex items-center gap-2 shadow-sm shrink-0 ${
                          approvingOwnerId === owner.ma_nguoi_dung ? "opacity-50 cursor-wait" : ""
                        }`}
                      >
                        {approvingOwnerId === owner.ma_nguoi_dung ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          <span className="material-symbols-outlined text-lg">check</span>
                        )}
                        Duyệt
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* ═══════════════ TAB: LOCATIONS ═══════════════ */}
        {activeTab === "locations" && (
          <div>
            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-6">
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-blue-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{locations.length}</p>
                  <p className="text-sm text-slate-400">Tổng địa điểm</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{pendingLocations.length}</p>
                  <p className="text-sm text-slate-400">Chờ duyệt</p>
                </div>
              </div>
              <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-green-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
                </div>
                <div>
                  <p className="text-2xl font-bold text-slate-900">{approvedLocations.length}</p>
                  <p className="text-sm text-slate-400">Đã duyệt</p>
                </div>
              </div>
            </div>

            {/* Filter */}
            <div className="flex items-center gap-2 mb-6">
              {(["all", "pending", "approved"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setLocationFilter(f)}
                  className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all ${
                    locationFilter === f
                      ? "bg-slate-900 text-white"
                      : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
                  }`}
                >
                  {f === "all" ? "Tất cả" : f === "pending" ? "Chờ duyệt" : "Đã duyệt"}
                </button>
              ))}
            </div>

            {/* List */}
            {loadingLocations ? (
              <div className="flex justify-center py-16">
                <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
              </div>
            ) : filteredLocations.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
                <span className="material-symbols-outlined text-5xl text-slate-300">location_off</span>
                <p className="text-lg font-bold text-slate-400 mt-2">Không có địa điểm nào</p>
              </div>
            ) : (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="text-left text-xs text-slate-400 uppercase tracking-wider bg-gray-50/50">
                      <th className="px-6 py-3 font-semibold">Địa điểm</th>
                      <th className="px-6 py-3 font-semibold">Chủ sân</th>
                      <th className="px-6 py-3 font-semibold">Số sân</th>
                      <th className="px-6 py-3 font-semibold">Ngày tạo</th>
                      <th className="px-6 py-3 font-semibold">Trạng thái</th>
                      <th className="px-6 py-3 font-semibold text-center">Thao tác</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {filteredLocations.map((loc) => (
                      <tr key={loc.ma_dia_diem} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-semibold text-slate-900">{loc.ten_dia_diem}</p>
                            <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                              <span className="material-symbols-outlined text-xs">location_on</span>
                              {loc.dia_chi}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-slate-700 font-medium">{loc.nguoidung.ho_ten}</p>
                          <p className="text-xs text-slate-400">{loc.nguoidung.so_dien_thoai || loc.nguoidung.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-slate-700 font-semibold">{loc.san.length}</span>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{formatDate(loc.ngay_tao)}</td>
                        <td className="px-6 py-4">
                          {loc.trang_thai_duyet ? (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600 inline-flex items-center gap-1">
                              <span className="material-symbols-outlined text-xs">check</span>Đã duyệt
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-600 inline-flex items-center gap-1">
                              <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />Chờ duyệt
                            </span>
                          )}
                        </td>
                        <td className="px-6 py-4 text-center">
                          {!loc.trang_thai_duyet ? (
                            <button
                              onClick={() => handleApproveLocation(loc.ma_dia_diem)}
                              disabled={approvingLocationId === loc.ma_dia_diem}
                              className={`px-4 py-2 text-xs font-bold text-white bg-green-500 hover:bg-green-600 rounded-lg transition-colors inline-flex items-center gap-1 ${
                                approvingLocationId === loc.ma_dia_diem ? "opacity-50 cursor-wait" : ""
                              }`}
                            >
                              {approvingLocationId === loc.ma_dia_diem ? (
                                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white" />
                              ) : (
                                <span className="material-symbols-outlined text-sm">check</span>
                              )}
                              Duyệt
                            </button>
                          ) : (
                            <span className="text-xs text-slate-400">—</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
