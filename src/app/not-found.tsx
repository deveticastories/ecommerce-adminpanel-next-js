import Link from "next/link";
import { Routes } from "@/utils/Constants";

export default function NotFound() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-3 bg-background p-6 text-center">
      <p className="font-heading text-4xl tracking-tight text-primary">Aavya</p>
      <p className="text-sm text-muted-foreground">This page isn&apos;t part of the atelier.</p>
      <Link href={Routes.dashboard} className="text-sm font-medium text-primary underline-offset-4 hover:underline">
        Back to the dashboard
      </Link>
    </div>
  );
}
