import type { Metadata } from "next";
import SettingsScreen from "@/screens/SettingsScreen";

// Client-rendered behind AuthGuard (see layout.tsx), so navigation intentionally blocks.
export const instant = false;

export const metadata: Metadata = { title: "Settings" };

export default function SettingsPage() {
  return <SettingsScreen />;
}
