import {
  LayoutDashboard,
  Settings as SettingsIcon,
  Shirt,
  ShoppingBag,
  Tags,
  TicketPercent,
  Users,
  type LucideIcon,
} from "lucide-react";
import type { Audience, OrderStatus, TaxonomyAudience } from "@/types";

export const APP_NAME = "Aavya Boutique";

export const Routes = {
  login: "/login",
  dashboard: "/",
  products: "/products",
  orders: "/orders",
  customers: "/customers",
  categories: "/categories",
  coupons: "/coupons",
  settings: "/settings",
} as const;

export interface NavItem {
  href: string;
  label: string;
  icon: LucideIcon;
}

export const NAV_ITEMS: NavItem[] = [
  { href: Routes.dashboard, label: "Dashboard", icon: LayoutDashboard },
  { href: Routes.products, label: "Products", icon: Shirt },
  { href: Routes.orders, label: "Orders", icon: ShoppingBag },
  { href: Routes.customers, label: "Customers", icon: Users },
  { href: Routes.categories, label: "Categories", icon: Tags },
  { href: Routes.coupons, label: "Coupons", icon: TicketPercent },
  { href: Routes.settings, label: "Settings", icon: SettingsIcon },
];

export const DEMO_CREDENTIALS = { email: "admin@aavya.boutique", password: "Boutique@2026" } as const;

export const AUDIENCES: Audience[] = ["ladies", "girls", "boys", "kids-neutral"];
export const TAXONOMY_AUDIENCES: TaxonomyAudience[] = ["all", ...AUDIENCES];

export const LADY_SIZES = ["XS", "S", "M", "L", "XL", "XXL"];
export const KID_SIZES = ["1-2Y", "2-3Y", "3-4Y", "4-5Y", "5-6Y", "7-8Y", "9-10Y", "11-12Y"];

export const ORDER_STATUSES: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
/** The forward fulfilment path shown in the order stepper (cancelled is terminal). */
export const ORDER_PIPELINE: OrderStatus[] = ["pending", "confirmed", "shipped", "delivered"];

export const VIP_THRESHOLD = 15000;
export const GST_RATE = 0.05;

export const AUDIENCE_LABELS: Record<string, string> = {
  ladies: "Ladies",
  girls: "Girls",
  boys: "Boys",
  "kids-neutral": "Kids Neutral",
  all: "All Audiences",
};

export const STATUS_LABELS: Record<string, string> = {
  pending: "Pending",
  confirmed: "Confirmed",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

export const PAYMENT_LABELS: Record<string, string> = {
  upi: "UPI",
  cod: "Cash on Delivery",
  card: "Card",
  netbanking: "NetBanking",
};
