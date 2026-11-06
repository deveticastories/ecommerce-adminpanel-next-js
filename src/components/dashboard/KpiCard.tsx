"use client";

import { motion } from "motion/react";
import type { LucideIcon } from "lucide-react";
import AnimatedNumber from "@/components/common/AnimatedNumber";
import { Card, CardContent } from "@/components/ui/card";
import { fadeInUp, hoverLift } from "@/utils/Animations";
import { cn } from "@/utils/cn";

const MotionCard = motion.create(Card);

/** Headline metric with a count-up value and a tinted icon tile. */
export default function KpiCard({
  title,
  value,
  format,
  trend,
  icon: Icon,
  tone = "plum",
}: {
  title: string;
  value: number;
  format: (n: number) => string;
  trend: string;
  icon: LucideIcon;
  tone?: "plum" | "rose";
}) {
  return (
    <MotionCard variants={fadeInUp} {...hoverLift} className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</p>
          <p className="mt-2 truncate font-mono text-2xl font-semibold tracking-tight">
            <AnimatedNumber value={value} format={format} />
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{trend}</p>
        </div>
        <div
          className={cn(
            "grid h-10 w-10 flex-shrink-0 place-items-center rounded-xl",
            tone === "rose"
              ? "bg-rose-50 text-rose-700 dark:bg-rose-950/50 dark:text-rose-300"
              : "bg-accent text-primary",
          )}
        >
          <Icon className="h-5 w-5" />
        </div>
      </CardContent>
    </MotionCard>
  );
}
