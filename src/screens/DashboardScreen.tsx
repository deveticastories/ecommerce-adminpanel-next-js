"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { AlertTriangle, IndianRupee, ShoppingBag, TrendingUp } from "lucide-react";
import { toast } from "sonner";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import AudienceChart from "@/components/dashboard/AudienceChart";
import KpiCard from "@/components/dashboard/KpiCard";
import LowStockPanel from "@/components/dashboard/LowStockPanel";
import RecentOrdersCard from "@/components/dashboard/RecentOrdersCard";
import RestockDialog from "@/components/dashboard/RestockDialog";
import RevenueChart from "@/components/dashboard/RevenueChart";
import { useDashboard } from "@/hooks/useDashboard";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { LowStockVariant } from "@/types";
import { staggerContainer } from "@/utils/Animations";
import { STATUS_LABELS } from "@/utils/Constants";
import { inr } from "@/utils/Format";

const count = (n: number) => String(Math.round(n));
const variants = (n: number) => `${Math.round(n)} variants`;

export default function DashboardScreen() {
  const data = useDashboard();
  const restockVariant = useBoutiqueStore((s) => s.restockVariant);
  const setOrderStatus = useBoutiqueStore((s) => s.setOrderStatus);
  const [restockTarget, setRestockTarget] = useState<LowStockVariant | null>(null);
  const k = data.kpis;

  return (
    <PageContainer>
      <PageHeader title="Dashboard" subtitle="The boutique at a glance — last 30 days." />

      <motion.div
        variants={staggerContainer(0.07)}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-5 lg:grid-cols-4"
      >
        <KpiCard title="Revenue (30 days)" value={k.revenue_30d} format={inr} trend="All prepaid + COD, net of cancels" icon={IndianRupee} />
        <KpiCard title="Orders (30 days)" value={k.orders_30d} format={count} trend="Pending, shipped & delivered" icon={ShoppingBag} />
        <KpiCard title="Avg Order Value" value={k.aov} format={inr} trend="Festive basket sizes look healthy" icon={TrendingUp} />
        <KpiCard
          title="Low Stock Alerts"
          value={k.low_stock_count}
          format={variants}
          trend="Needs replenishment soon"
          icon={AlertTriangle}
          tone="rose"
        />
      </motion.div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <RevenueChart data={data.revenue_series} className="lg:col-span-2" />
        <AudienceChart data={data.audience_sales} />
      </div>

      <LowStockPanel items={data.low_stock} onRestock={setRestockTarget} />

      <RecentOrdersCard
        orders={data.recent_orders}
        onStatusChange={(order, status) => {
          setOrderStatus(order.id, status);
          toast.success(`Order marked ${STATUS_LABELS[status]}`);
        }}
      />

      <RestockDialog
        target={restockTarget}
        onClose={() => setRestockTarget(null)}
        onSave={(v, stock) => {
          restockVariant(v.product_id, v.size, v.color, stock);
          toast.success(`Restocked ${v.size} · ${v.color} to ${stock} units`);
          setRestockTarget(null);
        }}
      />
    </PageContainer>
  );
}
