// Layout measurements and reusable spacing recipes. Class strings are written out in full so
// Tailwind's source scanner picks them up.

export const Sizes = {
  sidebarWidth: 256, // w-64
  headerHeight: 64, // h-16
  chartHeight: 288, // h-72
  lowStockListLimit: 12,
  recentOrdersLimit: 6,
  revenueWindowDays: 30,
  thumb: { sm: 40, md: 48, lg: 56 },
} as const;

export const Layout = {
  /** Standard admin page: centred, 1280px max, 24px → 32px padding, 24px vertical rhythm. */
  page: "mx-auto w-full max-w-7xl space-y-6 p-6 md:p-8",
  /** Narrow page used by Settings (896px). */
  pageNarrow: "mx-auto w-full max-w-4xl space-y-6 p-6 md:p-8",
  /** Bordered surface that wraps a full-width table. */
  tableCard: "overflow-hidden rounded-xl border border-border bg-card shadow-sm",
  /** Bordered surface for filter/search toolbars. */
  toolbarCard: "rounded-xl border border-border bg-card p-4 shadow-sm",
  /** Inner bordered panel inside sheets. */
  panel: "rounded-xl border border-border p-4",
  /** Right-side detail sheet body. */
  sheetBody: "space-y-6 px-4 pb-8",
} as const;
