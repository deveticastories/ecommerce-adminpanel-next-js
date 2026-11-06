// Aavya palette — ivory linen page, plum primary, champagne gold accents.
// Tailwind classes use the matching CSS tokens declared in src/app/globals.css
// (e.g. `bg-primary`, `text-brand-gold`, `bg-sidebar`). Use these hex values only where a
// raw colour is required in JS: chart strokes, SVG gradients and colour swatches.

export const Colors = {
  brand: {
    plum: "#9F2B68",
    plumBright: "#C23A7D",
    plumDeep: "#831843",
    blush: "#FDF2F8",
    gold: "#F7CE68",
    champagne: "#C5A059",
    amber: "#E5A93C",
    espresso: "#1A1615",
  },
  light: {
    background: "#FAF8F5",
    foreground: "#1C1917",
    card: "#FFFFFF",
    muted: "#F5EFEB",
    mutedForeground: "#57534E",
    border: "#E7E2DA",
    destructive: "#BE123C",
  },
  dark: {
    background: "#0F0B10",
    foreground: "#FAF5F0",
    card: "#18121C",
    muted: "#231A29",
    mutedForeground: "#A8A29E",
    border: "#271E2B",
    destructive: "#FB7185",
  },
  sidebar: {
    background: "#1E131D",
    backgroundDark: "#180D17",
    accent: "#2F1B2C",
    border: "#2C1C2B",
    foreground: "#FAF7F2",
    muted: "#D6C7C2",
  },
  login: {
    panel: "#180D17",
    text: "#FFFDF9",
    muted: "#E5D4CC",
  },
  chart: {
    revenue: "#9F2B68",
    audience: "#C5A059",
    grid: "#E7E2DA",
    axis: "#A8A29E",
  },
} as const;

/** Colourways offered in the product variant matrix (name → swatch hex). */
export const Colorways = [
  { name: "Crimson", hex: "#A4243B", code: "CRM" },
  { name: "Mustard", hex: "#D9A421", code: "MUS" },
  { name: "Peacock Blue", hex: "#1F6F8B", code: "PCB" },
  { name: "Emerald Green", hex: "#0F7B5F", code: "EMR" },
  { name: "Rani Pink", hex: "#C2185B", code: "RNP" },
  { name: "Ivory Gold", hex: "#E8D5A8", code: "IVG" },
  { name: "Royal Blue", hex: "#1D4ED8", code: "RBL" },
  { name: "Turquoise", hex: "#22B8CF", code: "TRQ" },
  { name: "Blush", hex: "#E8B4C8", code: "BLS" },
] as const;

/** Pill tones shared by status, stock and state badges. */
export const Tones = {
  success: "bg-emerald-50 text-emerald-800 border-emerald-200",
  warning: "bg-amber-50 text-amber-900 border-amber-200",
  danger: "bg-rose-50 text-rose-800 border-rose-200",
  info: "bg-blue-50 text-blue-900 border-blue-200",
  shipped: "bg-purple-50 text-purple-900 border-purple-200",
  neutral: "bg-stone-100 text-stone-600 border-stone-200",
} as const;

export type Tone = keyof typeof Tones;
