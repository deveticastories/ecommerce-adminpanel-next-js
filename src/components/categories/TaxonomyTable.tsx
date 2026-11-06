"use client";

import EmptyTableRow from "@/components/common/EmptyTableRow";
import MotionTableBody from "@/components/common/MotionTableBody";
import MotionTableRow from "@/components/common/MotionTableRow";
import ToneBadge from "@/components/common/ToneBadge";
import RowActions from "@/components/common/RowActions";
import { Badge } from "@/components/ui/badge";
import { Table, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { TaxonomyAudience } from "@/types";
import { AUDIENCE_LABELS } from "@/utils/Constants";
import { fmtDate } from "@/utils/Format";
import { Layout } from "@/utils/Sizes";

export interface TaxonomyRow {
  id: string;
  name: string;
  slug: string;
  description: string;
  active: boolean;
  created_at: string;
  audience?: TaxonomyAudience;
}

/** Shared table for categories (with an Audience column) and collections. */
export default function TaxonomyTable({
  rows,
  showAudience,
  onEdit,
  onDelete,
}: {
  rows: TaxonomyRow[];
  showAudience: boolean;
  onEdit: (r: TaxonomyRow) => void;
  onDelete: (r: TaxonomyRow) => void;
}) {
  return (
    <div className={Layout.tableCard}>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            {showAudience && <TableHead>Audience</TableHead>}
            <TableHead>Description</TableHead>
            <TableHead>State</TableHead>
            <TableHead>Created</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        {/* Keyed by tab so switching tabs replays the row reveal. */}
        <MotionTableBody key={showAudience ? "categories" : "collections"}>
          {rows.map((r) => (
            <MotionTableRow key={r.id}>
              <TableCell>
                <p className="text-sm font-medium">{r.name}</p>
                <p className="font-mono text-xs text-muted-foreground">/{r.slug}</p>
              </TableCell>
              {showAudience && (
                <TableCell>
                  <Badge variant="outline">{AUDIENCE_LABELS[r.audience ?? "all"]}</Badge>
                </TableCell>
              )}
              <TableCell className="max-w-64 truncate text-sm text-muted-foreground">{r.description || "—"}</TableCell>
              <TableCell>{r.active ? <ToneBadge tone="success">Active</ToneBadge> : <Badge variant="secondary">Archived</Badge>}</TableCell>
              <TableCell className="text-sm">{fmtDate(r.created_at)}</TableCell>
              <TableCell className="text-right">
                <RowActions onEdit={() => onEdit(r)} onDelete={() => onDelete(r)} />
              </TableCell>
            </MotionTableRow>
          ))}
          {rows.length === 0 && <EmptyTableRow colSpan={showAudience ? 6 : 5} message="Nothing here yet — add one above." />}
        </MotionTableBody>
      </Table>
    </div>
  );
}
