"use client";

import { motion } from "motion/react";
import { MapPin, Phone } from "lucide-react";
import SectionLabel from "@/components/common/SectionLabel";
import StatusBadge from "@/components/common/StatusBadge";
import { Card } from "@/components/ui/card";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { useCustomerOrders } from "@/hooks/useCustomers";
import type { Customer } from "@/types";
import { fadeInUp, staggerContainer } from "@/utils/Animations";
import { fmtDate, inr } from "@/utils/Format";
import { Typography } from "@/utils/Fonts";
import { Layout } from "@/utils/Sizes";

/** Patron profile: headline stats, address and full order history. */
export default function CustomerDetailSheet({ customer, onClose }: { customer: Customer | null; onClose: () => void }) {
  const orders = useCustomerOrders(customer?.id ?? null);

  return (
    <Sheet open={customer !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-lg">
        <SheetHeader>
          <SheetTitle className={Typography.sheetTitle}>{customer?.name ?? "Customer"}</SheetTitle>
          <SheetDescription>
            {customer?.email} · {customer?.phone}
          </SheetDescription>
        </SheetHeader>

        {customer && (
          <motion.div key={customer.id} variants={staggerContainer(0.06)} initial="hidden" animate="show" className={Layout.sheetBody}>
            <motion.section variants={fadeInUp} className="grid grid-cols-3 gap-3">
              {[
                { label: "Orders", value: String(customer.total_orders) },
                { label: "Lifetime value", value: inr(customer.lifetime_value) },
                { label: "Last order", value: fmtDate(customer.last_order_at) },
              ].map((s) => (
                <Card key={s.label} size="sm">
                  <div className="p-3">
                    <p className={Typography.eyebrow}>{s.label}</p>
                    <p className="mt-1 font-mono text-sm font-semibold">{s.value}</p>
                  </div>
                </Card>
              ))}
            </motion.section>

            <motion.section variants={fadeInUp} className={`text-sm ${Layout.panel}`}>
              <p className="inline-flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                <span>{customer.address}</span>
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-muted-foreground">
                <Phone className="h-3.5 w-3.5" />
                {customer.phone}
              </p>
            </motion.section>

            <motion.section variants={fadeInUp} className="space-y-3">
              <SectionLabel>Order history</SectionLabel>
              <div className="space-y-2">
                {orders.map((o) => (
                  <div key={o.id} className="flex items-center justify-between gap-3 rounded-xl border border-border p-3">
                    <div className="min-w-0">
                      <p className="font-mono text-sm font-medium">#{o.order_no}</p>
                      <p className="text-xs text-muted-foreground">
                        {fmtDate(o.created_at)} · {o.items.reduce((acc, it) => acc + it.qty, 0)} items
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <StatusBadge status={o.status} />
                      <span className="font-mono text-sm font-semibold">{inr(o.total)}</span>
                    </div>
                  </div>
                ))}
                {orders.length === 0 && <p className="text-sm text-muted-foreground">No orders yet from this patron.</p>}
              </div>
            </motion.section>
          </motion.div>
        )}
      </SheetContent>
    </Sheet>
  );
}
