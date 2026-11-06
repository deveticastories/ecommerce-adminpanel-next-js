"use client";

import Image from "next/image";
import { motion } from "motion/react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import type { Product } from "@/types";
import { fadeInUp, hoverLift, staggerContainer } from "@/utils/Animations";
import { AUDIENCE_LABELS } from "@/utils/Constants";
import { inr, stockChip } from "@/utils/Format";
import RowActions from "@/components/common/RowActions";

const MotionCard = motion.create(Card);

/** Lookbook view: 4:5 photo cards that lift on hover. */
export default function ProductGrid({
  products,
  threshold,
  onEdit,
  onDelete,
}: {
  products: Product[];
  threshold: number;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  if (products.length === 0) {
    return <p className="py-10 text-center text-sm text-muted-foreground">No products match these filters yet.</p>;
  }
  return (
    <motion.div
      variants={staggerContainer(0.05)}
      initial="hidden"
      animate="show"
      className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
    >
      {products.map((p) => {
        const chip = stockChip(p.total_stock, threshold);
        return (
          <MotionCard key={p.id} variants={fadeInUp} {...hoverLift} className="group overflow-hidden transition-shadow hover:shadow-lg">
            <div className="relative aspect-[4/5] w-full overflow-hidden bg-muted">
              {p.images[0] && (
                <Image
                  src={p.images[0]}
                  alt={p.name}
                  fill
                  sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                  unoptimized={!p.images[0].startsWith("/")}
                  className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
                />
              )}
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-start justify-between gap-2">
                <p className="line-clamp-1 text-sm font-semibold">{p.name}</p>
                <span className="font-mono text-sm font-semibold">{inr(p.price)}</span>
              </div>
              <p className="text-xs text-muted-foreground">
                {p.category_name || "Uncategorised"} · {AUDIENCE_LABELS[p.audience]}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <Badge variant="outline" className={chip.className}>
                  {chip.label} · {p.total_stock}
                </Badge>
                <RowActions onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} />
              </div>
            </div>
          </MotionCard>
        );
      })}
    </motion.div>
  );
}
