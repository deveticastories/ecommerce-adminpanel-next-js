"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { LowStockVariant } from "@/types";

/** Set the on-hand stock for one size × colour variant. */
export default function RestockDialog({
  target,
  onClose,
  onSave,
}: {
  target: LowStockVariant | null;
  onClose: () => void;
  onSave: (v: LowStockVariant, stock: number) => void;
}) {
  return (
    <Dialog open={target !== null} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md">
        {/* Keyed so the quantity resets to the variant's current stock each time it opens. */}
        {target && <RestockForm key={`${target.product_id}-${target.size}-${target.color}`} target={target} onClose={onClose} onSave={onSave} />}
      </DialogContent>
    </Dialog>
  );
}

function RestockForm({
  target,
  onClose,
  onSave,
}: {
  target: LowStockVariant;
  onClose: () => void;
  onSave: (v: LowStockVariant, stock: number) => void;
}) {
  const [qty, setQty] = useState(String(target.stock));

  return (
    <>
      <DialogHeader>
        <DialogTitle>Restock variant</DialogTitle>
        <DialogDescription>
          {target.product_name} — {target.size} · {target.color}
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-1.5">
        <Label htmlFor="restock-qty">Stock on hand</Label>
        <Input id="restock-qty" type="number" min={0} value={qty} onChange={(e) => setQty(e.target.value)} />
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onSave(target, Math.max(0, Number(qty) || 0))}>Save stock</Button>
      </DialogFooter>
    </>
  );
}
