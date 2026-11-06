import { Badge } from "@/components/ui/badge";
import type { OrderStatus } from "@/types";
import { Tones, type Tone } from "@/utils/Colors";
import { STATUS_LABELS } from "@/utils/Constants";

// Order pipeline colours: amber → blue → purple → emerald, rose for cancelled.
const STATUS_TONES: Record<OrderStatus, Tone> = {
  pending: "warning",
  confirmed: "info",
  shipped: "shipped",
  delivered: "success",
  cancelled: "danger",
};

export default function StatusBadge({ status }: { status: OrderStatus }) {
  return (
    <Badge variant="outline" className={`${Tones[STATUS_TONES[status]]} font-medium`}>
      {STATUS_LABELS[status] ?? status}
    </Badge>
  );
}
