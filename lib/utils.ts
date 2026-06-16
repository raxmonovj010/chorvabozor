export function formatDate(d: Date) { return new Intl.DateTimeFormat("uz-UZ", { year: "numeric", month: "long", day: "numeric" }).format(new Date(d)); }
export function formatPrice(p: number) {
  return new Intl.NumberFormat("uz-UZ").format(p) + " so'm";
}
export function timeAgo(d: Date) {
  const m = Math.floor((Date.now() - new Date(d).getTime()) / 60000);
  if (m < 1) return "hozir";
  if (m < 60) return m + " daqiqa oldin";
  const h = Math.floor(m / 60);
  if (h < 24) return h + " soat oldin";
  return Math.floor(h / 24) + " kun oldin";
}
export const REGIONS = ["Toshkent","Toshkent viloyati","Samarqand","Buxoro","Namangan","Andijon","Farg'ona","Qashqadaryo","Surxondaryo","Navoiy","Jizzax","Sirdaryo","Xorazm","Qoraqalpog'iston"];
export const CATEGORIES = [
  { id: "qoramol", label: "Qoramol", emoji: "🐄" },
  { id: "qoy", label: "Qo'y", emoji: "🐑" },
  { id: "echki", label: "Echki", emoji: "🐐" },
  { id: "ot", label: "Ot", emoji: "🐎" },
  { id: "tuya", label: "Tuya", emoji: "🐪" },
  { id: "parranda", label: "Parranda", emoji: "🐓" },
  { id: "boshqa", label: "Boshqa", emoji: "📦" },
] as const;
