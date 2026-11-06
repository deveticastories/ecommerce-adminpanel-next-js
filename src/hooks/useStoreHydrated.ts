"use client";

import { useSyncExternalStore } from "react";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";

const subscribe = (onChange: () => void) => useBoutiqueStore.persist.onFinishHydration(onChange);
const getSnapshot = () => useBoutiqueStore.persist.hasHydrated();
const getServerSnapshot = () => false;

/** True once the persisted store has been restored from localStorage. */
export function useStoreHydrated(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
