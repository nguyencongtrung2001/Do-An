"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import Image from "next/image";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";

interface DbUser {
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

export default function AdminUsersClient() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { token } = useAuth();
  const [users, setUsers] = useState<DbUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<DbUser | null>(null);

  const PAGE_SIZE = 10;
  const searchQuery = searchParams.get("search") || "";
  const roleFilter = searchParams.get("role") || "all";
  const statusFilter = searchParams.get("status") || "all";
  const page = parseInt(searchParams.get("page") || "1", 10);

  const updateQueryParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") params.delete(key);
        else params.set(key, value);
      });
      router.push(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateQueryParams({ search: e.target.value, page: "1" });
  };

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParams({ role: e.target.value !== "all" ? e.target.value : null, page: "1" });
  };

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    updateQueryParams({ status: e.target.value !== "all" ? e.target.value : null, page: "1" });
  };

  const handlePageChange = (newPage: number) => {
    updateQueryParams({ page: newPage > 1 ? newPage.toString() : null });
  };

  const fetchUsers = useCallback(async () => {
    if (!token) return;
    try {
      const res = await adminService.getAllUsers(token);
      if (res.success) setUsers(res.users);
    } catch (err) {
      console.error("Error fetching users:", err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    (async () => { await fetchUsers(); })();
  }, [fetchUsers]);

  // Filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchSearch =
        user.ho_ten.toLowerCase().includes(searchQuery.toLowerCase()) ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase());
      const matchRole =
        roleFilter === "all" ||
        (roleFilter === "owner" && user.vai_tro === "Chủ sân") ||
        (roleFilter === "renter" && user.vai_tro === "Khách hàng") ||
        (roleFilter === "admin" && user.vai_tro === "Quản trị viên");
      const matchStatus =
        statusFilter === "all" ||
        (statusFilter === "active" && user.trang_thai) ||
        (statusFilter === "locked" && !user.trang_thai);
      return matchSearch && matchRole && matchStatus;
    });
  }, [users, searchQuery, roleFilter, statusFilter]);

  const pagedUsers = filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  // Stats
  const totalUsers = users.length;
  const totalOwners = users.filter((u) => u.vai_tro === "Chủ sân").length;
  const totalRenters = users.filter((u) => u.vai_tro === "Khách hàng").length;
  const lockedAccounts = users.filter((u) => !u.trang_thai).length;

  const toggleLock = async (userId: string) => {
    if (!token || togglingId) return;
    setTogglingId(userId);
    try {
      const res = await adminService.toggleUserStatus(token, userId);
      if (res.success) {
        setUsers((prev) =>
          prev.map((u) =>
            u.ma_nguoi_dung === userId ? { ...u, trang_thai: !u.trang_thai } : u
          )
        );
      }
    } catch (err) {
      console.error("Error toggling status:", err);
    } finally {
      setTogglingId(null);
    }
  };

  const closeModal = () => setSelectedUser(null);

  const getRoleBadge = (role: string) => {
    if (role === "Chủ sân") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-blue-50 text-blue-600">Chủ sân</span>;
    if (role === "Quản trị viên") return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-purple-50 text-purple-600">Admin</span>;
    return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-50 text-emerald-600">Khách hàng</span>;
  };

  const getStatusBadge = (active: boolean) => {
    if (active) return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-green-50 text-green-600">Hoạt động</span>;
    return <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-red-50 text-red-600">Bị khóa</span>;
  };

  const getAvatarColor = (role: string) => {
    if (role === "Chủ sân") return "bg-blue-100 text-blue-600";
    if (role === "Quản trị viên") return "bg-purple-100 text-purple-600";
    return "bg-emerald-100 text-emerald-600";
  };

  const getInitials = (name: string) => {
    const parts = name.split(" ");
    return (parts[0]?.[0] || "") + (parts[parts.length - 1]?.[0] || "");
  };

  const formatDate = (dateStr: string) => {
    const d = new Date(dateStr);
    return d.toLocaleDateString("vi-VN", { day: "2-digit", month: "2-digit", year: "numeric" });
  };

  return (
    <div className="flex flex-col min-h-screen pb-10">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-4">
        <h2 className="text-xl font-bold text-slate-900">Quản lý người dùng</h2>
        <p className="text-sm text-slate-400">Quản lý tài khoản Chủ sân và Khách hàng</p>
      </header>

      <div className="p-8">
        {/* Stat Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-blue-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-blue-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>group</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalUsers}</p>
            <p className="text-sm text-slate-400 mt-1">Tổng người dùng</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-indigo-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>domain</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalOwners}</p>
            <p className="text-sm text-slate-400 mt-1">Chủ sân</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-emerald-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>person</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{totalRenters}</p>
            <p className="text-sm text-slate-400 mt-1">Khách hàng</p>
          </div>
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center">
                <span className="material-symbols-outlined text-red-500 text-2xl" style={{ fontVariationSettings: "'FILL' 1" }}>lock</span>
              </div>
            </div>
            <p className="text-2xl font-bold text-slate-900">{lockedAccounts}</p>
            <p className="text-sm text-slate-400 mt-1">Tài khoản bị khóa</p>
          </div>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm mb-6">
          <div className="flex flex-wrap items-center gap-4">
            <div className="relative flex-1 min-w-[280px]">
              <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 text-xl">search</span>
              <input
                type="text"
                placeholder="Tìm kiếm theo tên hoặc email..."
                value={searchQuery}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none transition-all"
              />
            </div>
            <div className="relative">
              <select
                value={roleFilter}
                onChange={handleRoleChange}
                className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none bg-white cursor-pointer"
              >
                <option value="all">Tất cả vai trò</option>
                <option value="owner">Chủ sân</option>
                <option value="renter">Khách hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">expand_more</span>
            </div>
            <div className="relative">
              <select
                value={statusFilter}
                onChange={handleStatusChange}
                className="appearance-none pl-4 pr-10 py-2.5 text-sm border border-gray-200 rounded-xl focus:ring-2 focus:ring-red-500/20 focus:border-red-500 outline-none bg-white cursor-pointer"
              >
                <option value="all">Tất cả trạng thái</option>
                <option value="active">Hoạt động</option>
                <option value="locked">Bị khóa</option>
              </select>
              <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-sm pointer-events-none">expand_more</span>
            </div>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-100 flex items-center justify-between">
            <h3 className="text-base font-bold text-slate-900">Danh sách người dùng</h3>
            <p className="text-sm text-slate-400">
              Hiển thị {filteredUsers.length} / {users.length} người dùng
            </p>
          </div>

          {loading ? (
            <div className="flex justify-center py-16">
              <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-red-500" />
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-left text-xs text-slate-400 uppercase tracking-wider bg-gray-50/50">
                    <th className="px-6 py-3 font-semibold">Người dùng</th>
                    <th className="px-6 py-3 font-semibold">Email</th>
                    <th className="px-6 py-3 font-semibold">Vai trò</th>
                    <th className="px-6 py-3 font-semibold">Ngày tạo</th>
                    <th className="px-6 py-3 font-semibold">Trạng thái</th>
                    <th className="px-6 py-3 font-semibold text-center">Thao tác</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {pagedUsers.length > 0 ? (
                    pagedUsers.map((user) => (
                      <tr key={user.ma_nguoi_dung} className="hover:bg-gray-50/50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className={`w-9 h-9 rounded-full ${getAvatarColor(user.vai_tro)} flex items-center justify-center text-xs font-bold overflow-hidden shrink-0`}>
                              {user.anh_dai_dien ? (
                                <Image src={user.anh_dai_dien} alt={user.ho_ten} width={36} height={36} className="w-full h-full object-cover" />
                              ) : (
                                getInitials(user.ho_ten)
                              )}
                            </div>
                            <div>
                              <p className="font-semibold text-slate-900">{user.ho_ten}</p>
                              <p className="text-xs text-slate-400">{user.so_dien_thoai || "—"}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                        <td className="px-6 py-4">{getRoleBadge(user.vai_tro)}</td>
                        <td className="px-6 py-4 text-slate-600">{formatDate(user.ngay_tao)}</td>
                        <td className="px-6 py-4">{getStatusBadge(user.trang_thai)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center justify-center gap-2">
                            <button
                              onClick={() => toggleLock(user.ma_nguoi_dung)}
                              disabled={togglingId === user.ma_nguoi_dung}
                              className={`w-8 h-8 rounded-lg flex items-center justify-center transition-colors ${
                                user.trang_thai
                                  ? "bg-amber-50 text-amber-600 hover:bg-amber-100"
                                  : "bg-green-50 text-green-600 hover:bg-green-100"
                              } ${togglingId === user.ma_nguoi_dung ? "opacity-50" : ""}`}
                              title={user.trang_thai ? "Khóa tài khoản" : "Mở khóa"}
                            >
                              <span className="material-symbols-outlined text-lg">
                                {user.trang_thai ? "lock" : "lock_open"}
                              </span>
                            </button>
                            <button
                              onClick={() => setSelectedUser(user)}
                              className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 flex items-center justify-center transition-colors"
                              title="Xem chi tiết"
                            >
                              <span className="material-symbols-outlined text-lg">visibility</span>
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="px-6 py-10 text-center text-slate-400">
                        Không tìm thấy người dùng phù hợp.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
          
          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <p className="text-sm text-slate-500">
                Trang <span className="font-semibold text-slate-900">{page}</span> / <span className="font-semibold text-slate-900">{totalPages}</span>
              </p>
              <div className="flex gap-2">
                <button
                  onClick={() => handlePageChange(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Trước
                </button>
                <button
                  onClick={() => handlePageChange(Math.min(totalPages, page + 1))}
                  disabled={page === totalPages}
                  className="px-3 py-1.5 rounded-lg border border-gray-200 text-sm font-medium text-slate-600 hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Sau
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Detail Modal */}
      {selectedUser && (
        <div
          className="fixed inset-0 z-100 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={closeModal}
        >
          <div
            className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[80vh] overflow-hidden flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100 shrink-0">
              <h3 className="text-lg font-bold text-slate-900">Chi tiết người dùng</h3>
              <button onClick={closeModal} className="w-9 h-9 rounded-xl bg-gray-100 hover:bg-gray-200 flex items-center justify-center">
                <span className="material-symbols-outlined text-slate-600 text-xl">close</span>
              </button>
            </div>
            <div className="p-6 overflow-y-auto flex-1">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-16 h-16 rounded-2xl ${getAvatarColor(selectedUser.vai_tro)} flex items-center justify-center text-xl font-bold overflow-hidden shrink-0`}>
                  {selectedUser.anh_dai_dien ? (
                    <Image src={selectedUser.anh_dai_dien} alt={selectedUser.ho_ten} width={64} height={64} className="w-full h-full object-cover" />
                  ) : (
                    getInitials(selectedUser.ho_ten)
                  )}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-slate-900">{selectedUser.ho_ten}</h4>
                  <p className="text-sm text-slate-400">{selectedUser.email}</p>
                  <p className="text-sm text-slate-400">{selectedUser.so_dien_thoai || "Chưa có SĐT"}</p>
                  <div className="flex items-center gap-2 mt-1">
                    {getRoleBadge(selectedUser.vai_tro)}
                    {getStatusBadge(selectedUser.trang_thai)}
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Mã người dùng</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{selectedUser.ma_nguoi_dung}</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <p className="text-xs text-slate-400">Ngày tạo</p>
                  <p className="text-sm font-bold text-slate-900 mt-1">{formatDate(selectedUser.ngay_tao)}</p>
                </div>
              </div>
              
              {selectedUser.vai_tro === "Chủ sân" && (
                <div className="mt-4 space-y-2">
                  <p className="text-xs text-slate-400">Ảnh CCCD</p>
                  <div className="grid grid-cols-2 gap-3">
                    {selectedUser.anh_cccd_truoc && (
                      <a href={selectedUser.anh_cccd_truoc} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-900 border border-gray-200">
                          <Image src={selectedUser.anh_cccd_truoc} alt="CCCD mặt trước" fill sizes="(max-width: 768px) 50vw, 300px" className="object-contain" />
                        </div>
                        <p className="text-xs text-center text-slate-400 mt-2 font-medium">Mặt trước</p>
                      </a>
                    )}
                    {selectedUser.anh_cccd_sau && (
                      <a href={selectedUser.anh_cccd_sau} target="_blank" rel="noreferrer" className="block hover:opacity-80 transition-opacity">
                        <div className="relative w-full h-40 rounded-lg overflow-hidden bg-slate-900 border border-gray-200">
                          <Image src={selectedUser.anh_cccd_sau} alt="CCCD mặt sau" fill sizes="(max-width: 768px) 50vw, 300px" className="object-contain" />
                        </div>
                        <p className="text-xs text-center text-slate-400 mt-2 font-medium">Mặt sau</p>
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-100 flex items-center justify-end shrink-0">
              <button onClick={closeModal} className="px-4 py-2 text-sm font-semibold text-slate-600 hover:bg-gray-100 rounded-xl">
                Đóng
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
