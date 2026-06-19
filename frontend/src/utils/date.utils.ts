
export function formatVND(n: number | string): string {
  return Number(n).toLocaleString("vi-VN") + "đ";
}


export function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN");
}

export function formatDateFull(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString("vi-VN", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}


export function getTodayStr(): string {
  return new Date().toISOString().split("T")[0];
}


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
