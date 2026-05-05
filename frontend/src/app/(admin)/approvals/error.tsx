"use client";

export default function AdminApprovalsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <span className="material-symbols-outlined text-5xl text-red-400 mb-4">rule</span>
      <h2 className="text-lg font-bold text-slate-900 mb-2">Không thể tải danh sách kiểm duyệt</h2>
      <p className="text-sm text-slate-500 max-w-md mb-6">
        {error.message || "Đã xảy ra lỗi. Vui lòng thử lại."}
      </p>
      <button onClick={reset} className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors">
        Thử lại
      </button>
    </div>
  );
}
