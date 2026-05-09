/**
 * Booking status configuration — centralized source of truth.
 * Used in: OwnerBookingsClient, OwnerDashboardClient, HistoryClient.
 * Matches DB constraint: 'Chờ xử lý', 'Đã xác nhận', 'Đã nhận sân', 'Hoàn thành', 'Đã hủy'
 */

// ==============================
// Status Config Type
// ==============================
export interface StatusConfig {
  bg: string;
  text: string;
  gradient: string;
  label: string;
  border: string;
}

// ==============================
// Main Config Map
// ==============================
export const BOOKING_STATUS_CONFIG: Record<string, StatusConfig> = {
  "Chờ xử lý":   { bg: "bg-amber-50",  text: "text-amber-700",  gradient: "linear-gradient(135deg, #f59e0b, #d97706)", label: "Chờ xử lý",   border: "border-amber-200" },
  "Đã xác nhận":  { bg: "bg-green-50",  text: "text-green-700",  gradient: "linear-gradient(135deg, #22c55e, #16a34a)", label: "Đã xác nhận",  border: "border-green-200" },
  "Đã nhận sân":  { bg: "bg-violet-50", text: "text-violet-700", gradient: "linear-gradient(135deg, #8b5cf6, #7c3aed)", label: "Đã nhận sân",  border: "border-violet-200" },
  "Hoàn thành":   { bg: "bg-blue-50",   text: "text-blue-700",   gradient: "linear-gradient(135deg, #3b82f6, #2563eb)", label: "Hoàn thành",   border: "border-blue-200" },
  "Đã hủy":       { bg: "bg-red-50",    text: "text-red-700",    gradient: "linear-gradient(135deg, #ef4444, #dc2626)", label: "Đã hủy",       border: "border-red-200" },
};

export const DEFAULT_STATUS_CONFIG: StatusConfig = {
  bg: "bg-gray-50",
  text: "text-gray-700",
  gradient: "linear-gradient(135deg, #94a3b8, #64748b)",
  label: "Không rõ",
  border: "border-gray-200",
};

// ==============================
// Status Filter Type
// ==============================
export type StatusFilter = "all" | "Chờ xử lý" | "Đã xác nhận" | "Đã nhận sân" | "Hoàn thành" | "Đã hủy";

export const STATUS_FILTER_OPTIONS: { value: StatusFilter; label: string }[] = [
  { value: "all", label: "Tất cả" },
  { value: "Chờ xử lý", label: "Chờ xử lý" },
  { value: "Đã xác nhận", label: "Đã xác nhận" },
  { value: "Đã nhận sân", label: "Đã nhận sân" },
  { value: "Hoàn thành", label: "Hoàn thành" },
  { value: "Đã hủy", label: "Đã hủy" },
];

// ==============================
// Helpers
// ==============================
export function getStatusConfig(status: string): StatusConfig {
  return BOOKING_STATUS_CONFIG[status] || DEFAULT_STATUS_CONFIG;
}
