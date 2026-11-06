"use client";

import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Edit / delete icon buttons used by every list row and card. */
export default function RowActions({ onEdit, onDelete }: { onEdit: () => void; onDelete: () => void }) {
  return (
    <div className="inline-flex gap-1">
      <Button variant="ghost" size="icon-xs" onClick={onEdit} aria-label="Edit">
        <Pencil className="h-3.5 w-3.5" />
      </Button>
      <Button variant="ghost" size="icon-xs" onClick={onDelete} className="text-destructive hover:text-destructive" aria-label="Delete">
        <Trash2 className="h-3.5 w-3.5" />
      </Button>
    </div>
  );
}
