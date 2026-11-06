"use client";

import { useState } from "react";
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
import type { TaxonomyAudience, TaxonomyInput } from "@/types";
import { AUDIENCE_LABELS, TAXONOMY_AUDIENCES } from "@/utils/Constants";

const EMPTY: TaxonomyInput = { name: "", description: "", audience: "all", active: true };

/** Create / edit a category or collection. */
export default function TaxonomyDialog({
  open,
  kind,
  initial,
  onClose,
  onSave,
}: {
  open: boolean;
  kind: "category" | "collection";
  /** Values of the row being edited, or null for a new one. */
  initial: TaxonomyInput | null;
  onClose: () => void;
  onSave: (input: TaxonomyInput) => void;
}) {
  return (
    <Dialog open={open} onOpenChange={(next) => !next && onClose()}>
      <DialogContent className="max-w-md">
        {open && <TaxonomyForm kind={kind} initial={initial ?? EMPTY} isEdit={initial !== null} onClose={onClose} onSave={onSave} />}
      </DialogContent>
    </Dialog>
  );
}

function TaxonomyForm({
  kind,
  initial,
  isEdit,
  onClose,
  onSave,
}: {
  kind: "category" | "collection";
  initial: TaxonomyInput;
  isEdit: boolean;
  onClose: () => void;
  onSave: (input: TaxonomyInput) => void;
}) {
  const [form, setForm] = useState<TaxonomyInput>(initial);

  return (
    <>
      <DialogHeader>
        <DialogTitle>
          {isEdit ? "Edit" : "New"} {kind}
        </DialogTitle>
        <DialogDescription>Names become the storefront navigation.</DialogDescription>
      </DialogHeader>
      <div className="space-y-3">
        <div className="space-y-1.5">
          <Label htmlFor="taxonomy-name">Name</Label>
          <Input id="taxonomy-name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Frocks & Dresses" />
        </div>
        <div className="space-y-1.5">
          <Label htmlFor="taxonomy-description">Description</Label>
          <Input
            id="taxonomy-description"
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            placeholder="A short storefront blurb"
          />
        </div>
        {kind === "category" && (
          <div className="space-y-1.5">
            <Label>Audience</Label>
            <Select value={form.audience} onValueChange={(v) => setForm({ ...form, audience: v as TaxonomyAudience })}>
              <SelectTrigger>
                <SelectValue>{(v) => AUDIENCE_LABELS[String(v)] ?? ""}</SelectValue>
              </SelectTrigger>
              <SelectContent>
                {TAXONOMY_AUDIENCES.map((a) => (
                  <SelectItem key={a} value={a}>
                    {AUDIENCE_LABELS[a]}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        <label className="flex items-center gap-2 text-sm font-medium">
          <Checkbox checked={form.active} onCheckedChange={(checked) => setForm({ ...form, active: checked === true })} />
          Active on the storefront
        </label>
      </div>
      <DialogFooter>
        <Button variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <Button onClick={() => onSave({ ...form, name: form.name.trim(), description: form.description.trim() })}>Save</Button>
      </DialogFooter>
    </>
  );
}
