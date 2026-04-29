export default function OwnerCourtsLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="h-6 w-36 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-56 bg-slate-100 rounded-lg animate-pulse mt-2" />
      </header>
      <div className="p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden animate-pulse">
              <div className="h-44 bg-slate-200" />
              <div className="p-5 space-y-3">
                <div className="h-5 w-40 bg-slate-200 rounded" />
                <div className="h-4 w-56 bg-slate-100 rounded" />
                <div className="h-4 w-24 bg-slate-100 rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
