"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { NAV_ITEMS } from "@/utils/Constants";
import { springSnappy } from "@/utils/Animations";
import { cn } from "@/utils/cn";

function isActive(pathname: string, href: string) {
  return href === "/" ? pathname === "/" : pathname === href || pathname.startsWith(`${href}/`);
}

/** Primary navigation. The active highlight glides between items. */
export default function SidebarNav({ onNavigate, layoutId = "nav-active" }: { onNavigate?: () => void; layoutId?: string }) {
  const pathname = usePathname();

  return (
    <nav className="flex flex-col gap-1">
      {NAV_ITEMS.map((item) => {
        const active = isActive(pathname, item.href);
        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex items-center gap-3 rounded-lg border-l-2 border-transparent px-3 py-2 text-sm font-medium transition-colors",
              active ? "text-sidebar-foreground" : "text-sidebar-muted hover:bg-sidebar-accent/60 hover:text-sidebar-foreground",
            )}
          >
            {active && (
              <motion.span
                layoutId={layoutId}
                transition={springSnappy}
                className="absolute inset-y-0 -left-0.5 right-0 rounded-lg border-l-2 border-brand-amber bg-sidebar-accent"
              />
            )}
            <item.icon className="relative h-4 w-4" />
            <span className="relative">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
