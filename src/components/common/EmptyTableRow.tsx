import { TableCell, TableRow } from "@/components/ui/table";

export default function EmptyTableRow({ colSpan, message }: { colSpan: number; message: string }) {
  return (
    <TableRow>
      <TableCell colSpan={colSpan} className="py-10 text-center text-sm text-muted-foreground">
        {message}
      </TableCell>
    </TableRow>
  );
}
