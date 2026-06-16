"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";
import { toast } from "react-hot-toast";

interface PendingOwner {
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
    trang_thai: boolean;
  };
  san: { ma_san: string }[];
}

interface OwnerBasicInfo {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  trang_thai: boolean;
}

export default function AdminApprovalsClient() {
  const { token } = useAuth();
  
  // Data states
  const [pendingOwners, setPendingOwners] = useState<PendingOwner[]>([]);
  const [locations, setLocations] = useState<Location[]>([]);
  const [loading, setLoading] = useState(true);
  
  // UI states
  const [filter, setFilter] = useState<"pending" | "approved">("pending");
  const [approvingId, setApprovingId] = useState<string | null>(null);

  // Reject Modal State
  const [rejectingReq, setRejectingReq] = useState<{ ownerId: string, locationIds: string[] } | null>(null);
  const [rejectReason, setRejectReason] = useState("");
  const [rejecting, setRejecting] = useState(false);

  // ── Fetch ─────────────────────────────────────────────
  useEffect(() => {
    let isMounted = true;
    const fetchApprovalData = async () => {
      if (!token) return;
      try {
        const [ownersRes, locsRes] = await Promise.all([
          adminService.getPendingOwners(token),
          adminService.getAllLocations(token)
        ]);
        
        if (!isMounted) return;
        if (ownersRes.success) setPendingOwners(ownersRes.owners);
        if (locsRes.success) setLocations(locsRes.locations);
      } catch (err) {
        console.error("Error fetching approval data:", err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchApprovalData();

    return () => {
      isMounted = false;
    };
  }, [token]);

  // ── Unified Data Models ───────────────────────────────
  
  const pendingRequests = useMemo(() => {
    const map = new Map<string, { ownerFull: PendingOwner | null, ownerBasic: OwnerBasicInfo, locations: Location[] }>();
    
    // Add pending owners
    pendingOwners.forEach(o => {
      map.set(o.ma_nguoi_dung, { ownerFull: o, ownerBasic: o, locations: [] });
    });

    // Add pending locations
    locations.filter(l => !l.trang_thai_duyet).forEach(l => {
      const ownerId = l.nguoidung.ma_nguoi_dung;
      if (map.has(ownerId)) {
        map.get(ownerId)!.locations.push(l);
      } else {
        map.set(ownerId, { ownerFull: null, ownerBasic: l.nguoidung, locations: [l] });
      }
    });

    return Array.from(map.values());
  }, [pendingOwners, locations]);

  const approvedRequests = useMemo(() => {
    const map = new Map<string, { ownerBasic: OwnerBasicInfo, locations: Location[] }>();
    locations.filter(l => l.trang_thai_duyet).forEach(l => {
      const ownerId = l.nguoidung.ma_nguoi_dung;
      if (!map.has(ownerId)) {
        map.set(ownerId, { ownerBasic: l.nguoidung, locations: [] });
      }
      map.get(ownerId)!.locations.push(l);
    });
    return Array.from(map.values());
  }, [locations]);

  // ── Actions ───────────────────────────────────────────

  const handleApproveRequest = async (ownerId: string, locationIds: string[]) => {
    if (!token || approvingId) return;
    setApprovingId(ownerId);
    try {
      const promises = [];
      const isOwnerPending = pendingOwners.some(o => o.ma_nguoi_dung === ownerId);
      
      if (isOwnerPending) {
        promises.push(adminService.approveOwner(token, ownerId));
      }
      
      locationIds.forEach(locId => {
        promises.push(adminService.approveLocation(token, locId));
      });

      await Promise.all(promises);
      
      // Update local state
      if (isOwnerPending) {
        setPendingOwners(prev => prev.filter(o => o.ma_nguoi_dung !== ownerId));
      }
      if (locationIds.length > 0) {
        setLocations(prev => prev.map(l => locationIds.includes(l.ma_dia_diem) ? { ...l, trang_thai_duyet: true } : l));
      }
    } catch (err) {
      console.error("Error approving request:", err);
    } finally {
      setApprovingId(null);
    }
  };

  const handleRejectSubmit = async () => {
    if (!token || !rejectingReq) return;
    setRejecting(true);
    try {
      const promises = rejectingReq.locationIds.map(locId => 
        adminService.rejectLocation(token, locId, rejectReason)
      );
      await Promise.all(promises);

      // Remove from pending lists
      setPendingOwners(prev => prev.filter(o => o.ma_nguoi_dung !== rejectingReq.ownerId));
      setLocations(prev => prev.filter(l => !rejectingReq.locationIds.includes(l.ma_dia_diem)));
      
      toast.success("Đã từ chối yêu cầu đăng ký");
      setRejectingReq(null);
      setRejectReason("");
    } catch (err) {
      console.error("Lỗi từ chối:", err);
      toast.error("Có lỗi xảy ra khi từ chối");
    } finally {
      setRejecting(false);
    }
  };

  // ── Utils ─────────────────────────────────────────────

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
        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-amber-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>hourglass_top</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{pendingRequests.length}</p>
              <p className="text-sm text-slate-400">Yêu cầu đăng ký mới</p>
            </div>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-green-50 flex items-center justify-center">
              <span className="material-symbols-outlined text-green-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
            </div>
            <div>
              <p className="text-2xl font-bold text-slate-900">{approvedRequests.length}</p>
              <p className="text-sm text-slate-400">Đã duyệt thành công</p>
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-2 mb-6">
          <button
            onClick={() => setFilter("pending")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              filter === "pending"
                ? "bg-red-600 text-white shadow-lg shadow-red-600/20"
                : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-lg">pending_actions</span>
            Chờ duyệt
            {pendingRequests.length > 0 && (
              <span className={`ml-1 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center ${
                filter === "pending" ? "bg-white text-red-600" : "bg-red-500 text-white"
              }`}>
                {pendingRequests.length}
              </span>
            )}
          </button>
          <button
            onClick={() => setFilter("approved")}
            className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all flex items-center gap-2 ${
              filter === "approved"
                ? "bg-slate-900 text-white shadow-lg shadow-slate-900/20"
                : "bg-white text-slate-600 border border-gray-200 hover:bg-gray-50"
            }`}
          >
            <span className="material-symbols-outlined text-lg">verified</span>
            Lịch sử đã duyệt
          </button>
        </div>

        {/* Content */}
        {loading ? (
          <div className="flex justify-center py-16">
            <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
          </div>
        ) : filter === "pending" ? (
          /* ═══════════════ PENDING LIST ═══════════════ */
          pendingRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">check_circle</span>
              <p className="text-lg font-bold text-slate-400 mt-2">Tuyệt vời! Không có yêu cầu nào đang chờ xử lý.</p>
            </div>
          ) : (
            <div className="space-y-6">
              {pendingRequests.map((req) => (
                <div key={req.ownerBasic.ma_nguoi_dung} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden flex flex-col md:flex-row">
                  
                  {/* Left: Owner Profile */}
                  <div className="p-6 md:w-1/2 border-b md:border-b-0 md:border-r border-gray-100 bg-slate-50/50">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-14 h-14 rounded-2xl bg-white border border-gray-200 shadow-sm overflow-hidden shrink-0">
                        {req.ownerFull?.anh_dai_dien ? (
                          <Image src={req.ownerFull.anh_dai_dien} alt={req.ownerBasic.ho_ten} width={56} height={56} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full text-slate-400 flex items-center justify-center text-sm font-bold">
                            {getInitials(req.ownerBasic.ho_ten)}
                          </div>
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-base font-bold text-slate-900">{req.ownerBasic.ho_ten}</h4>
                          {req.ownerFull ? (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-wider">Chủ sân mới</span>
                          ) : (
                            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-green-100 text-green-700 uppercase tracking-wider">Đã duyệt</span>
                          )}
                        </div>
                        <p className="text-sm text-slate-500 mt-1 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">mail</span>{req.ownerBasic.email}</p>
                        <p className="text-sm text-slate-500 mt-0.5 flex items-center gap-1.5"><span className="material-symbols-outlined text-sm">call</span>{req.ownerBasic.so_dien_thoai || "—"}</p>
                      </div>
                    </div>

                    {req.ownerFull && (req.ownerFull.anh_cccd_truoc || req.ownerFull.anh_cccd_sau) && (
                      <div className="mt-4">
                        <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Ảnh căn cước công dân</p>
                        <div className="flex gap-3">
                          {req.ownerFull.anh_cccd_truoc && (
                            <a href={req.ownerFull.anh_cccd_truoc} target="_blank" rel="noreferrer" className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors block">
                              <Image src={req.ownerFull.anh_cccd_truoc} alt="CCCD mặt trước" fill sizes="96px" className="object-cover" />
                              <div className="absolute bottom-0 w-full bg-black/50 text-white text-[9px] text-center py-0.5">Mặt trước</div>
                            </a>
                          )}
                          {req.ownerFull.anh_cccd_sau && (
                            <a href={req.ownerFull.anh_cccd_sau} target="_blank" rel="noreferrer" className="relative w-24 h-16 rounded-lg overflow-hidden border border-gray-200 hover:border-primary transition-colors block">
                              <Image src={req.ownerFull.anh_cccd_sau} alt="CCCD mặt sau" fill sizes="96px" className="object-cover" />
                              <div className="absolute bottom-0 w-full bg-black/50 text-white text-[9px] text-center py-0.5">Mặt sau</div>
                            </a>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Right: Locations & Actions */}
                  <div className="p-6 md:w-1/2 flex flex-col justify-between">
                    <div>
                      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Địa điểm đăng ký ({req.locations.length})</p>
                      {req.locations.length > 0 ? (
                        <div className="space-y-3 mb-6">
                          {req.locations.map(loc => (
                            <div key={loc.ma_dia_diem} className="bg-slate-50 p-3 rounded-xl border border-gray-100 flex gap-3">
                              <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center shrink-0">
                                <span className="material-symbols-outlined text-xl">location_on</span>
                              </div>
                              <div>
                                <h5 className="text-sm font-bold text-slate-900">{loc.ten_dia_diem}</h5>
                                <p className="text-xs text-slate-500 mt-0.5 leading-relaxed">{loc.dia_chi}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : (
                        <p className="text-sm text-slate-400 mb-6 italic">Không có địa điểm nào đang chờ duyệt.</p>
                      )}
                    </div>

                    {/* Action Button */}
                    <div className="flex justify-end pt-4 border-t border-gray-100 mt-auto gap-3">
                      <button
                        onClick={() => {
                          setRejectingReq({ ownerId: req.ownerBasic.ma_nguoi_dung, locationIds: req.locations.map(l => l.ma_dia_diem) });
                          setRejectReason("");
                        }}
                        disabled={approvingId === req.ownerBasic.ma_nguoi_dung}
                        className="px-6 py-2.5 text-sm font-bold text-red-500 bg-red-50 hover:bg-red-100 rounded-xl transition-all flex items-center gap-2"
                      >
                        <span className="material-symbols-outlined text-lg">cancel</span>
                        Từ chối
                      </button>
                      <button
                        onClick={() => handleApproveRequest(req.ownerBasic.ma_nguoi_dung, req.locations.map(l => l.ma_dia_diem))}
                        disabled={approvingId === req.ownerBasic.ma_nguoi_dung}
                        className={`px-6 py-2.5 text-sm font-bold text-white bg-green-500 hover:bg-green-600 rounded-xl transition-all shadow-md shadow-green-500/20 flex items-center gap-2 ${
                          approvingId === req.ownerBasic.ma_nguoi_dung ? "opacity-50 cursor-wait" : ""
                        }`}
                      >
                        {approvingId === req.ownerBasic.ma_nguoi_dung ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white" />
                        ) : (
                          <span className="material-symbols-outlined text-lg">fact_check</span>
                        )}
                        Duyệt toàn bộ yêu cầu
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* ═══════════════ APPROVED LIST ═══════════════ */
          approvedRequests.length === 0 ? (
            <div className="bg-white rounded-2xl p-12 border border-gray-100 shadow-sm text-center">
              <span className="material-symbols-outlined text-5xl text-slate-300">history</span>
              <p className="text-lg font-bold text-slate-400 mt-2">Chưa có lịch sử duyệt nào.</p>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider bg-gray-50/50">
                    <th className="px-6 py-3 font-semibold">Chủ sân</th>
                    <th className="px-6 py-3 font-semibold">Địa điểm đã duyệt</th>
                    <th className="px-6 py-3 font-semibold text-center">Tùy chọn</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {approvedRequests.map((req) => (
                    <tr key={req.ownerBasic.ma_nguoi_dung} className="hover:bg-gray-50/50 transition-colors">
                      <td className="px-6 py-4 align-top">
                        <p className="font-bold text-slate-900">{req.ownerBasic.ho_ten}</p>
                        <p className="text-xs text-slate-400 mt-0.5">{req.ownerBasic.email}</p>
                      </td>
                      <td className="px-6 py-4">
                        <div className="space-y-2">
                          {req.locations.map(loc => (
                            <div key={loc.ma_dia_diem} className="text-sm">
                              <span className="font-semibold text-slate-700">{loc.ten_dia_diem}</span>
                              <p className="text-xs text-slate-400">{loc.dia_chi}</p>
                            </div>
                          ))}
                        </div>
                      </td>
                      <td className="px-6 py-4 text-center align-top">
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-green-50 text-green-600 inline-flex items-center gap-1 border border-green-200">
                          <span className="material-symbols-outlined text-[12px]">verified</span> Hoàn tất
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )
        )}
      </div>

      {/* Reject Modal */}
      {rejectingReq && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl overflow-hidden fade-in">
            <div className="p-6 border-b border-gray-100">
              <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                <span className="material-symbols-outlined text-red-500">cancel</span>
                Từ chối yêu cầu
              </h3>
              <p className="text-sm text-slate-500 mt-1">Vui lòng nhập lý do từ chối để chủ sân có thể điều chỉnh.</p>
            </div>
            <div className="p-6">
              <textarea
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                placeholder="Ví dụ: Địa điểm chưa cung cấp đủ hình ảnh, giấy tờ không hợp lệ..."
                className="w-full h-32 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none resize-none transition-all text-sm"
              ></textarea>
            </div>
            <div className="p-6 pt-0 flex justify-end gap-3 bg-gray-50/50">
              <button
                onClick={() => setRejectingReq(null)}
                className="px-5 py-2.5 rounded-xl font-semibold text-slate-600 hover:bg-gray-100 transition-colors text-sm"
              >
                Hủy
              </button>
              <button
                onClick={handleRejectSubmit}
                disabled={rejecting || !rejectReason.trim()}
                className="px-5 py-2.5 rounded-xl font-semibold text-white bg-red-500 hover:bg-red-600 transition-all flex items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-md shadow-red-500/20 text-sm"
              >
                {rejecting && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />}
                Xác nhận từ chối
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
