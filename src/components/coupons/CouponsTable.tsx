"use client";

import { Copy } from "lucide-react";
import { toast } from "sonner";
import EmptyTableRow from "@/components/common/EmptyTableRow";
import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import ToneBadge from "@/components/common/ToneBadge";
import RowActions from "@/components/common/RowActions";
import { Checkbox } from "@/components/ui/checkbox";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Coupon } from "@/types";
import type { Tone } from "@/utils/Colors";
import { fmtDate, inr, todayISODate } from "@/utils/Format";
import { Layout } from "@/utils/Sizes";

function couponState(c: Coupon, today: string): { label: string; tone: Tone } {
  if (!c.active) return { label: "Paused", tone: "neutral" };
  if (c.expiry && c.expiry < today) return { label: "Expired", tone: "danger" };
  return { label: "Active", tone: "success" };
}

function copyCode(code: string) {
  navigator.clipboard.writeText(code).then(
    () => toast.success(`Code ${code} copied`),
    () => toast.error("Clipboard unavailable"),
  );
}

export default function CouponsTable({
  coupons,
  onToggle,
  onEdit,
  onDelete,
}: {
  coupons: Coupon[];
  onToggle: (c: Coupon) => void;
  onEdit: (c: Coupon) => void;
  onDelete: (c: Coupon) => void;
}) {
  const today = todayISODate();

  return (
    <div className={Layout.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Code</TableHead>
            <TableHead>Discount</TableHead>
            <TableHead>Min Order</TableHead>
            <TableHead>Expiry</TableHead>
            <TableHead>Usage</TableHead>
            <TableHead>State</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <MotionTableBody>
          {coupons.map((c) => {
            const state = couponState(c, today);
            return (
              <MotionTableRow key={c.id}>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm font-semibold tracking-wide">{c.code}</span>
                    <button
                      type="button"
                      onClick={() => copyCode(c.code)}
                      className="text-muted-foreground transition-colors hover:text-primary"
                      title="Copy code"
                    >
                      <Copy className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{c.discount_type === "percent" ? `${c.value}% off` : `${inr(c.value)} off`}</TableCell>
                <TableCell className="font-mono text-sm">{c.min_order_value > 0 ? inr(c.min_order_value) : "—"}</TableCell>
                <TableCell className="text-sm">{c.expiry ? fmtDate(c.expiry) : "Never"}</TableCell>
                <TableCell className="font-mono text-sm">
                  {c.usage_limit > 0 ? `${c.times_used} / ${c.usage_limit}` : `${c.times_used} used`}
                </TableCell>
                <TableCell>
                  <ToneBadge tone={state.tone}>{state.label}</ToneBadge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="inline-flex items-center gap-1">
                    <label className="mr-1 flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Checkbox checked={c.active} onCheckedChange={() => onToggle(c)} />
                      Live
                    </label>
                    <RowActions onEdit={() => onEdit(c)} onDelete={() => onDelete(c)} />
                  </div>
                </TableCell>
              </MotionTableRow>
            );
          })}
          {coupons.length === 0 && <EmptyTableRow colSpan={7} message="No coupons yet — create a festive code above." />}
        </MotionTableBody>
      </Table>
    </div>
  );
}
