"use client";

import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import {
  SEED_ADMIN,
  SEED_ADMIN_PASSWORD,
  SEED_CATEGORIES,
  SEED_COLLECTIONS,
  SEED_COUPONS,
  SEED_CUSTOMERS,
  SEED_ORDERS,
  SEED_PRODUCTS,
  SEED_SETTINGS,
} from "@/data/seed";
import type {
  ActionResult,
  AdminUser,
  Category,
  Collection,
  Coupon,
  CouponInput,
  CustomerProfile,
  Order,
  OrderStatus,
  ProductInput,
  ProductRecord,
  ShopSettings,
  TaxonomyInput,
} from "@/types";
import { newId, slugify } from "@/utils/Format";

// Client-side data layer for the demo boutique. Everything persists to localStorage, so edits
// survive reloads. Swap the action bodies for API calls when a backend is available — screens
// only talk to this store and the derived hooks in src/hooks.

interface BoutiqueData {
  admin: AdminUser;
  password: string;
  session: AdminUser | null;
  settings: ShopSettings;
  categories: Category[];
  collections: Collection[];
  products: ProductRecord[];
  customers: CustomerProfile[];
  orders: Order[];
  coupons: Coupon[];
}

interface BoutiqueActions {
  login: (email: string, password: string) => ActionResult;
  logout: () => void;
  changePassword: (current: string, next: string) => ActionResult;

  /** Ask the Products screen to open the "Add product" sheet (used by the header button). */
  requestNewProduct: () => void;
  consumeNewProductRequest: () => boolean;

  saveProduct: (input: ProductInput, id?: string) => ActionResult;
  deleteProduct: (id: string) => void;
  restockVariant: (productId: string, size: string, color: string, stock: number) => void;

  setOrderStatus: (id: string, status: OrderStatus) => void;
  recordShipment: (id: string, courier: string, awb: string) => void;

  saveCategory: (input: TaxonomyInput, id?: string) => ActionResult;
  deleteCategory: (id: string) => void;
  saveCollection: (input: TaxonomyInput, id?: string) => ActionResult;
  deleteCollection: (id: string) => void;

  saveCoupon: (input: CouponInput, id?: string) => ActionResult;
  toggleCoupon: (id: string) => void;
  deleteCoupon: (id: string) => void;

  saveSettings: (settings: Omit<ShopSettings, "id">) => void;
}

type BoutiqueState = BoutiqueData & BoutiqueActions & { pendingNewProduct: boolean };

const now = () => new Date().toISOString();

function seedData(): BoutiqueData {
  return {
    admin: SEED_ADMIN,
    password: SEED_ADMIN_PASSWORD,
    session: null,
    settings: SEED_SETTINGS,
    categories: SEED_CATEGORIES,
    collections: SEED_COLLECTIONS,
    products: SEED_PRODUCTS,
    customers: SEED_CUSTOMERS,
    orders: SEED_ORDERS,
    coupons: SEED_COUPONS,
  };
}

function slugTaken<T extends { id: string; slug: string }>(rows: T[], slug: string, id?: string) {
  return rows.some((r) => r.slug === slug && r.id !== id);
}

