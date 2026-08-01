/**
 * ISO-ish local date key in the form YYYY-MM-DD.
 * We use the *local* date (not UTC) so day boundaries respect the user's timezone.
 */
export function dateKey(d: Date = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

const MONTHS_TR = [
  "Ocak",
  "Şubat",
  "Mart",
  "Nisan",
  "Mayıs",
  "Haziran",
  "Temmuz",
  "Ağustos",
  "Eylül",
  "Ekim",
  "Kasım",
  "Aralık",
];

export function formatDateLong(d: Date = new Date()): string {
  const day = d.getDate();
  const month = MONTHS_TR[d.getMonth()]!;
  return `${day} ${month}`;
}
