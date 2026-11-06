"use client";

import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import StatusBadge from "@/components/common/StatusBadge";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Order, OrderStatus } from "@/types";
import { PAYMENT_LABELS } from "@/utils/Constants";
import { fmtDateTime, inr } from "@/utils/Format";
import OrderStatusSelect from "./OrderStatusSelect";

/** Latest orders with an inline status update. */
export default function RecentOrdersCard({
  orders,
  onStatusChange,
}: {
  orders: Order[];
  onStatusChange: (order: Order, status: OrderStatus) => void;
}) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Orders</CardTitle>
        <CardDescription>Latest six — update status inline</CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Payment</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Update</TableHead>
            </TableRow>
          </TableHeader>
          <MotionTableBody>
            {orders.map((o) => (
              <MotionTableRow key={o.id}>
                <TableCell>
                  <p className="font-mono text-sm font-medium">#{o.order_no}</p>
                  <p className="text-xs text-muted-foreground">{fmtDateTime(o.created_at)}</p>
                </TableCell>
                <TableCell className="text-sm">{o.customer_name}</TableCell>
                <TableCell className="text-sm">{o.items.reduce((acc, it) => acc + it.qty, 0)}</TableCell>
                <TableCell>
                  <Badge variant="outline">{PAYMENT_LABELS[o.payment_method] ?? o.payment_method}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm font-semibold">{inr(o.total)}</TableCell>
                <TableCell>
                  <StatusBadge status={o.status} />
                </TableCell>
                <TableCell>
                  <OrderStatusSelect value={o.status} onChange={(s) => onStatusChange(o, s)} />
                </TableCell>
              </MotionTableRow>
            ))}
          </MotionTableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
