export default function MapLoading() {
  return (
    <div className="h-full w-full bg-slate-100 dark:bg-slate-800 animate-pulse flex flex-col items-center justify-center gap-4">
      <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin"></div>
      <p className="text-slate-500 font-medium">Đang khởi tạo bản đồ...</p>
    </div>
  );
}
