"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useStoreHydrated } from "@/hooks/useStoreHydrated";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { Routes } from "@/utils/Constants";
import SplashScreen from "./SplashScreen";

/** Admin gate: splash while the session loads, redirect to /login when signed out. */
export default function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const hydrated = useStoreHydrated();
  const session = useBoutiqueStore((s) => s.session);

  useEffect(() => {
    if (hydrated && !session) router.replace(Routes.login);
  }, [hydrated, session, router]);

  if (!hydrated || !session) return <SplashScreen />;
  return <>{children}</>;
}
