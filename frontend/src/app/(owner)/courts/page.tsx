import OwnerCourts from "@/components/owner/OwnerCourtsClient";

export const metadata = {
  title: "Quản lý sân — Owner Panel",
  description: "Trang hỗ trợ chủ sân thêm, xóa, sửa sân thể thao của mình",
};

export default function CourtsPage() {
  return <OwnerCourts />;
}
