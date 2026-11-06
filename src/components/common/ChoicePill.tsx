"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { cn } from "@/utils/cn";

/** Rounded toggle chip used for audience, size and colour pickers. */
export default function ChoicePill({
  selected,
  onClick,
  children,
}: {
  selected: boolean;
  onClick: () => void;
  children: ReactNode;
}) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      whileTap={{ scale: 0.95 }}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
        selected
          ? "border-primary bg-accent text-accent-foreground"
          : "border-border text-muted-foreground hover:border-primary/40",
      )}
    >
      {children}
    </motion.button>
  );
}
