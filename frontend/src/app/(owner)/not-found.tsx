import Link from 'next/link';

export default function OwnerNotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[80vh] px-4 space-y-4 text-center">
      <div className="w-24 h-24 bg-amber-50 text-amber-500 rounded-3xl flex items-center justify-center -rotate-6 mb-4 shadow-sm">
        <span className="material-symbols-outlined text-5xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          search_off
        </span>
      </div>
      <h1 className="text-5xl font-black tracking-tight text-slate-900">
        404
      </h1>
      <h2 className="text-2xl font-bold text-slate-800">
        Không tìm thấy trang
      </h2>
      <p className="text-slate-500 max-w-md mx-auto">
        Trang chủ sân bạn đang tìm kiếm không tồn tại hoặc đã bị di chuyển.
      </p>
      <Link 
        href="/owner" 
        className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-primary/20"
      >
        <span className="material-symbols-outlined text-sm">home</span>
        Về trang tổng quan
      </Link>
    </div>
  );
}
