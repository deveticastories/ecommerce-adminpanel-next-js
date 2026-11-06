import type { Metadata } from "next";
import CouponsScreen from "@/screens/CouponsScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Coupons" };

export default function CouponsPage() {
  return <CouponsScreen />;
}
