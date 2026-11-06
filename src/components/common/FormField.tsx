import type { ComponentProps } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

/** Label stacked over an input with the standard 6px gap. */
export default function FormField({
  id,
  label,
  ...inputProps
}: { id: string; label: string } & ComponentProps<typeof Input>) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>
      <Input id={id} {...inputProps} />
    </div>
  );
}
