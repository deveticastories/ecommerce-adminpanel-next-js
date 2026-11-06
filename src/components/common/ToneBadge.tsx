import type { ReactNode } from "react";
import { Badge } from "@/components/ui/badge";
import { Tones, type Tone } from "@/utils/Colors";
import { cn } from "@/utils/cn";

/** Outline pill in one of the shared status tones (success, warning, danger…). */
export default function ToneBadge({
  tone,
  children,
  className,
}: {
  tone: Tone;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Badge variant="outline" className={cn(Tones[tone], className)}>
      {children}
    </Badge>
  );
}
