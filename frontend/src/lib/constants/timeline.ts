/**
 * Timeline constants for the owner bookings schedule view.
 * Extracted from OwnerBookingsClient.tsx.
 */

export const TIMELINE_START_HOUR = 6;
export const TIMELINE_END_HOUR = 22;
export const TOTAL_HALF_HOURS = (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 2; // 32

/**
 * Generate timeline labels: ["6:00", "6:30", "7:00", ..., "21:30"]
 */
export const TIMELINE_LABELS: string[] = (() => {
  const labels: string[] = [];
  for (let h = TIMELINE_START_HOUR; h < TIMELINE_END_HOUR; h++) {
    labels.push(`${h}:00`);
    labels.push(`${h}:30`);
  }
  return labels;
})();

/**
 * Time slot markers for court booking UI: ["06:00", "06:30", ..., "21:30"]
 * Each marker represents a 30-minute block starting at that time.
 */
export const TIME_SLOTS: string[] = Array.from({ length: TOTAL_HALF_HOURS }, (_, i) => {
  const hour = Math.floor(i / 2) + TIMELINE_START_HOUR;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});
