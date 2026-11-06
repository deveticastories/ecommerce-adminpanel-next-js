"use client";

import { useMemo } from "react";
import { useShallow } from "zustand/react/shallow";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { Customer, Order } from "@/types";

const byNewest = (a: Order, b: Order) => b.created_at.localeCompare(a.created_at);

/** Customers with order count, lifetime value and last order date (cancelled orders excluded). */
export function useCustomers(): Customer[] {
  const { customers, orders } = useBoutiqueStore(useShallow((s) => ({ customers: s.customers, orders: s.orders })));
  return useMemo(
    () =>
      customers
        .map((c) => {
          const live = orders.filter((o) => o.customer_id === c.id && o.status !== "cancelled").sort(byNewest);
          return {
            ...c,
            total_orders: live.length,
            lifetime_value: live.reduce((acc, o) => acc + o.total, 0),
            last_order_at: live[0]?.created_at ?? null,
          };
        })
        .sort((a, b) => b.lifetime_value - a.lifetime_value),
    [customers, orders],
  );
}

/** Every order a customer placed, newest first (including cancelled). */
export function useCustomerOrders(customerId: string | null): Order[] {
  const orders = useBoutiqueStore((s) => s.orders);
  return useMemo(
    () => (customerId ? orders.filter((o) => o.customer_id === customerId).sort(byNewest) : []),
    [orders, customerId],
  );
}
