import OwnerBookings from "@/components/owner/OwnerBookingsClient";

export const metadata = {
  title: "Lịch đặt sân — Owner Panel",
  description: "Theo dõi danh sách đặt sân theo thời gian thực.",
};

export default function BookingsPage() {
  return <OwnerBookings />;
}
