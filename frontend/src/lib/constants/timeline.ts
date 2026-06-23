

export const TIMELINE_START_HOUR = 6;
export const TIMELINE_END_HOUR = 22;
export const TOTAL_HALF_HOURS = (TIMELINE_END_HOUR - TIMELINE_START_HOUR) * 2; 


export const TIMELINE_LABELS: string[] = (() => {
  const labels: string[] = [];
  for (let h = TIMELINE_START_HOUR; h < TIMELINE_END_HOUR; h++) {
    labels.push(`${h}:00`);
    labels.push(`${h}:30`);
  }
  return labels;
})();


export const TIME_SLOTS: string[] = Array.from({ length: TOTAL_HALF_HOURS }, (_, i) => {
  const hour = Math.floor(i / 2) + TIMELINE_START_HOUR;
  const minute = i % 2 === 0 ? "00" : "30";
  return `${String(hour).padStart(2, "0")}:${minute}`;
});
