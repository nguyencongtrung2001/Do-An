import OwnerSidebar from "@/components/owner/OwnerSidebar";

export const metadata = {
  title: "Owner Dashboard - SportLink",
  description: "Trang dành cho chủ sân thể thao",
  robots: { index: false, follow: false },
};

export default function OwnerLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-display text-slate-900 antialiased overflow-x-hidden">
      <OwnerSidebar />
      <main className="flex-1 min-w-0 ml-0 md:ml-64 flex flex-col min-h-screen pb-20 md:pb-0">
        {}
        {children}
      </main>
    </div>
  );
}
