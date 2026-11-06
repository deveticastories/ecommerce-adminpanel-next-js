"use client";

import EmptyTableRow from "@/components/common/EmptyTableRow";
import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import ProductThumb from "@/components/common/ProductThumb";
import ToneBadge from "@/components/common/ToneBadge";
import { Badge } from "@/components/ui/badge";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Product } from "@/types";
import { AUDIENCE_LABELS } from "@/utils/Constants";
import { inr, stockChip } from "@/utils/Format";
import { Layout, Sizes } from "@/utils/Sizes";
import RowActions from "@/components/common/RowActions";

export default function ProductTable({
  products,
  threshold,
  onEdit,
  onDelete,
}: {
  products: Product[];
  threshold: number;
  onEdit: (p: Product) => void;
  onDelete: (p: Product) => void;
}) {
  return (
    <div className={Layout.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Product</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Audience</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Stock</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <MotionTableBody>
          {products.map((p) => {
            const chip = stockChip(p.total_stock, threshold);
            return (
              <MotionTableRow key={p.id}>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <ProductThumb src={p.images[0]} alt={p.name} size={Sizes.thumb.sm} />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium">{p.name}</p>
                      <p className="font-mono text-xs text-muted-foreground">{p.sku}</p>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="text-sm">{p.category_name || "—"}</TableCell>
                <TableCell>
                  <Badge variant="outline">{AUDIENCE_LABELS[p.audience]}</Badge>
                </TableCell>
                <TableCell className="font-mono text-sm font-semibold">{inr(p.price)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" className={chip.className}>
                      {chip.label}
                    </Badge>
                    <span className="font-mono text-xs text-muted-foreground">{p.total_stock}</span>
                  </div>
                </TableCell>
                <TableCell>
                  {p.status === "draft" ? <Badge variant="secondary">Draft</Badge> : <ToneBadge tone="success">Live</ToneBadge>}
                </TableCell>
                <TableCell className="text-right">
                  <RowActions onEdit={() => onEdit(p)} onDelete={() => onDelete(p)} />
                </TableCell>
              </MotionTableRow>
            );
          })}
          {products.length === 0 && <EmptyTableRow colSpan={7} message="No products match these filters yet." />}
        </MotionTableBody>
      </Table>
    </div>
  );
}
