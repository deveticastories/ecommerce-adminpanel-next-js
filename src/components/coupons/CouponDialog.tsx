"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import type { Coupon, CouponInput, DiscountType } from "@/types";

interface CouponForm {
  code: string;
  discount_type: DiscountType;
  value: string;
  min_order_value: string;
  expiry: string;
  usage_limit: string;
  active: boolean;
}

const EMPTY: CouponForm = { code: "", discount_type: "percent", value: "", min_order_value: "", expiry: "", usage_limit: "0", active: true };

const toForm = (c: Coupon): CouponForm => ({
  code: c.code,
  discount_type: c.discount_type,
  value: String(c.value),
  min_order_value: String(c.min_order_value),
  expiry: c.expiry,
  usage_limit: String(c.usage_limit),
  active: c.active,
});

/** Create / edit a discount code. */
export default function CouponDialog({
  open,
  coupon,
  onClose,
  onSave,
}: {
  open: boolean;
  coupon: Coupon | null;
  onClose: () => void;
  onSave: (input: CouponInput) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-md">
        {open && <CouponFormBody initial={coupon ? toForm(coupon) : EMPTY} isEdit={coupon !== null} onClose={onClose} onSave={onSave} />}
      </DialogContent>
    </Dialog>
  );
}

function CouponFormBody({
  initial,
  isEdit,
  onClose,
  onSave,
}: {
  initial: CouponForm;
  isEdit: boolean;
  onClose: () => void;
  onSave: (input: CouponInput) => void;
}) {
  const [form, setForm] = useState<CouponForm>(initial);
  const set = (patch: Partial<CouponForm>) => setForm((f) => ({ ...f, ...patch }));

  function submit() {
    if (!form.code.trim() || !form.value) {
      toast.error("Code and discount value are required");
      return;
    }
    onSave({
      code: form.code.trim().toUpperCase(),
      discount_type: form.discount_type,
      value: Number(form.value) || 0,
      min_order_value: Number(form.min_order_value) || 0,
      expiry: form.expiry,
      usage_limit: Number(form.usage_limit) || 0,
      active: form.active,
    });
  }

  return (
    <>
      <DialogHeader>
        <DialogTitle>{isEdit ? "Edit coupon" : "New coupon"}</DialogTitle>
        <DialogDescription>Customers apply the code at checkout — keep it punchy.</DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="coupon-code">Code</Label>
            <Input id="coupon-code" value={form.code} onChange={(e) => set({ code: e.target.value.toUpperCase() })} placeholder="FESTIVE20" className="font-mono" />
          </div>
          <div className="space-y-1.5">
            <Label>Type</Label>
            <Select value={form.discount_type} onValueChange={(v) => set({ discount_type: v as DiscountType })}>
              <SelectTrigger>
                <SelectValue>{(v) => (v === "flat" ? "Flat ₹" : "Percent %")}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="percent">Percent %</SelectItem>
                <SelectItem value="flat">Flat ₹</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="coupon-value">Value {form.discount_type === "flat" ? "(₹)" : "(%)"}</Label>
            <Input id="coupon-value" type="number" min={0} value={form.value} onChange={(e) => set({ value: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="coupon-min">Min order (₹)</Label>
            <Input id="coupon-min" type="number" min={0} value={form.min_order_value} onChange={(e) => set({ min_order_value: e.target.value })} />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1.5">
            <Label htmlFor="coupon-expiry">Expiry</Label>
            <Input id="coupon-expiry" type="date" value={form.expiry} onChange={(e) => set({ expiry: e.target.value })} />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="coupon-limit">Usage limit (0 = ∞)</Label>
            <Input id="coupon-limit" type="number" min={0} value={form.usage_limit} onChange={(e) => set({ usage_limit: e.target.value })} />
          </div>
        </div>
        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox checked={form.active} onCheckedChange={(checked) => set({ active: checked === true })} />
          Live — customers can redeem
        </label>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={submit}>Save coupon</Button>
      </DialogFooter>
    </>
  );
}
