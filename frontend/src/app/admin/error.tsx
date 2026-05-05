"use client";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center">
      <div className="w-20 h-20 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mb-4">
        <span className="material-symbols-outlined text-4xl">error</span>
      </div>
      <h2 className="text-xl font-bold text-slate-900 mb-2">
        Lỗi hệ thống quản trị
      </h2>
      <p className="text-sm text-slate-500 text-center max-w-md mb-6">
        {error.message || "Đã xảy ra lỗi khi tải trang quản trị. Vui lòng thử lại."}
      </p>
      <button
        onClick={reset}
        className="px-6 py-2.5 bg-primary text-white font-bold rounded-xl text-sm hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
      >
        Thử lại
      </button>
    </div>
  );
}
