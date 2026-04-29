export default function OwnerStatusLoading() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white border-b border-gray-200 px-8 py-4">
        <div className="h-6 w-40 bg-slate-200 rounded-lg animate-pulse" />
        <div className="h-4 w-52 bg-slate-100 rounded-lg animate-pulse mt-2" />
      </header>
      <div className="p-8 space-y-6">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="bg-white rounded-2xl p-5 border border-gray-100 shadow-sm flex items-center justify-between animate-pulse">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-slate-200 rounded-xl" />
                <div className="space-y-2">
                  <div className="h-5 w-36 bg-slate-200 rounded" />
                  <div className="h-4 w-48 bg-slate-100 rounded" />
                </div>
              </div>
              <div className="h-8 w-16 bg-slate-200 rounded-full" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
