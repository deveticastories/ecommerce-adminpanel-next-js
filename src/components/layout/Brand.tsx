import { cn } from "@/utils/cn";

/** "Aavya" wordmark in gold serif with the small-caps strapline. */
export default function Brand({
  tagline = "Heritage & Bachpan",
  className,
}: {
  tagline?: string | null;
  className?: string;
}) {
  return (
    <div className={cn("px-3", className)}>
      <p className="font-heading text-[26px] leading-none tracking-tight text-brand-gold">Aavya</p>
      {tagline && (
        <p className="mt-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-sidebar-muted">{tagline}</p>
      )}
    </div>
  );
}
