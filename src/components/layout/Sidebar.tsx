"use client";

import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import Brand from "./Brand";
import SidebarNav from "./SidebarNav";

/** Fixed desktop sidebar: wordmark, navigation and the signed-in admin. */
export default function Sidebar() {
  const session = useBoutiqueStore((s) => s.session);

  return (
    <aside className="hidden w-64 flex-shrink-0 flex-col justify-between border-r border-sidebar-border bg-sidebar py-5 md:flex">
      <div className="space-y-7">
        <Brand />
        <SidebarNav />
      </div>
      <div className="border-t border-sidebar-border px-3 pt-4">
        <p className="truncate text-sm font-medium text-sidebar-foreground">{session?.name ?? "Admin"}</p>
        <p className="truncate text-xs text-sidebar-muted">{session?.email}</p>
      </div>
    </aside>
  );
}
