# Aavya Boutique — Admin Panel

Admin panel for **Aavya Heritage & Bachpan**, a ladies & kids ethnic-wear boutique: dashboard,
products (with size × colour variant stock), orders, customers, categories & collections,
coupons and shop settings.

Built with Next.js 16 (App Router, Cache Components), Tailwind CSS v4, Base UI / shadcn
primitives, Motion animations, Recharts and Zustand.

## Getting started

```bash
npm install
npm run dev        # http://localhost:3000
```

Sign in with the demo account: `admin@aavya.boutique` / `Boutique@2026`
(or press **Use demo credentials & sign in**).

Data is seeded from `src/data/seed.ts` and saved in the browser (`localStorage`, key
`aavya-admin`). Clear that key to reset the demo.

## Folder structure

```
src/
├── app/                    Routes only — each page renders a screen
│   ├── layout.tsx          Fonts, metadata, providers
│   ├── globals.css         Tailwind + theme tokens (light & dark)
│   ├── login/page.tsx
│   └── (admin)/            Guarded routes sharing the sidebar + header shell
│       ├── layout.tsx
│       ├── page.tsx        Dashboard
│       └── products/ orders/ customers/ categories/ coupons/ settings/
├── screens/                One file per screen (LoginScreen, DashboardScreen, …)
├── components/
│   ├── ui/                 Base primitives (button, card, dialog, sheet, select, table…)
│   ├── common/             Shared pieces (PageHeader, StatusBadge, ConfirmDialog, RowActions…)
│   ├── layout/             AppShell, Sidebar, TopBar, MobileNav, AuthGuard, SplashScreen
│   ├── providers/          Theme, motion and store hydration
│   └── dashboard/ products/ orders/ customers/ categories/ coupons/
├── utils/
│   ├── Colors.ts           Brand palette, colourways, badge tones
│   ├── Sizes.ts            Layout sizes and spacing recipes
│   ├── Fonts.ts            Playfair Display / Plus Jakarta Sans / IBM Plex Mono + text styles
│   ├── Images.ts           Local image paths
│   ├── Constants.ts        Routes, navigation, labels, sizes, thresholds
│   ├── Format.ts           ₹ currency, dates, slugs, stock chips
│   ├── Animations.ts       Shared Motion variants and transitions
│   └── cn.ts               className merge helper
├── store/                  Zustand store with all data actions
├── hooks/                  Derived data (products, customers, dashboard KPIs)
├── data/seed.ts            Demo catalogue, orders, customers, coupons
└── types/                  Domain types
public/images/              Product photography and the login hero
```

## Connecting a backend

Screens only read from `src/store/useBoutiqueStore.ts` and the hooks in `src/hooks`. To use a
real API, replace the store actions with API calls (or swap the store for a data-fetching
layer) — the screens and components don't need to change.
