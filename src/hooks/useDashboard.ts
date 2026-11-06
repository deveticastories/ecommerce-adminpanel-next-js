"use client";

import { useMemo } from "react";
import { format, startOfDay, subDays } from "date-fns";
import { useShallow } from "zustand/react/shallow";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { DashboardData, LowStockVariant } from "@/types";
import { AUDIENCES, AUDIENCE_LABELS } from "@/utils/Constants";
import { Sizes } from "@/utils/Sizes";

/** Low-stock variants across the catalogue, emptiest first. */
export function useLowStock(): { count: number; items: LowStockVariant[] } {
  const { products, threshold } = useBoutiqueStore(
    useShallow((s) => ({ products: s.products, threshold: s.settings.low_stock_threshold })),
  );
  return useMemo(() => {
    // Oldest styles first, so equal-stock variants keep a stable catalogue order.
    const items = [...products]
      .sort((a, b) => a.created_at.localeCompare(b.created_at))
      .flatMap((p) =>
        p.variants
          .filter((v) => v.stock <= threshold)
          .map((v) => ({
            product_id: p.id,
            product_name: p.name,
            image: p.images[0] ?? "",
            size: v.size,
            color: v.color,
            stock: v.stock,
          })),
      )
      .sort((a, b) => a.stock - b.stock);
    return { count: items.length, items };
  }, [products, threshold]);
}

/** KPIs, 30-day revenue series, audience mix, low stock and recent orders. */
export function useDashboard(): DashboardData {
  const orders = useBoutiqueStore((s) => s.orders);
  const lowStock = useLowStock();

  return useMemo(() => {
    const days = Sizes.revenueWindowDays;
    const windowStart = startOfDay(subDays(new Date(), days - 1));
    const live = orders.filter((o) => o.status !== "cancelled" && new Date(o.created_at) >= windowStart);

    const series = Array.from({ length: days }, (_, i) => {
      const day = subDays(new Date(), days - 1 - i);
      return { key: format(day, "yyyy-MM-dd"), date: format(day, "dd MMM"), revenue: 0, orders: 0 };
    });
    const byKey = new Map(series.map((p) => [p.key, p]));
    const audience = new Map<string, number>();

    for (const o of live) {
      const point = byKey.get(format(new Date(o.created_at), "yyyy-MM-dd"));
      if (point) {
        point.revenue += o.total;
        point.orders += 1;
      }
      for (const it of o.items) audience.set(it.audience, (audience.get(it.audience) ?? 0) + it.unit_price * it.qty);
    }

    const revenue = live.reduce((acc, o) => acc + o.total, 0);
    return {
      kpis: {
        revenue_30d: revenue,
        orders_30d: live.length,
        aov: live.length ? revenue / live.length : 0,
        low_stock_count: lowStock.count,
      },
      revenue_series: series.map(({ date, revenue: r, orders: n }) => ({ date, revenue: Math.round(r * 100) / 100, orders: n })),
      audience_sales: AUDIENCES.map((a) => ({ audience: a, label: AUDIENCE_LABELS[a], revenue: audience.get(a) ?? 0 })).sort(
        (a, b) => b.revenue - a.revenue,
      ),
      low_stock: lowStock.items.slice(0, Sizes.lowStockListLimit),
      recent_orders: [...orders].sort((a, b) => b.created_at.localeCompare(a.created_at)).slice(0, Sizes.recentOrdersLimit),
    };
  }, [orders, lowStock]);
}
