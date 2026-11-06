import type { Metadata } from "next";
import CustomersScreen from "@/screens/CustomersScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Customers" };

export default function CustomersPage() {
  return <CustomersScreen />;
}
