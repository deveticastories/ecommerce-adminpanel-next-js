"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import { toast } from "sonner";
import ConfirmDialog from "@/components/common/ConfirmDialog";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import CouponDialog from "@/components/coupons/CouponDialog";
import CouponsTable from "@/components/coupons/CouponsTable";
import { Button } from "@/components/ui/button";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { Coupon } from "@/types";

export default function CouponsScreen() {
  const coupons = useBoutiqueStore((s) => s.coupons);
  const saveCoupon = useBoutiqueStore((s) => s.saveCoupon);
  const toggleCoupon = useBoutiqueStore((s) => s.toggleCoupon);
  const deleteCoupon = useBoutiqueStore((s) => s.deleteCoupon);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editing, setEditing] = useState<Coupon | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<Coupon | null>(null);

  const openDialog = (coupon: Coupon | null) => {
    setEditing(coupon);
    setDialogOpen(true);
  };

  return (
    <PageContainer>
      <PageHeader
        title="Coupons & Discounts"
        subtitle="Festive codes, first-buy nudges and their ledgers."
        action={
          <Button onClick={() => openDialog(null)}>
            <Plus className="h-4 w-4" />
            Add Coupon
          </Button>
        }
      />

      <CouponsTable coupons={coupons} onToggle={(c) => toggleCoupon(c.id)} onEdit={openDialog} onDelete={setDeleteTarget} />

      <CouponDialog
        open={dialogOpen}
        coupon={editing}
        onClose={() => setDialogOpen(false)}
        onSave={(input) => {
          const result = saveCoupon(input, editing?.id);
          if (!result.ok) {
            toast.error(result.error);
            return;
          }
          toast.success("Coupon saved");
          setDialogOpen(false);
        }}
      />

      <ConfirmDialog
        open={deleteTarget !== null}
        title="Delete coupon?"
        description={<>{deleteTarget?.code} will stop applying immediately.</>}
        onCancel={() => setDeleteTarget(null)}
        onConfirm={() => {
          if (deleteTarget) deleteCoupon(deleteTarget.id);
          toast.success("Coupon deleted");
          setDeleteTarget(null);
        }}
      />
    </PageContainer>
  );
}
