export function formatDate(date) {
  if (!date) return "";
  const d = new Date(date);
  return d.toLocaleString("uk-UA", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });
}

export function isToday(date) {
  const d = new Date(date);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth() &&
         d.getDate() === now.getDate();
}

export function isInNextWeek(date) {
  const d = new Date(date);
  const now = new Date();
  const weekLater = new Date();
  weekLater.setDate(now.getDate() + 7);
  return d >= now && d <= weekLater;
}

export function isInThisMonth(date) {
  const d = new Date(date);
  const now = new Date();
  return d.getFullYear() === now.getFullYear() &&
         d.getMonth() === now.getMonth();
}
