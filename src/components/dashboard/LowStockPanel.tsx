"use client";

import { motion } from "motion/react";
import { AlertTriangle } from "lucide-react";
import ProductThumb from "@/components/common/ProductThumb";
import ToneBadge from "@/components/common/ToneBadge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { LowStockVariant } from "@/types";
import { fadeInUp, staggerContainer } from "@/utils/Animations";
import { Sizes } from "@/utils/Sizes";

/** Grid of variants at or below the threshold, each with a Restock action. */
export default function LowStockPanel({
  items,
  onRestock,
}: {
  items: LowStockVariant[];
  onRestock: (v: LowStockVariant) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <AlertTriangle className="h-4 w-4 text-amber-600" />
          Low Stock Variants
        </CardTitle>
        <CardDescription>At or below the shop threshold — restock before they sell out</CardDescription>
      </CardHeader>
      <CardContent>
        {items.length === 0 ? (
          <p className="text-sm text-muted-foreground">All variants are comfortably stocked.</p>
        ) : (
          <motion.div
            variants={staggerContainer(0.035, 0.15)}
            initial="hidden"
            animate="show"
            className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3"
          >
            {items.map((v) => (
              <motion.div
                key={`${v.product_id}-${v.size}-${v.color}`}
                variants={fadeInUp}
                layout
                className="flex items-center gap-3 rounded-xl border border-border bg-card p-3 transition-colors hover:border-primary/30"
              >
                <ProductThumb src={v.image} size={Sizes.thumb.md} />
                <div className="min-w-0 flex-1">
                  <p className="truncate text-sm font-medium">{v.product_name}</p>
                  <p className="text-xs text-muted-foreground">
                    {v.size} · {v.color}
                  </p>
                </div>
                <ToneBadge tone={v.stock === 0 ? "danger" : "warning"}>{v.stock === 0 ? "Sold out" : `${v.stock} left`}</ToneBadge>
                <Button size="xs" variant="outline" onClick={() => onRestock(v)}>
                  Restock
                </Button>
              </motion.div>
            ))}
          </motion.div>
        )}
      </CardContent>
    </Card>
  );
}
