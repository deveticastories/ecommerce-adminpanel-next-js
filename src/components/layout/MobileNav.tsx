"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import SidebarNav from "./SidebarNav";

/** Hamburger + slide-out sidebar for screens narrower than md. */
export default function MobileNav() {
  const [open, setOpen] = useState(false);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger render={<Button variant="ghost" size="icon" className="md:hidden" aria-label="Open navigation" />}>
        <Menu className="h-5 w-5" />
      </SheetTrigger>
      <SheetContent side="left" className="w-64 border-sidebar-border bg-sidebar p-0 text-sidebar-foreground">
        <div className="flex h-full flex-col justify-between py-5">
          <div className="space-y-7">
            <SheetTitle className="px-3 font-heading text-[26px] leading-none tracking-tight text-brand-gold">Aavya</SheetTitle>
            <SidebarNav layoutId="mobile-nav-active" onNavigate={() => setOpen(false)} />
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
