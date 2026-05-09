"use client";

import { Role } from "@/types/auth.types";

interface RoleSelectorProps {
  role: Role;
  setRole: (role: Role) => void;
  isVisible: boolean;
}

export default function RoleSelector({ role, setRole, isVisible }: RoleSelectorProps) {
  return (
    <div className={`flex bg-gray-100 rounded-full p-1 mb-8 transition-opacity duration-300 ${!isVisible ? 'opacity-0 h-0 w-0 mb-0 overflow-hidden' : 'opacity-100'}`}>
      <button
        onClick={() => setRole("player")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          role === "player" ? "bg-primary text-white shadow-[0_4px_14px_rgba(236,19,19,0.35)]" : "text-slate-500"
        }`}
      >
        <span className="material-symbols-outlined text-lg">sports_soccer</span>
        Tôi là Người chơi
      </button>
      <button
        onClick={() => setRole("owner")}
        className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 ${
          role === "owner" ? "bg-primary text-white shadow-[0_4px_14px_rgba(236,19,19,0.35)]" : "text-slate-500"
        }`}
      >
        <span className="material-symbols-outlined text-lg">stadium</span>
        Tôi là Chủ sân
      </button>
    </div>
  );
}
