"use client";

import { AnimatePresence, motion } from "motion/react";
import ChoicePill from "@/components/common/ChoicePill";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Colorways } from "@/utils/Colors";

export const stockKey = (size: string, color: string) => `${size}|${color}`;
const swatch = (name: string) => Colorways.find((c) => c.name === name)?.hex;

/** Size and colour toggles plus an editable size × colour stock grid. */
export default function VariantMatrix({
  sizes,
  activeSizes,
  activeColors,
  stocks,
  onToggleSize,
  onToggleColor,
  onStockChange,
}: {
  sizes: string[];
  activeSizes: Set<string>;
  activeColors: string[];
  stocks: Record<string, number>;
  onToggleSize: (s: string) => void;
  onToggleColor: (c: string) => void;
  onStockChange: (key: string, stock: number) => void;
}) {
  const rows = sizes.filter((s) => activeSizes.has(s));
  const total = rows.reduce((acc, s) => acc + activeColors.reduce((a, c) => a + (stocks[stockKey(s, c)] ?? 0), 0), 0);

  return (
    <>
      <div className="space-y-1.5">
        <Label>Sizes</Label>
        <div className="flex flex-wrap gap-2">
          {sizes.map((s) => (
            <ChoicePill key={s} selected={activeSizes.has(s)} onClick={() => onToggleSize(s)}>
              {s}
            </ChoicePill>
          ))}
        </div>
      </div>
      <div className="space-y-1.5">
        <Label>Colours</Label>
        <div className="flex flex-wrap gap-2">
          {Colorways.map((c) => (
            <ChoicePill key={c.name} selected={activeColors.includes(c.name)} onClick={() => onToggleColor(c.name)}>
              <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.hex }} />
              {c.name}
            </ChoicePill>
          ))}
        </div>
      </div>
      {rows.length > 0 && activeColors.length > 0 ? (
        <div className="overflow-x-auto rounded-xl border border-border">
          <table className="w-full min-w-[420px] text-sm">
            <thead>
              <tr className="bg-muted/60 text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="px-3 py-2 font-semibold">Size</th>
                {activeColors.map((c) => (
                  <th key={c} className="px-3 py-2 font-semibold">
                    <span className="inline-flex items-center gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: swatch(c) }} />
                      {c}
                    </span>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              <AnimatePresence initial={false}>
                {rows.map((s) => (
                  <motion.tr
                    key={s}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.15 }}
                    className="border-t border-border"
                  >
                    <td className="px-3 py-2 font-medium">{s}</td>
                    {activeColors.map((c) => {
                      const key = stockKey(s, c);
                      return (
                        <td key={c} className="px-3 py-2">
                          <Input
                            type="number"
                            min={0}
                            className="h-8 w-20"
                            aria-label={`Stock for ${s} ${c}`}
                            value={String(stocks[key] ?? 0)}
                            onChange={(e) => onStockChange(key, Math.max(0, Number(e.target.value) || 0))}
                          />
                        </td>
                      );
                    })}
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
        </div>
      ) : (
        <p className="rounded-xl border border-dashed border-border p-4 text-center text-sm text-muted-foreground">
          Toggle at least one size and one colour to build the stock matrix.
        </p>
      )}
      <p className="font-mono text-xs text-muted-foreground">
        Variants: {rows.length * activeColors.length} · Total stock: {total}
      </p>
    </>
  );
}
