export default function OwnerBookingsLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="h-6 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-60 bg-slate-100 rounded-lg animate-pulse mt-2" />
      </header>
      <div className="p-8 space-y-6">
        {/* Timeline skeleton */}
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="p-4 border-b border-gray-100 flex gap-3 animate-pulse">
            <div className="h-9 w-24 bg-slate-200 rounded-lg" />
            <div className="h-9 w-24 bg-slate-100 rounded-lg" />
            <div className="h-9 w-24 bg-slate-100 rounded-lg" />
          </div>
          <div className="h-80 bg-slate-50 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
