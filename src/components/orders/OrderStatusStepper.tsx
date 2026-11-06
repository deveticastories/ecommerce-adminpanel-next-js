"use client";

import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { OrderStatus } from "@/types";
import { ORDER_PIPELINE, STATUS_LABELS } from "@/utils/Constants";
import { cn } from "@/utils/cn";

/** Pending → Confirmed → Shipped → Delivered, with the completed path filled in plum. */
export default function OrderStatusStepper({ status }: { status: OrderStatus }) {
  if (status === "cancelled") {
    return (
      <div className="rounded-xl border border-rose-200 bg-rose-50/60 p-4 text-sm font-medium text-rose-800">
        This order was cancelled — no further transitions.
      </div>
    );
  }
  const idx = ORDER_PIPELINE.indexOf(status);

  return (
    <div className="flex items-center">
      {ORDER_PIPELINE.map((step, i) => {
        const done = i <= idx;
        return (
          <div key={step} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-1">
              <motion.span
                initial={false}
                animate={{ scale: done ? [0.85, 1.08, 1] : 1 }}
                transition={{ duration: 0.35, delay: i * 0.06 }}
                className={cn(
                  "grid h-7 w-7 place-items-center rounded-full border text-xs font-semibold transition-colors duration-300",
                  done ? "border-primary bg-primary text-white" : "border-border bg-card text-muted-foreground",
                )}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </motion.span>
              <span
                className={cn(
                  "text-[10px] font-semibold uppercase tracking-wider transition-colors",
                  done ? "text-primary" : "text-muted-foreground",
                )}
              >
                {STATUS_LABELS[step]}
              </span>
            </div>
            {i < ORDER_PIPELINE.length - 1 && (
              <span className="relative mx-2 mb-4 h-px flex-1 overflow-hidden bg-border">
                <motion.span
                  className="absolute inset-0 origin-left bg-primary"
                  initial={false}
                  animate={{ scaleX: i < idx ? 1 : 0 }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                />
              </span>
            )}
          </div>
        );
      })}
    </div>
  );
}
