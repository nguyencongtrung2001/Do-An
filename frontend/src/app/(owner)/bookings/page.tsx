import OwnerBookings from "@/components/features/owner/Bookings";

export const metadata = {
  title: "Lịch đặt sân — Admin Panel",
  description: "Theo dõi danh sách đặt sân theo thời gian thực.",
};

export default function BookingsPage() {
  return <OwnerBookings />;
}
