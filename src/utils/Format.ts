import { format, parseISO } from "date-fns";
import { Tones } from "@/utils/Colors";

const DAY_MS = 24 * 60 * 60 * 1000;

/** Indian Rupee with en-IN grouping (₹1,24,500). Amounts are whole rupees. */
export function inr(n: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(n);
}

/** Short rupee label for chart axes (₹8k). */
export function inrCompact(v: number): string {
  return v >= 1000 ? `₹${Math.round(v / 1000)}k` : `₹${v}`;
}

export function fmtDate(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), "dd MMM yyyy");
  } catch {
    return "—";
  }
}

export function fmtDateTime(iso?: string | null): string {
  if (!iso) return "—";
  try {
    return format(parseISO(iso), "dd MMM yyyy, hh:mm a");
  } catch {
    return "—";
  }
}

/** ISO timestamp `n` days before now. */
export function daysAgo(n: number): string {
  return new Date(Date.now() - n * DAY_MS).toISOString();
}

/** Calendar date (yyyy-MM-dd) `n` days from today; negative for the past. */
export function dateFromToday(n: number): string {
  return format(new Date(Date.now() + n * DAY_MS), "yyyy-MM-dd");
}

export function todayISODate(): string {
  return format(new Date(), "yyyy-MM-dd");
}

export function stockChip(total: number, threshold = 5): { label: string; className: string } {
  if (total === 0) return { label: "Out of Stock", className: Tones.danger };
  if (total <= threshold) return { label: "Low Stock", className: Tones.warning };
  return { label: "In Stock", className: Tones.success };
}

export function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/&/g, " ")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/** "Meera Kapoor" → "MK". */
export function initials(name: string): string {
  return name
    .split(" ")
    .filter(Boolean)
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

/** Stable kebab-case id fragment for test ids and keys. */
export function kebab(s: string): string {
  return s.toLowerCase().replace(/\s+/g, "-");
}

export function newId(): string {
  return crypto.randomUUID();
}
