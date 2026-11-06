import type { Metadata } from "next";
import DashboardScreen from "@/screens/DashboardScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Dashboard" };

export default function DashboardPage() {
  return <DashboardScreen />;
}
