export function getTodayKey() {
  const today = new Date().toISOString().split("T")[0];
  return `attendance-${today}`;
}
