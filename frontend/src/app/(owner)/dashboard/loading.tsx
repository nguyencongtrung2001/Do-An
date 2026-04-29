export default function OwnerDashboardLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="h-6 w-32 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-48 bg-slate-100 rounded-lg animate-pulse mt-2" />
      </header>
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm animate-pulse">
              <div className="h-10 w-10 bg-slate-100 rounded-xl mb-3" />
              <div className="h-7 w-16 bg-slate-200 rounded mb-1" />
              <div className="h-4 w-24 bg-slate-100 rounded" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-64 animate-pulse" />
          <div className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm h-64 animate-pulse" />
        </div>
      </div>
    </div>
  );
}
