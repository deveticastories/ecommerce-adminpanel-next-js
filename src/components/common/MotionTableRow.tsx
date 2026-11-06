"use client";

import { motion } from "motion/react";
import { TableRow } from "@/components/ui/table";
import { rowReveal } from "@/utils/Animations";

const MotionRow = motion.create(TableRow);

/** Table row that fades in as part of a staggered table body. */
export default function MotionTableRow(props: React.ComponentProps<typeof MotionRow>) {
  return <MotionRow variants={rowReveal} {...props} />;
}
