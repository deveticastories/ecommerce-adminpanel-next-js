"use client";

import EmptyTableRow from "@/components/common/EmptyTableRow";
import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Customer } from "@/types";
import { VIP_THRESHOLD } from "@/utils/Constants";
import { fmtDate, inr } from "@/utils/Format";
import { Layout } from "@/utils/Sizes";

export default function CustomersTable({ customers, onView }: { customers: Customer[]; onView: (c: Customer) => void }) {
  return (
    <div className={Layout.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Customer</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>City</TableHead>
            <TableHead>Orders</TableHead>
            <TableHead>Lifetime Value</TableHead>
            <TableHead>Last Order</TableHead>
            <TableHead className="text-right">Profile</TableHead>
          </TableRow>
        </TableHeader>
        <MotionTableBody>
          {customers.map((c) => (
            <MotionTableRow key={c.id}>
              <TableCell>
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium">{c.name}</p>
                  {c.lifetime_value >= VIP_THRESHOLD && <Badge className="bg-brand-champagne text-brand-espresso">VIP</Badge>}
                </div>
                <p className="text-xs text-muted-foreground">{c.email}</p>
              </TableCell>
              <TableCell className="font-mono text-sm">{c.phone}</TableCell>
              <TableCell className="text-sm">
                {c.city}
                <span className="block text-xs text-muted-foreground">{c.state}</span>
              </TableCell>
              <TableCell className="font-mono text-sm">{c.total_orders}</TableCell>
              <TableCell className="font-mono text-sm font-semibold">{inr(c.lifetime_value)}</TableCell>
              <TableCell className="text-sm">{fmtDate(c.last_order_at)}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="xs" onClick={() => onView(c)}>
                  View
                </Button>
              </TableCell>
            </MotionTableRow>
          ))}
          {customers.length === 0 && <EmptyTableRow colSpan={7} message="No customers yet." />}
        </MotionTableBody>
      </Table>
    </div>
  );
}
