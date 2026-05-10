import OwnerStatus from "@/components/owner/OwnerStatusClient";

export const metadata = {
  title: "Trạng thái sân — Owner Panel",
  description: "Thiết lập trạng thái hoạt động và lịch bảo trì sân.",
};

export default function StatusPage() {
  return <OwnerStatus />;
}
