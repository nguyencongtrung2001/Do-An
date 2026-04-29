import OwnerCourtsClient from "@/components/owner/OwnerCourtsClient";

export const metadata = {
  title: "Quản lý sân — Admin Panel",
  description: "Trang hỗ trợ owner thêm, xóa, sửa sân thể thao của mình",
};

export default function CourtsPage() {
  return <OwnerCourtsClient />;
}
