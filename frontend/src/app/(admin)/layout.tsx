import AdminSidebar from "@/components/admin/AdminSidebar";

export const metadata = {
  title: "Admin Dashboard - SportLink",
  description: "Trang quản trị viên hệ thống SportLink",
  robots: { index: false, follow: false },
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-slate-50 font-display text-slate-900 antialiased overflow-x-hidden">
      <AdminSidebar />
      <main className="flex-1 min-w-0 ml-64 bg-slate-50">
        {children}
      </main>
    </div>
  );
}
