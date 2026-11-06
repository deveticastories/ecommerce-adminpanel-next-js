"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { OrderStatus } from "@/types";
import { ORDER_STATUSES, STATUS_LABELS } from "@/utils/Constants";

/** Compact inline status picker for order rows. */
export default function OrderStatusSelect({
  value,
  onChange,
}: {
  value: OrderStatus;
  onChange: (status: OrderStatus) => void;
}) {
  return (
    <Select value={value} onValueChange={(v) => onChange(v as OrderStatus)}>
      <SelectTrigger size="sm" className="w-32">
        <SelectValue>{(v) => STATUS_LABELS[String(v)] ?? ""}</SelectValue>
      </SelectTrigger>
      <SelectContent>
        {ORDER_STATUSES.map((s) => (
          <SelectItem key={s} value={s}>
            {STATUS_LABELS[s]}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
