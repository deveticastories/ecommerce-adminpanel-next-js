"use client";

import { useState } from "react";
import { motion } from "motion/react";
import { toast } from "sonner";
import FormField from "@/components/common/FormField";
import PageContainer from "@/components/common/PageContainer";
import PageHeader from "@/components/common/PageHeader";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useBoutiqueStore } from "@/store/useBoutiqueStore";
import type { ShopSettings } from "@/types";
import { fadeInUp, staggerContainer } from "@/utils/Animations";

type SettingsForm = Omit<ShopSettings, "id">;
type TextKey = "store_name" | "tagline" | "phone" | "email" | "gstin" | "address";
type NumberKey = "low_stock_threshold" | "shipping_fee" | "free_shipping_above";

const MotionCard = motion.create(Card);

const PROFILE_FIELDS: Array<{ key: TextKey; label: string; type?: string }> = [
  { key: "store_name", label: "Store name" },
  { key: "tagline", label: "Tagline" },
  { key: "phone", label: "Contact phone" },
  { key: "email", label: "Support email", type: "email" },
  { key: "gstin", label: "GSTIN" },
  { key: "address", label: "Store address" },
];

const OPERATION_FIELDS: Array<{ key: NumberKey; label: string }> = [
  { key: "low_stock_threshold", label: "Low-stock threshold (units)" },
  { key: "shipping_fee", label: "Standard shipping fee (₹)" },
  { key: "free_shipping_above", label: "Free shipping above (₹)" },
];

export default function SettingsScreen() {
  const settings = useBoutiqueStore((s) => s.settings);
  const saveSettings = useBoutiqueStore((s) => s.saveSettings);
  const changePassword = useBoutiqueStore((s) => s.changePassword);
  const [form, setForm] = useState<SettingsForm>(() => ({
    store_name: settings.store_name,
    tagline: settings.tagline,
    phone: settings.phone,
    email: settings.email,
    gstin: settings.gstin,
    address: settings.address,
    low_stock_threshold: settings.low_stock_threshold,
    shipping_fee: settings.shipping_fee,
    free_shipping_above: settings.free_shipping_above,
  }));
  const [pw, setPw] = useState({ current: "", next: "", confirm: "" });

  function submitPassword() {
    if (pw.next.length < 6) {
      toast.error("New password needs at least 6 characters");
      return;
    }
    if (pw.next !== pw.confirm) {
      toast.error("New passwords do not match");
      return;
    }
    const result = changePassword(pw.current, pw.next);
    if (!result.ok) {
      toast.error(result.error);
      return;
    }
    toast.success("Password changed — use it on the next login");
    setPw({ current: "", next: "", confirm: "" });
  }

  return (
    <PageContainer narrow>
      <PageHeader title="Settings" subtitle="The shop profile, operations and admin access." />

      <motion.div variants={staggerContainer(0.08)} initial="hidden" animate="show" className="space-y-6">
        <MotionCard variants={fadeInUp}>
          <CardHeader>
            <CardTitle>Boutique Profile</CardTitle>
            <CardDescription>Printed on invoices and shown across the admin panel.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            {PROFILE_FIELDS.map((f) => (
              <FormField
                key={f.key}
                id={`settings-${f.key}`}
                label={f.label}
                type={f.type ?? "text"}
                value={form[f.key]}
                onChange={(e) => setForm({ ...form, [f.key]: e.target.value })}
              />
            ))}
          </CardContent>
        </MotionCard>

        <MotionCard variants={fadeInUp}>
          <CardHeader>
            <CardTitle>Store Operations</CardTitle>
            <CardDescription>Stock alerts and shipping rules for the checkout.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label>Currency</Label>
              <div className="flex h-9 items-center rounded-md border border-border bg-muted px-3 text-sm font-medium">₹ Indian Rupee (INR)</div>
            </div>
            {OPERATION_FIELDS.map((f) => (
              <FormField
                key={f.key}
                id={`settings-${f.key}`}
                label={f.label}
                type="number"
                value={String(form[f.key])}
                onChange={(e) => setForm({ ...form, [f.key]: Number(e.target.value) || 0 })}
              />
            ))}
          </CardContent>
        </MotionCard>

        <motion.div variants={fadeInUp} className="flex justify-end">
          <Button
            onClick={() => {
              saveSettings(form);
              toast.success("Settings saved");
            }}
          >
            Save settings
          </Button>
        </motion.div>

        <MotionCard variants={fadeInUp}>
          <CardHeader>
            <CardTitle>Admin Access</CardTitle>
            <CardDescription>Change the password used on the login screen.</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 sm:grid-cols-3">
            <FormField
              id="password-current"
              label="Current password"
              type="password"
              autoComplete="current-password"
              value={pw.current}
              onChange={(e) => setPw({ ...pw, current: e.target.value })}
            />
            <FormField
              id="password-new"
              label="New password"
              type="password"
              autoComplete="new-password"
              value={pw.next}
              onChange={(e) => setPw({ ...pw, next: e.target.value })}
            />
            <FormField
              id="password-confirm"
              label="Confirm new password"
              type="password"
              autoComplete="new-password"
              value={pw.confirm}
              onChange={(e) => setPw({ ...pw, confirm: e.target.value })}
            />
            <div className="sm:col-span-3">
              <Button variant="outline" onClick={submitPassword}>
                Change password
              </Button>
            </div>
          </CardContent>
        </MotionCard>
      </motion.div>
    </PageContainer>
  );
}
