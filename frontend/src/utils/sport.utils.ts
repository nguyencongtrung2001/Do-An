/**
 * Normalize sport name from Vietnamese to a URL-safe slug.
 * Used across CourtGrid, MapClient, and related components.
 */
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
