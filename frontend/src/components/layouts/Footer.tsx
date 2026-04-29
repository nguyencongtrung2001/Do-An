// src/components/layout/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-white dark:bg-[#2a1d1d] border-t border-gray-200 dark:border-gray-800 py-12">
      <div className="container mx-auto px-4 text-center">
        <div className="flex justify-center gap-6 mb-6">
          {['Facebook', 'Zalo', 'Instagram'].map(social => (
            <a key={social} href="#" className="text-sm font-medium text-slate-400 hover:text-primary transition-colors">
              {social}
            </a>
          ))}
        </div>
        <p className="text-slate-500 dark:text-slate-400 text-sm">
          © {new Date().getFullYear()} <span className="text-primary font-bold">Book Sport</span>. 
          Nền tảng quản lý và đặt sân hàng đầu Việt Nam.
        </p>
      </div>
    </footer>
  );
}