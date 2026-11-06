"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import OrderDetailSheet from "@/components/orders/OrderDetailSheet";
import OrdersTable from "@/components/orders/OrdersTable";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { ORDER_STATUSES, STATUS_LABELS } from "@/utils/Constants";
import { Layout } from "@/utils/Sizes";

export default function OrdersScreen() {
  const orders = useBoutiqueStore((s) => s.orders);
  const setOrderStatus = useBoutiqueStore((s) => s.setOrderStatus);
  const recordShipment = useBoutiqueStore((s) => s.recordShipment);
  const [tab, setTab] = useState("all");
  const [search, setSearch] = useState("");
  const [detailId, setDetailId] = useState<string | null>(null);

  const sorted = useMemo(() => [...orders].sort((a, b) => b.created_at.localeCompare(a.created_at)), [orders]);

  const counts = useMemo(() => {
    const c: Record<string, number> = {};
    for (const o of orders) c[o.status] = (c[o.status] ?? 0) + 1;
    return c;
  }, [orders]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return sorted.filter(
      (o) =>
        (tab === "all" || o.status === tab) &&
        (!q || [o.order_no, o.customer_name, o.customer_phone, o.customer_city].some((f) => f.toLowerCase().includes(q))),
    );
  }, [sorted, tab, search]);

  // Read the live order so the sheet reflects status changes immediately.
  const detail = detailId ? (orders.find((o) => o.id === detailId) ?? null) : null;

  return (
    <PageContainer>
      <PageHeader title="Orders" subtitle={`${orders.length} orders — from the boutique counter and online.`} />

      <Tabs value={tab} onValueChange={(v) => setTab(String(v))}>
        <TabsList>
          <TabsTrigger value="all">All</TabsTrigger>
          {ORDER_STATUSES.map((s) => (
            <TabsTrigger key={s} value={s}>
              {STATUS_LABELS[s]}
              {counts[s] ? ` (${counts[s]})` : ""}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className={Layout.toolbarCard}>
        <Input
          placeholder="Search by order ID, customer, phone or city…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md"
        />
      </div>

      <OrdersTable key={tab} orders={filtered} onView={(o) => setDetailId(o.id)} />

      <OrderDetailSheet
        order={detail}
        onClose={() => setDetailId(null)}
        onStatusChange={(order, status) => {
          setOrderStatus(order.id, status);
          toast.success(`Order marked ${STATUS_LABELS[status]}`);
        }}
        onShip={(order, courier, awb) => {
          recordShipment(order.id, courier, awb);
          setOrderStatus(order.id, "shipped");
          toast.success("Order marked Shipped");
        }}
      />
    </PageContainer>
  );
}
