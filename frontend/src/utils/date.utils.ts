/**
 * Date & formatting utilities.
 * Extracted from OwnerBookingsClient, HistoryClient, CourtDetailClient.
 */

/**
 * Format a number as Vietnamese currency: "150,000đ"
 */
export function formatVND(n: number | string): string {
  return Number(n).toLocaleString("vi-VN") + "đ";
}

/**
 * Format an ISO date string to Vietnamese locale: "09/05/2026"
 */
export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

/**
 * Format an ISO date string to full Vietnamese format: "Thứ Sáu, 09 tháng 5, 2026"
 */
export function formatDateFull(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

/**
 * Get today's date as YYYY-MM-DD string.
 */
export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}

/**
 * Calculate duration label between two "HH:mm" time strings.
 * Example: calculateDuration("06:00", "08:00") → "(2 tiếng)"
 */
export function calculateDuration(startTime: string, endTime: string): string {
  const [startH, startM] = startTime.split(":").map(Number);
  const [endH, endM] = endTime.split(":").map(Number);

  const diffMinutes = (endH * 60 + endM) - (startH * 60 + startM);
  const hours = Math.floor(diffMinutes / 60);
  const mins = diffMinutes % 60;

  const result: string[] = [];
  if (hours > 0) result.push(`${hours} tiếng`);
  if (mins > 0) result.push(`${mins} phút`);

  return result.length > 0 ? `(${result.join(" ")})` : "";
}
