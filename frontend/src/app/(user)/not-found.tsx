import Link from "next/link";

export default function UserNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-4 text-center">
      <div className="w-24 h-24 bg-red-50 dark:bg-red-900/20 text-primary rounded-3xl flex items-center justify-center -rotate-6 mb-6 shadow-sm">
        <span
          className="material-symbols-outlined text-5xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          search_off
        </span>
      </div>
      <h1 className="text-5xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
        Không tìm thấy trang
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link
        href="/"
        className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-full hover:bg-red-600 transition-all shadow-lg shadow-primary/30 active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">home</span>
        Về trang chủ
      </Link>
    </div>
  );
}
