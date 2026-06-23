"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { userService } from "@/services/user.service";

export function useOwnerApprovalStatus() {
  const { token, user, login } = useAuth();
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    let cancelled = false;

    const syncStatus = async () => {
      if (!token || !user) {
        setChecking(false);
        return;
      }
      try {
        const res = await userService.getProfile(token);
        if (!cancelled && res.success) {
          login(token, {
            ...user,
            trang_thai: res.user.trang_thai,
            diadiem: res.user.diadiem,
          });
        }
      } catch (err) {
        console.error("Không thể đồng bộ trạng thái duyệt tài khoản:", err);
      } finally {
        if (!cancelled) setChecking(false);
      }
    };

    syncStatus();
    return () => { cancelled = true; };
    
  }, [token]);

  const isAccountApproved = user?.trang_thai === true;
  const isLocationApproved = user?.diadiem?.[0]?.trang_thai_duyet === true;

  return {
    checking,
    isAccountApproved,
    isLocationApproved,
    canAddCourt: isAccountApproved && isLocationApproved,
  };
}
