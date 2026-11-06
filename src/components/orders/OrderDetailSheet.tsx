"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { MapPin, Truck } from "lucide-react";
import ProductThumb from "@/components/common/ProductThumb";
import SectionLabel from "@/components/common/SectionLabel";
import StatusBadge from "@/components/common/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import type { Order, OrderStatus } from "@/types";
import { fadeInUp, staggerContainer } from "@/utils/Animations";
import { PAYMENT_LABELS } from "@/utils/Constants";
import { fmtDateTime, inr } from "@/utils/Format";
import { Typography } from "@/utils/Fonts";
import { Layout, Sizes } from "@/utils/Sizes";
import OrderStatusStepper from "./OrderStatusStepper";

/** Order detail: customer, line items, totals and fulfilment actions. */
export default function OrderDetailSheet({
  order,
  onClose,
  onStatusChange,
  onShip,
}: {
  order: Order | null;
  onClose: () => void;
  onStatusChange: (order: Order, status: OrderStatus) => void;
  onShip: (order: Order, courier: string, awb: string) => void;
}) {
  return (
    <Sheet open={order !== null} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-xl">
        <SheetHeader>
          <SheetTitle className={`flex items-center gap-3 ${Typography.sheetTitle}`}>
            #{order?.order_no ?? ""}
            {order && <StatusBadge status={order.status} />}
          </SheetTitle>
          <SheetDescription>{order ? fmtDateTime(order.created_at) : ""}</SheetDescription>
        </SheetHeader>
        {order && <OrderDetailBody key={order.id} order={order} onStatusChange={onStatusChange} onShip={onShip} />}
      </SheetContent>
    </Sheet>
  );
}

function Line({ label, value, className }: { label: string; value: string; className?: string }) {
  return (
    <div className={`flex justify-between ${className ?? ""}`}>
      <span className={className ? undefined : "text-muted-foreground"}>{label}</span>
      <span className="font-mono">{value}</span>
    </div>
  );
}

function OrderDetailBody({
  order,
  onStatusChange,
  onShip,
}: {
  order: Order;
  onStatusChange: (order: Order, status: OrderStatus) => void;
  onShip: (order: Order, courier: string, awb: string) => void;
}) {
  const [shipOpen, setShipOpen] = useState(false);
  const [courier, setCourier] = useState(order.courier);
  const [awb, setAwb] = useState(order.awb);
  const canCancel = ["pending", "confirmed", "shipped"].includes(order.status);

  return (
    <motion.div variants={staggerContainer(0.06)} initial="hidden" animate="show" className={Layout.sheetBody}>
      <motion.section variants={fadeInUp} className={Layout.panel}>
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-sm font-semibold">{order.customer_name}</p>
            <p className="font-mono text-xs text-muted-foreground">{order.customer_phone}</p>
          </div>
          <p className="inline-flex items-center gap-1 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" />
            {order.customer_city}
          </p>
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className="space-y-3">
        <SectionLabel>Items</SectionLabel>
        <div className="space-y-3">
          {order.items.map((it, i) => (
            <div key={`${it.product_id}-${it.size}-${it.color}-${i}`} className="flex items-center gap-3">
              <ProductThumb src={it.image} size={Sizes.thumb.lg} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{it.product_name}</p>
                <p className="text-xs text-muted-foreground">
                  {it.size} · {it.color} · Qty {it.qty}
                </p>
              </div>
              <span className="font-mono text-sm font-semibold">{inr(it.unit_price * it.qty)}</span>
            </div>
          ))}
        </div>
      </motion.section>

      <motion.section variants={fadeInUp} className={`space-y-1.5 text-sm ${Layout.panel}`}>
        <Line label="Subtotal" value={inr(order.subtotal)} />
        {order.discount > 0 && (
          <Line
            label={`Discount ${order.coupon_code ? `(${order.coupon_code})` : ""}`}
            value={`−${inr(order.discount)}`}
            className="text-emerald-700"
          />
        )}
        <Line label="Shipping" value={order.shipping_fee === 0 ? "Free" : inr(order.shipping_fee)} />
        <Line label="GST (5%)" value={inr(order.tax)} />
        <div className="flex justify-between border-t border-border pt-2 text-base font-semibold">
          <span>Total payable</span>
          <span className="font-mono">{inr(order.total)}</span>
        </div>
        <p className="pt-1 text-xs text-muted-foreground">Paid via {PAYMENT_LABELS[order.payment_method] ?? order.payment_method}</p>
      </motion.section>

      <motion.section variants={fadeInUp} className="space-y-4">
        <SectionLabel>Fulfilment</SectionLabel>
        <OrderStatusStepper status={order.status} />

        {["shipped", "delivered"].includes(order.status) && (order.courier || order.awb) && (
          <p className="inline-flex items-center gap-2 rounded-lg bg-muted px-3 py-2 text-xs">
            <Truck className="h-3.5 w-3.5" />
            {order.courier || "Courier"} · AWB {order.awb || "—"}
          </p>
        )}

        <AnimatePresence initial={false}>
          {shipOpen && order.status === "confirmed" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <div className={`space-y-3 ${Layout.panel}`}>
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <Label htmlFor="courier">Courier partner</Label>
                    <Input id="courier" value={courier} onChange={(e) => setCourier(e.target.value)} placeholder="Delhivery" />
                  </div>
                  <div className="space-y-1.5">
                    <Label htmlFor="awb">AWB tracking #</Label>
                    <Input id="awb" value={awb} onChange={(e) => setAwb(e.target.value)} placeholder="DLV-88213" />
                  </div>
                </div>
                <Button
                  size="sm"
                  onClick={() => {
                    onShip(order, courier.trim(), awb.trim());
                    setShipOpen(false);
                  }}
                >
                  Save &amp; mark shipped
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex flex-wrap gap-2">
          {order.status === "pending" && (
            <Button size="sm" onClick={() => onStatusChange(order, "confirmed")}>
              Confirm order
            </Button>
          )}
          {order.status === "confirmed" && !shipOpen && (
            <Button size="sm" onClick={() => setShipOpen(true)}>
              Mark shipped
            </Button>
          )}
          {order.status === "shipped" && (
            <Button size="sm" onClick={() => onStatusChange(order, "delivered")}>
              Mark delivered
            </Button>
          )}
          {canCancel && (
            <Button
              size="sm"
              variant="outline"
              className="border-rose-200 text-rose-700 hover:bg-rose-50 hover:text-rose-800"
              onClick={() => onStatusChange(order, "cancelled")}
            >
              Cancel order
            </Button>
          )}
        </div>
      </motion.section>
    </motion.div>
  );
}
