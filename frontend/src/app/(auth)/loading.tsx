export default function AuthLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        <p className="text-slate-500 font-medium text-sm">Đang tải...</p>
      </div>
    </div>
  );
}
