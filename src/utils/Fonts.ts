import { IBM_Plex_Mono, Playfair_Display, Plus_Jakarta_Sans } from "next/font/google";

// Display serif for headings, a warm grotesk for UI copy, and a mono for money, SKUs and IDs.
export const headingFont = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const monoFont = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-mono",
  display: "swap",
});

export const fontVariables = `${headingFont.variable} ${sansFont.variable} ${monoFont.variable}`;

/** Recurring text styles. */
export const Typography = {
  pageTitle: "font-heading text-3xl tracking-tight",
  pageSubtitle: "mt-1 text-sm text-muted-foreground",
  sheetTitle: "font-heading text-2xl tracking-tight",
  sectionLabel: "text-xs font-semibold uppercase tracking-wider text-muted-foreground",
  eyebrow: "text-[10px] font-semibold uppercase tracking-wider text-muted-foreground",
  money: "font-mono text-sm font-semibold",
  code: "font-mono text-xs text-muted-foreground",
} as const;
