"use client";

import Link from "next/link";

export default function CourtDetailError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <span className="material-symbols-outlined text-5xl text-red-400 mb-4">
        error
      </span>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white mb-2">
        Không thể tải thông tin sân
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md mb-6">
        {error.message || "Đã xảy ra lỗi khi tải thông tin sân. Vui lòng thử lại."}
      </p>
      <div className="flex gap-3">
        <button
          onClick={reset}
          className="px-6 py-2 bg-primary text-white font-bold rounded-full text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
        >
          Thử lại
        </button>
        <Link
          href="/"
          className="px-6 py-2 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-bold rounded-full text-sm border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
        >
          Về trang chủ
        </Link>
      </div>
    </div>
  );
}
