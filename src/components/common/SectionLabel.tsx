import type { ReactNode } from "react";
import { Typography } from "@/utils/Fonts";

/** Small uppercase heading used to split sheets and forms into sections. */
export default function SectionLabel({ children }: { children: ReactNode }) {
  return <p className={Typography.sectionLabel}>{children}</p>;
}
