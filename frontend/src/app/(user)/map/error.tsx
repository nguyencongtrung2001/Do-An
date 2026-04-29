"use client";

export default function MapError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="h-full w-full flex flex-col items-center justify-center gap-4 p-8">
      <span className="material-symbols-outlined text-5xl text-red-400">error</span>
      <h2 className="text-lg font-bold text-slate-900 dark:text-white">Đã xảy ra lỗi</h2>
      <p className="text-sm text-slate-500 dark:text-slate-400 text-center max-w-md">
        {error.message || "Không thể tải bản đồ. Vui lòng thử lại."}
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
