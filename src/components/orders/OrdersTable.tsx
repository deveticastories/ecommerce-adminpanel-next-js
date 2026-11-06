"use client";

import EmptyTableRow from "@/components/common/EmptyTableRow";
import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order } from "@/types";
import { PAYMENT_LABELS } from "@/utils/Constants";
import { fmtDate, inr } from "@/utils/Format";
import { Layout } from "@/utils/Sizes";

export default function OrdersTable({ orders, onView }: { orders: Order[]; onView: (o: Order) => void }) {
  return (
    <div className={Layout.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Order</TableHead>
            <TableHead>Customer</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Payment</TableHead>
            <TableHead>Total</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <MotionTableBody>
          {orders.map((o) => (
            <MotionTableRow key={o.id}>
              <TableCell>
                <p className="font-mono text-sm font-medium">#{o.order_no}</p>
                <p className="text-xs text-muted-foreground">{fmtDate(o.created_at)}</p>
              </TableCell>
              <TableCell>
                <p className="text-sm font-medium">{o.customer_name}</p>
                <p className="text-xs text-muted-foreground">{o.customer_city}</p>
              </TableCell>
              <TableCell className="text-sm">{o.items.reduce((acc, it) => acc + it.qty, 0)}</TableCell>
              <TableCell>
                <Badge variant={o.payment_method === "cod" ? "outline" : "secondary"}>
                  {PAYMENT_LABELS[o.payment_method] ?? o.payment_method}
                </Badge>
              </TableCell>
              <TableCell className="font-mono text-sm font-semibold">{inr(o.total)}</TableCell>
              <TableCell>
                <StatusBadge status={o.status} />
              </TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="xs" onClick={() => onView(o)}>
                  View
                </Button>
              </TableCell>
            </MotionTableRow>
          ))}
          {orders.length === 0 && <EmptyTableRow colSpan={7} message="No orders in this view yet." />}
        </MotionTableBody>
      </Table>
    </div>
  );
}
