import OwnerDashboardClient from "@/components/owner/OwnerDashboardClient";

export const metadata = {
  title: "Dashboard — Admin Panel",
  description: "Tổng quan về hệ thống đặt sân thể thao.",
};

export default function DashboardPage() {
  return <OwnerDashboardClient />;
}
