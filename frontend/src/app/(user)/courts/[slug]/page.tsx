
import CourtDetailClient from "@/components/courts/CourtDetailClient";
import { courtService } from "@/services/court.service";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ slug: string }>;
}



export async function generateMetadata({ params }: PageProps) {
  const { slug } = await params;
  try {
    const location = await courtService.getLocationBySlug(slug);
    return {
      title: `${location.ten_dia_diem} — BookSport`,
      description: `Đặt sân tại ${location.ten_dia_diem}, ${location.dia_chi}.`,
    };
  } catch {
    return {
      title: "Chi tiết địa điểm",
      description: "Đặt sân thể thao.",
    };
  }
}

export default async function CourtDetailPage({ params }: PageProps) {
  const { slug } = await params;

  let location;
  try {
    location = await courtService.getLocationBySlug(slug);
  } catch {
    notFound();
  }

  if (!location) {
    notFound();
  }

  return <CourtDetailClient location={location} />;
}
