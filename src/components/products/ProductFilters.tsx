"use client";

import { LayoutGrid, Table2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Category, Collection } from "@/types";
import { cn } from "@/utils/cn";
import { Layout } from "@/utils/Sizes";

export type ProductView = "table" | "grid";

export interface ProductFilterState {
  search: string;
  category: string;
  collection: string;
  status: string;
}

/** Search, category / collection / status filters and the table ⇄ grid switch. */
export default function ProductFilters({
  value,
  onChange,
  categories,
  collections,
  view,
  onViewChange,
}: {
  value: ProductFilterState;
  onChange: (next: ProductFilterState) => void;
  categories: Category[];
  collections: Collection[];
  view: ProductView;
  onViewChange: (v: ProductView) => void;
}) {
  const set = (patch: Partial<ProductFilterState>) => onChange({ ...value, ...patch });

  return (
    <div className={cn(Layout.toolbarCard, "flex flex-wrap items-center justify-between gap-3")}>
      <div className="flex flex-wrap items-center gap-2">
        <Input placeholder="Search name or SKU…" value={value.search} onChange={(e) => set({ search: e.target.value })} className="w-52" />
        <Select value={value.category} onValueChange={(v) => set({ category: String(v) })}>
          <SelectTrigger size="sm" className="w-44">
            <SelectValue>{(v) => (v === "all" ? "All categories" : categories.find((c) => c.id === v)?.name ?? "All categories")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={value.collection} onValueChange={(v) => set({ collection: String(v) })}>
          <SelectTrigger size="sm" className="w-44">
            <SelectValue>
              {(v) => (v === "all" ? "All collections" : collections.find((c) => c.id === v)?.name ?? "All collections")}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All collections</SelectItem>
            {collections.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select value={value.status} onValueChange={(v) => set({ status: String(v) })}>
          <SelectTrigger size="sm" className="w-36">
            <SelectValue>{(v) => (v === "all" ? "All statuses" : v === "draft" ? "Draft" : "Active")}</SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="draft">Draft</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center gap-1 rounded-lg border border-border p-1">
        {(
          [
            { id: "table", icon: Table2, label: "Table view" },
            { id: "grid", icon: LayoutGrid, label: "Grid view" },
          ] as const
        ).map((opt) => (
          <button
            key={opt.id}
            type="button"
            aria-label={opt.label}
            aria-pressed={view === opt.id}
            onClick={() => onViewChange(opt.id)}
            className={cn(
              "grid h-7 w-7 place-items-center rounded-md transition-colors",
              view === opt.id ? "bg-accent text-primary" : "text-muted-foreground hover:bg-muted",
            )}
          >
            <opt.icon className="h-4 w-4" />
          </button>
        ))}
      </div>
    </div>
  );
}
