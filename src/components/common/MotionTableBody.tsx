"use client";

import { motion } from "motion/react";
import { TableBody } from "@/components/ui/table";
import { staggerContainer } from "@/utils/Animations";

const MotionBody = motion.create(TableBody);

/** Table body that reveals its rows one after another on mount. */
export default function MotionTableBody(props: React.ComponentProps<typeof MotionBody>) {
  return <MotionBody variants={staggerContainer(0.03)} initial="hidden" animate="show" {...props} />;
}
