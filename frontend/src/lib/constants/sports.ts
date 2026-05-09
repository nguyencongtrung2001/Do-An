/**
 * Sports constants — centralized source of truth.
 * Replaces duplicated SPORT_LABELS across OwnerCourtsClient, CourtGrid, etc.
 * Also absorbs sport.utils.ts normalizeSport function.
 */

// ==============================
// Sport Labels (Vietnamese display names)
// ==============================
export const SPORT_LABELS: Record<string, string> = {
  "bong-da": "Bóng đá",
  "cau-long": "Cầu lông",
  "pickleball": "Pickleball",
  "bong-ro": "Bóng rổ",
  "tennis": "Tennis",
  "bida": "Bi-da",
};

// ==============================
// Sport Labels with Icons (for UI filter pills / court cards)
// ==============================
export const SPORT_LABELS_WITH_ICONS: Record<string, string> = {
  "bong-da": "⚽ Bóng đá",
  "cau-long": "🏸 Cầu lông",
  "pickleball": "🏓 Pickleball",
  "bong-ro": "🏀 Bóng rổ",
  "tennis": "🎾 Tennis",
  "bida": "🎱 Bi-da",
};

// ==============================
// Sport Icons (emoji only)
// ==============================
export const SPORT_ICONS: Record<string, string> = {
  "bong-da": "⚽",
  "cau-long": "🏸",
  "pickleball": "🏓",
  "bong-ro": "🏀",
  "tennis": "🎾",
  "bida": "🎱",
};

// ==============================
// Filter options for sport selection UI
// ==============================
export const SPORT_FILTERS = [
  { value: "all", label: "Tất cả", icon: "🏟️" },
  { value: "bong-da", label: "Bóng đá", icon: "⚽" },
  { value: "cau-long", label: "Cầu lông", icon: "🏸" },
  { value: "pickleball", label: "Pickleball", icon: "🏓" },
  { value: "bong-ro", label: "Bóng rổ", icon: "🏀" },
  { value: "tennis", label: "Tennis", icon: "🎾" },
] as const;

export type SportFilterValue = (typeof SPORT_FILTERS)[number]["value"];

// ==============================
// Normalize Vietnamese sport name → slug
// Absorbed from utils/sport.utils.ts
// ==============================
export function normalizeSport(sport: string): string {
  const normalized = sport?.toLowerCase() || "";
  if (normalized.includes("đá")) return "bong-da";
  if (normalized.includes("lông")) return "cau-long";
  if (normalized.includes("rổ")) return "bong-ro";
  if (normalized.includes("tennis")) return "tennis";
  if (normalized.includes("pickleball")) return "pickleball";
  if (normalized.includes("bida")) return "bida";
  return normalized;
}

/**
 * Get display label for a sport slug, with optional icon.
 */
export function getSportLabel(slug: string, withIcon = false): string {
  if (withIcon) return SPORT_LABELS_WITH_ICONS[slug] || slug;
  return SPORT_LABELS[slug] || slug;
}
