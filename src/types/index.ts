// Domain models for the boutique admin. `*Record` / `*Profile` types are what the store
// persists; the richer types add fields derived at read time (names, totals, aggregates).

export type Audience = "ladies" | "girls" | "boys" | "kids-neutral";
export type TaxonomyAudience = Audience | "all";
export type ProductStatus = "active" | "draft";
export type OrderStatus = "pending" | "confirmed" | "shipped" | "delivered" | "cancelled";
export type PaymentMethod = "upi" | "cod" | "card" | "netbanking";
export type DiscountType = "percent" | "flat";

export interface AdminUser {
  id: string;
  email: string;
  name: string;
}

export interface Variant {
  size: string;
  color: string;
  stock: number;
  sku: string;
}

export interface ProductRecord {
  id: string;
  name: string;
  sku: string;
  description: string;
  category_id: string;
  collection_id: string;
  audience: Audience;
  price: number;
  cost_price: number;
  images: string[];
  variants: Variant[];
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

export interface Product extends ProductRecord {
  category_name: string;
  collection_name: string;
  total_stock: number;
}

export type ProductInput = Omit<ProductRecord, "id" | "created_at" | "updated_at">;

export interface OrderItem {
  product_id: string;
  product_name: string;
  image: string;
  size: string;
  color: string;
  qty: number;
  unit_price: number;
  audience: string;
}

export interface Order {
  id: string;
  order_no: string;
  customer_id: string;
  customer_name: string;
  customer_phone: string;
  customer_city: string;
  items: OrderItem[];
  subtotal: number;
  discount: number;
  coupon_code: string;
  shipping_fee: number;
  tax: number;
  total: number;
  payment_method: PaymentMethod;
  status: OrderStatus;
  courier: string;
  awb: string;
  created_at: string;
  updated_at: string;
}

export interface CustomerProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  city: string;
  state: string;
  address: string;
}

export interface Customer extends CustomerProfile {
  total_orders: number;
  lifetime_value: number;
  last_order_at: string | null;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  audience: TaxonomyAudience;
  description: string;
  active: boolean;
  created_at: string;
}

export interface Collection {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  created_at: string;
}

export interface TaxonomyInput {
  name: string;
  description: string;
  audience: TaxonomyAudience;
  active: boolean;
}

export interface Coupon {
  id: string;
  code: string;
  discount_type: DiscountType;
  value: number;
  min_order_value: number;
  /** yyyy-MM-dd, or "" for no expiry. */
  expiry: string;
  usage_limit: number;
  times_used: number;
  active: boolean;
  created_at: string;
}

export type CouponInput = Omit<Coupon, "id" | "times_used" | "created_at">;

export interface ShopSettings {
  id: string;
  store_name: string;
  tagline: string;
  phone: string;
  email: string;
  gstin: string;
  address: string;
  low_stock_threshold: number;
  shipping_fee: number;
  free_shipping_above: number;
}

export interface Kpis {
  revenue_30d: number;
  orders_30d: number;
  aov: number;
  low_stock_count: number;
}

export interface RevenuePoint {
  date: string;
  revenue: number;
  orders: number;
}

export interface AudiencePoint {
  audience: string;
  label: string;
  revenue: number;
}

export interface LowStockVariant {
  product_id: string;
  product_name: string;
  image: string;
  size: string;
  color: string;
  stock: number;
}

export interface DashboardData {
  kpis: Kpis;
  revenue_series: RevenuePoint[];
  audience_sales: AudiencePoint[];
  low_stock: LowStockVariant[];
  recent_orders: Order[];
}

/** Result of a store write that can be rejected (duplicate names, wrong password…). */
export type ActionResult = { ok: true } | { ok: false; error: string };
