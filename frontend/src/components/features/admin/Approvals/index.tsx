"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";
import { Hourglass, CheckCircle2, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";

// Sub-components
import ApprovalsTabs from "./ApprovalsTabs";
import OwnerCard from "./OwnerApproval/OwnerCard";
import LocationTable from "./LocationApproval/LocationTable";

type TabType = "owners" | "locations";

export default function AdminApprovals() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>("owners");

  // Owner state
  const [pendingOwners, setPendingOwners] = useState<any[]>([]);
  const [loadingOwners, setLoadingOwners] = useState(true);
  const [approvingOwnerId, setApprovingOwnerId] = useState<string | null>(null);

  // Location state
  const [locations, setLocations] = useState<any[]>([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  const [approvingLocationId, setApprovingLocationId] = useState<string | null>(null);
  const [rejectingLocationId, setRejectingLocationId] = useState<string | null>(null);
  const [locationFilter, setLocationFilter] = useState<"all" | "pending" | "approved">("pending");

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
    fetchOwners();
    fetchLocations();
  }, [fetchOwners, fetchLocations]);

  const handleApproveOwner = async (id: string) => {
    if (!token || approvingOwnerId) return;
    setApprovingOwnerId(id);
    try {
      const res = await adminService.approveOwner(token, id);
      if (res.success) {
        setPendingOwners((prev) => prev.filter((o) => o.ma_nguoi_dung !== id));
        toast.success("Đã duyệt chủ sân thành công!");
        // Re-fetch locations because some might now be eligible for approval
        fetchLocations();
      }
    } catch (err) {
      toast.error("Lỗi khi duyệt chủ sân.");
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
        toast.success("Đã duyệt địa điểm thành công!");
      }
    } catch (err) {
      toast.error("Lỗi khi duyệt địa điểm.");
    } finally {
      setApprovingLocationId(null);
    }
  };

  const handleRejectLocation = async (id: string) => {
    if (!token || rejectingLocationId) return;
    setRejectingLocationId(id);
    try {
      const res = await adminService.rejectLocation(token, id);
      if (res.success) {
        setLocations((prev) =>
          prev.map((l) => (l.ma_dia_diem === id ? { ...l, trang_thai_duyet: false } : l))
        );
        toast.error("Đã từ chối địa điểm.");
      }
    } catch (err) {
      toast.error("Lỗi khi từ chối địa điểm.");
    } finally {
      setRejectingLocationId(null);
    }
  };

  const pendingLocations = useMemo(() => locations.filter((l) => !l.trang_thai_duyet), [locations]);
  
  const filteredLocations = useMemo(() => {
    if (locationFilter === "pending") return pendingLocations;
    if (locationFilter === "approved") return locations.filter((l) => l.trang_thai_duyet);
    return locations;
  }, [locations, pendingLocations, locationFilter]);

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-primary text-white flex items-center justify-center shadow-xl shadow-primary/20">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter">TRUNG TÂM KIỂM DUYỆT</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Xác thực chủ sở hữu và tài nguyên hệ thống</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        <ApprovalsTabs
          activeTab={activeTab}
          onTabChange={setActiveTab}
          pendingOwnersCount={pendingOwners.length}
          pendingLocationsCount={pendingLocations.length}
        />

        {activeTab === "owners" ? (
          <div className="space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center">
                    <Hourglass className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">{pendingOwners.length}</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">ĐANG CHỜ XÁC MINH</p>
                  </div>
               </div>
               <div className="bg-white rounded-3xl p-8 border border-slate-100 shadow-sm flex items-center gap-6">
                  <div className="w-14 h-14 rounded-2xl bg-green-50 text-green-500 flex items-center justify-center">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <div>
                    <p className="text-3xl font-black text-slate-900 tracking-tighter">0</p>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">ĐÃ DUYỆT HÔM NAY</p>
                  </div>
               </div>
            </div>

            {loadingOwners ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Đang tải hồ sơ chủ sân...</p>
              </div>
            ) : pendingOwners.length === 0 ? (
              <div className="bg-white rounded-[40px] p-20 border border-slate-100 shadow-sm text-center">
                <div className="w-20 h-20 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                   <CheckCircle2 className="w-10 h-10" />
                </div>
                <h3 className="text-xl font-black text-slate-900">SẠCH HỒ SƠ CHỜ DUYỆT</h3>
                <p className="text-slate-400 font-bold mt-2">Tất cả chủ sân đã được xác thực danh tính.</p>
              </div>
            ) : (
              <div className="space-y-6">
                {pendingOwners.map((owner) => (
                  <OwnerCard
                    key={owner.ma_nguoi_dung}
                    owner={owner}
                    onApprove={handleApproveOwner}
                    isApproving={approvingOwnerId === owner.ma_nguoi_dung}
                  />
                ))}
              </div>
            )}
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex items-center gap-3 bg-white p-1.5 rounded-2xl border border-slate-100 w-fit shadow-sm">
              {(["pending", "approved", "all"] as const).map((f) => (
                <button
                  key={f}
                  onClick={() => setLocationFilter(f)}
                  className={`px-6 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                    locationFilter === f
                      ? "bg-slate-900 text-white shadow-lg"
                      : "text-slate-400 hover:text-slate-600"
                  }`}
                >
                  {f === "pending" ? "Chờ duyệt" : f === "approved" ? "Đã duyệt" : "Tất cả"}
                </button>
              ))}
            </div>

            {loadingLocations ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-4">
                <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin" />
                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Đang tải danh sách địa điểm...</p>
              </div>
            ) : (
              <LocationTable
                locations={filteredLocations}
                onApprove={handleApproveLocation}
                onReject={handleRejectLocation}
                approvingId={approvingLocationId}
                rejectingId={rejectingLocationId}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
