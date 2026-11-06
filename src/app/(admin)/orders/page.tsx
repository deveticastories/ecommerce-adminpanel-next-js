import type { Metadata } from "next";
import OrdersScreen from "@/screens/OrdersScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Orders" };

export default function OrdersPage() {
  return <OrdersScreen />;
}
