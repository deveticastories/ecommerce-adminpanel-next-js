import Image from "next/image";
import { cn } from "@/utils/cn";

/**
 * Square product photo with a muted placeholder. Local images go through next/image
 * optimisation; pasted remote URLs are shown as-is.
 */
export default function ProductThumb({
  src,
  alt = "",
  size,
  className,
}: {
  src?: string;
  alt?: string;
  size: number;
  className?: string;
}) {
  if (!src) return <div className={cn("flex-shrink-0 rounded-lg bg-muted", className)} style={{ width: size, height: size }} />;
  return (
    <Image
      src={src}
      alt={alt}
      width={size}
      height={size}
      unoptimized={!src.startsWith("/")}
      className={cn("flex-shrink-0 rounded-lg object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}
