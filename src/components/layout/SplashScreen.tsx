"use client";

import { motion } from "motion/react";

/** Branded holding screen shown while the session is restored. */
export default function SplashScreen() {
  return (
    <div className="flex min-h-svh items-center justify-center bg-background">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="text-center"
      >
        <p className="font-heading text-4xl tracking-tight text-primary">Aavya</p>
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.25em] text-stone-500">
          Heritage &amp; Bachpan Atelier
        </p>
      </motion.div>
    </div>
  );
}
