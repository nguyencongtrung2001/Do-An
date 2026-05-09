"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { adminService } from "@/services/admin.service";
import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";

// Sub-components
import UserStats from "./UserStats";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";
import UserDetailModal from "./UserDetailModal";

const PAGE_SIZE = 10;

export default function AdminUsers() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { token } = useAuth();
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

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
    fetchUsers();
  }, [fetchUsers]);

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

  const pagedUsers = useMemo(() => {
    return filteredUsers.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  }, [filteredUsers, page]);

  const totalPages = Math.ceil(filteredUsers.length / PAGE_SIZE);

  const stats = useMemo(() => {
    return {
      total: users.length,
      owners: users.filter((u) => u.vai_tro === "Chủ sân").length,
      renters: users.filter((u) => u.vai_tro === "Khách hàng").length,
      locked: users.filter((u) => !u.trang_thai).length,
    };
  }, [users]);

  const handleToggleLock = async (userId: string) => {
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
        toast.success(res.message || "Cập nhật trạng thái người dùng thành công!");
      }
    } catch (err) {
      toast.error("Không thể thay đổi trạng thái người dùng.");
    } finally {
      setTogglingId(null);
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50 pb-20">
      <header className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-gray-200 px-8 py-6">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-xl shadow-slate-900/10">
            <ShieldCheck className="w-7 h-7" />
          </div>
          <div>
            <h2 className="text-2xl font-black text-slate-900 tracking-tighter uppercase">QUẢN LÝ NGƯỜI DÙNG</h2>
            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Thực thi chính sách bảo mật và phân quyền tài khoản</p>
          </div>
        </div>
      </header>

      <div className="p-8">
        <UserStats
          totalUsers={stats.total}
          totalOwners={stats.owners}
          totalRenters={stats.renters}
          lockedAccounts={stats.locked}
        />

        <UserFilters
          searchQuery={searchQuery}
          onSearchChange={(val) => updateQueryParams({ search: val, page: "1" })}
          roleFilter={roleFilter}
          onRoleChange={(val) => updateQueryParams({ role: val !== "all" ? val : null, page: "1" })}
          statusFilter={statusFilter}
          onStatusChange={(val) => updateQueryParams({ status: val !== "all" ? val : null, page: "1" })}
        />

        <UserTable
          users={pagedUsers}
          loading={loading}
          onToggleLock={handleToggleLock}
          onViewDetail={setSelectedUser}
          togglingId={togglingId}
          page={page}
          totalPages={totalPages}
          onPageChange={(p) => updateQueryParams({ page: p > 1 ? p.toString() : null })}
          totalFiltered={filteredUsers.length}
          totalAll={users.length}
        />
      </div>

      <UserDetailModal
        isOpen={!!selectedUser}
        onClose={() => setSelectedUser(null)}
        user={selectedUser}
      />
    </div>
  );
}