export const useBoutiqueStore = create<BoutiqueState>()(
  persist(
    (set, get) => ({
      ...seedData(),
      pendingNewProduct: false,

      login: (email, password) => {
        const { admin, password: stored } = get();
        if (email.trim().toLowerCase() !== admin.email || password !== stored) {
          return { ok: false, error: "Invalid email or password" };
        }
        set({ session: admin });
        return { ok: true };
      },
      logout: () => set({ session: null }),
      changePassword: (current, next) => {
        if (current !== get().password) return { ok: false, error: "Current password is incorrect" };
        set({ password: next });
        return { ok: true };
      },

      requestNewProduct: () => set({ pendingNewProduct: true }),
      consumeNewProductRequest: () => {
        const pending = get().pendingNewProduct;
        if (pending) set({ pendingNewProduct: false });
        return pending;
      },

      saveProduct: (input, id) => {
        const { products } = get();
        if (products.some((p) => p.sku === input.sku && p.id !== id)) {
          return { ok: false, error: `SKU ${input.sku} is already in use` };
        }
        if (id) {
          set({ products: products.map((p) => (p.id === id ? { ...p, ...input, updated_at: now() } : p)) });
        } else {
          const record: ProductRecord = { ...input, id: newId(), created_at: now(), updated_at: now() };
          set({ products: [record, ...products] });
        }
        return { ok: true };
      },
      deleteProduct: (id) => set({ products: get().products.filter((p) => p.id !== id) }),
      restockVariant: (productId, size, color, stock) =>
        set({
          products: get().products.map((p) =>
            p.id !== productId
              ? p
              : {
                  ...p,
                  updated_at: now(),
                  variants: p.variants.map((v) => (v.size === size && v.color === color ? { ...v, stock } : v)),
                },
          ),
        }),

      setOrderStatus: (id, status) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, status, updated_at: now() } : o)) }),
      recordShipment: (id, courier, awb) =>
        set({ orders: get().orders.map((o) => (o.id === id ? { ...o, courier, awb, updated_at: now() } : o)) }),

      saveCategory: (input, id) => {
        const { categories } = get();
        const slug = slugify(input.name);
        if (!slug || slugTaken(categories, slug, id)) return { ok: false, error: "Could not save — check the name" };
        if (id) {
          set({ categories: categories.map((c) => (c.id === id ? { ...c, ...input, slug } : c)) });
        } else {
          set({ categories: [...categories, { ...input, id: newId(), slug, created_at: now() }] });
        }
        return { ok: true };
      },
      deleteCategory: (id) =>
        set({
          categories: get().categories.filter((c) => c.id !== id),
          products: get().products.map((p) => (p.category_id === id ? { ...p, category_id: "" } : p)),
        }),
      saveCollection: (input, id) => {
        const { collections } = get();
        const slug = slugify(input.name);
        if (!slug || slugTaken(collections, slug, id)) return { ok: false, error: "Could not save — check the name" };
        const { name, description, active } = input;
        if (id) {
          set({ collections: collections.map((c) => (c.id === id ? { ...c, name, description, active, slug } : c)) });
        } else {
          set({ collections: [...collections, { id: newId(), name, description, active, slug, created_at: now() }] });
        }
        return { ok: true };
      },
      deleteCollection: (id) =>
        set({
          collections: get().collections.filter((c) => c.id !== id),
          products: get().products.map((p) => (p.collection_id === id ? { ...p, collection_id: "" } : p)),
        }),

      saveCoupon: (input, id) => {
        const { coupons } = get();
        if (coupons.some((c) => c.code === input.code && c.id !== id)) {
          return { ok: false, error: `Code ${input.code} already exists` };
        }
        if (id) {
          set({ coupons: coupons.map((c) => (c.id === id ? { ...c, ...input } : c)) });
        } else {
          set({ coupons: [{ ...input, id: newId(), times_used: 0, created_at: now() }, ...coupons] });
        }
        return { ok: true };
      },
      toggleCoupon: (id) => set({ coupons: get().coupons.map((c) => (c.id === id ? { ...c, active: !c.active } : c)) }),
      deleteCoupon: (id) => set({ coupons: get().coupons.filter((c) => c.id !== id) }),

      saveSettings: (settings) => set({ settings: { ...get().settings, ...settings } }),
    }),
    {
      name: "aavya-admin",
      version: 1,
      storage: createJSONStorage(() => localStorage),
      // Rehydrated from AppProviders after mount so the server and first client render agree.
      skipHydration: true,
      // Actions are dropped by JSON serialisation; the one-shot UI flag is never persisted.
      partialize: (state) => ({ ...state, pendingNewProduct: false }),
    },
  ),
);
