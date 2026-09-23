import type { Lang } from "./i18n";

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

const MONTHS: Record<Lang, readonly string[]> = {
  tr: [
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
  ],
  en: [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
};

export function formatDateLong(d: Date = new Date(), lang: Lang = "tr"): string {
  const day = d.getDate();
  const month = MONTHS[lang][d.getMonth()]!;
  // Turkish: "24 Eylül"  ·  English: "September 24"
  return lang === "en" ? `${month} ${day}` : `${day} ${month}`;
}
