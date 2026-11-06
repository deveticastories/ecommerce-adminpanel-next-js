import type { Metadata } from "next";
import CategoriesScreen from "@/screens/CategoriesScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Categories & Collections" };

export default function CategoriesPage() {
  return <CategoriesScreen />;
}
