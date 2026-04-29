// src/components/home/Categories.tsx
const CATEGORIES = [
  { id: 'soccer', name: 'Bóng đá', icon: 'sports_soccer' },
  { id: 'basketball', name: 'Bóng rổ', icon: 'sports_basketball' },
  { id: 'tennis', name: 'Tennis', icon: 'sports_tennis' },
  { id: 'badminton', name: 'Cầu lông', icon: 'sports_volleyball' },
  { id: 'pickleball', name: 'Pickleball', icon: 'sports_tennis' },
  { id: 'billiards', name: 'Bida', icon: 'table_bar' },
];

export default function Categories() {
  return (
    <div className="w-full max-w-[960px] bg-white dark:bg-[#2a1d1d] rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800 p-8 mb-12 overflow-x-auto scrollbar-hide">
      <div className="flex items-center justify-between min-w-[600px] gap-4">
        {CATEGORIES.map((item) => (
          <button 
            key={item.id}
            className="group flex flex-col items-center gap-3 min-w-[80px] transition-all"
          >
            <div className="w-16 h-16 rounded-full bg-red-50 dark:bg-red-900/10 flex items-center justify-center group-hover:bg-primary group-hover:rotate-12 transition-all duration-300">
              <span className="material-symbols-outlined text-primary group-hover:text-white text-2xl transition-colors">
                {item.icon}
              </span>
            </div>
            <span className="text-xs font-bold text-slate-600 dark:text-slate-400 group-hover:text-primary">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}