"use client";

export default function HistoryError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex-1 flex flex-col items-center justify-center gap-4 min-h-[60vh] px-4">
      <span className="material-symbols-outlined text-5xl text-red-400">
        history_toggle_off
      </span>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">
        Không thể tải lịch sử
      </h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
        {error.message || "Đã xảy ra lỗi khi tải lịch sử đặt sân. Vui lòng thử lại."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2 bg-primary text-white font-bold rounded-full text-sm hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
      >
        Thử lại
      </button>
    </div>
  );
}
