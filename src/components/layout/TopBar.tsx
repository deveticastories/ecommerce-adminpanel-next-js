"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { useTheme } from "next-themes";
import { Bell, LogOut, Moon, Plus, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useLowStock } from "@/hooks/useDashboard";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import { Routes } from "@/utils/Constants";
import { initials } from "@/utils/Format";
import MobileNav from "./MobileNav";

/** Sticky frosted header: store identity, low-stock bell, quick add, theme and account menu. */
export default function TopBar() {
  const router = useRouter();
  const { resolvedTheme, setTheme } = useTheme();
  const session = useBoutiqueStore((s) => s.session);
  const settings = useBoutiqueStore((s) => s.settings);
  const logout = useBoutiqueStore((s) => s.logout);
  const requestNewProduct = useBoutiqueStore((s) => s.requestNewProduct);
  const lowStock = useLowStock().count;
  const isDark = resolvedTheme === "dark";

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between gap-3 border-b border-border bg-card/90 px-4 backdrop-blur-md md:px-6">
      <div className="flex min-w-0 items-center gap-2">
        <MobileNav />
        <div className="min-w-0">
          <p className="truncate font-heading text-lg tracking-tight">{settings.store_name || "Aavya Boutique"}</p>
          <p className="hidden truncate text-xs text-muted-foreground sm:block">{settings.tagline || "Ladies & kids garments"}</p>
        </div>
      </div>

      <div className="flex flex-shrink-0 items-center gap-1.5">
        <Link
          href={Routes.dashboard}
          title={`${lowStock} low-stock variants`}
          className="relative grid h-9 w-9 place-items-center rounded-lg text-stone-600 transition-colors hover:bg-muted dark:text-stone-300"
        >
          <Bell className="h-[18px] w-[18px]" />
          <AnimatePresence>
            {lowStock > 0 && (
              <motion.span
                key={lowStock}
                initial={{ scale: 0.4, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.4, opacity: 0 }}
                transition={{ type: "spring", stiffness: 500, damping: 22 }}
                className="absolute -right-0.5 -top-0.5 grid h-4 min-w-4 place-items-center rounded-full bg-brand-plum px-1 text-[10px] font-semibold text-white"
              >
                {lowStock}
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
        <Button
          size="sm"
          className="hidden sm:inline-flex"
          onClick={() => {
            requestNewProduct();
            router.push(Routes.products);
          }}
        >
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
        <Button variant="ghost" size="icon" onClick={() => setTheme(isDark ? "light" : "dark")} aria-label="Toggle theme">
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="grid place-items-center"
            >
              {isDark ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
            </motion.span>
          </AnimatePresence>
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger render={<Button variant="ghost" className="gap-2 pl-2" />}>
            <span className="grid h-7 w-7 place-items-center rounded-full bg-brand-plum text-xs font-semibold text-white">
              {initials(session?.name ?? "A")}
            </span>
            <span className="hidden text-sm font-medium sm:inline">{session?.name ?? "Admin"}</span>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuGroup>
              <DropdownMenuLabel>{session?.email}</DropdownMenuLabel>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              variant="destructive"
              onClick={() => {
                logout();
                router.replace(Routes.login);
              }}
            >
              <LogOut className="h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}
