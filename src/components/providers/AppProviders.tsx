"use client";

import { useEffect, type ReactNode } from "react";
import { MotionConfig } from "motion/react";
import { ThemeProvider } from "next-themes";
import { Toaster } from "@/components/ui/sonner";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

/** Theme (class-based, light by default), motion preferences, store hydration and toasts. */
export default function AppProviders({ children }: { children: ReactNode }) {
  useEffect(() => {
    void useBoutiqueStore.persist.rehydrate();
  }, []);

  return (
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem={false} disableTransitionOnChange>
      <MotionConfig reducedMotion="user">
        {children}
        <Toaster />
      </MotionConfig>
    </ThemeProvider>
  );
}
