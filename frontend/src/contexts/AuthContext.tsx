"use client";

import React, { createContext, useContext, useCallback, useMemo, ReactNode, useSyncExternalStore } from "react";
import { useRouter } from "next/navigation";

export interface UserData {
  ma_nguoi_dung: string;
  ho_ten: string;
  email: string;
  so_dien_thoai: string | null;
  vai_tro: string;
  anh_dai_dien: string | null;
  so_vi_du?: number;
}

interface AuthContextType {
  user: UserData | null;
  token: string | null;
  login: (token: string, user: UserData) => void;
  logout: () => void;
  isAuthenticated: boolean;
  isMounted: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// --- External Store Subscription Logic ---
// This handles synchronization with localStorage outside the React render cycle.
const subscribe = (callback: () => void) => {
  if (typeof window === "undefined") return () => {};
  window.addEventListener("storage", callback);
  return () => window.removeEventListener("storage", callback);
};

const getSnapshot = (key: string) => () => {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(key);
};

const getServerSnapshot = () => null;


export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();

  // useSyncExternalStore handles hydration and synchronization automatically
  const tokenRaw = useSyncExternalStore(
    subscribe,
    getSnapshot("token"),
    getServerSnapshot
  );

  const userRaw = useSyncExternalStore(
    subscribe,
    getSnapshot("user"),
    getServerSnapshot
  );

  // Memoize parsing to ensure stable references
  const user = useMemo(() => {
    if (!userRaw) return null;
    try {
      return JSON.parse(userRaw) as UserData;
    } catch {
      return null;
    }
  }, [userRaw]);

  const login = useCallback((newToken: string, newUser: UserData) => {
    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(newUser));
    // Trigger local update for useSyncExternalStore
    window.dispatchEvent(new Event("storage"));
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.dispatchEvent(new Event("storage"));
    router.push("/login");
  }, [router]);

  const value = useMemo(() => ({
    user,
    token: tokenRaw,
    login,
    logout,
    isAuthenticated: !!tokenRaw,
    isMounted: true, // Data exposure is handled by useSyncExternalStore's hydration logic
  }), [user, tokenRaw, login, logout]);

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
