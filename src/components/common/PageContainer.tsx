"use client";

import type { ReactNode } from "react";
import { motion } from "motion/react";
import { pageTransition } from "@/utils/Animations";
import { cn } from "@/utils/cn";
import { Layout } from "@/utils/Sizes";

/** Animated page wrapper with the standard admin width and padding. */
export default function PageContainer({
  children,
  narrow = false,
  className,
}: {
  children: ReactNode;
  narrow?: boolean;
  className?: string;
}) {
  return (
    <motion.div {...pageTransition} className={cn(narrow ? Layout.pageNarrow : Layout.page, className)}>
      {children}
    </motion.div>
  );
}
