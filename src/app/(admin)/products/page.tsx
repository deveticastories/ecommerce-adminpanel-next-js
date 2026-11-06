import type { Metadata } from "next";
import ProductsScreen from "@/screens/ProductsScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Products" };

export default function ProductsPage() {
  return <ProductsScreen />;
}
