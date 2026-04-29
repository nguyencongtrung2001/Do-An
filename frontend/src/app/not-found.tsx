import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-background-light dark:bg-background-dark">
      {/* Icon */}
      <div className="w-28 h-28 bg-red-50 dark:bg-red-900/20 text-primary rounded-3xl flex items-center justify-center -rotate-6 mb-6 shadow-lg shadow-primary/10">
        <span
          className="material-symbols-outlined text-6xl"
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          explore_off
        </span>
      </div>

      <h1 className="text-6xl font-black tracking-tight text-slate-900 dark:text-white mb-2">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-200 mb-3">
        Không tìm thấy trang
      </h2>
      <p className="text-slate-500 dark:text-slate-400 max-w-md mx-auto text-center mb-8">
        Trang bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển. Hãy quay
        lại trang chủ để tiếp tục.
      </p>

      <Link
        href="/"
        className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-white font-bold rounded-full hover:bg-red-600 transition-all shadow-lg shadow-primary/30 hover:shadow-xl hover:shadow-primary/40 active:scale-95"
      >
        <span className="material-symbols-outlined text-lg">home</span>
        Về trang chủ
      </Link>
    </div>
  );
}
