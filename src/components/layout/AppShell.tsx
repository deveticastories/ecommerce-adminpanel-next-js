import type { ReactNode } from "react";
import Sidebar from "./Sidebar";
import TopBar from "./TopBar";

/** Admin frame: fixed sidebar on the left, scrolling column with the sticky header on the right. */
export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col overflow-y-auto">
        <TopBar />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}
