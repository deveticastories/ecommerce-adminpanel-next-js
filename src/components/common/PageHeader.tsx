import type { ReactNode } from "react";
import { Typography } from "@/utils/Fonts";

/** Serif page title, muted subtitle and an optional right-aligned action. */
export default function PageHeader({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle: ReactNode;
  action?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-3">
      <div>
        <h1 className={Typography.pageTitle}>{title}</h1>
        <p className={Typography.pageSubtitle}>{subtitle}</p>
      </div>
      {action}
    </div>
  );
}
