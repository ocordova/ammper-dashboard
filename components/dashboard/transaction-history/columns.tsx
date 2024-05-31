import { ColumnDef } from "@tanstack/react-table";
import { format, parseISO } from "date-fns";
import { Badge } from "@/components/ui/badge";
import {
  BelvoTransaction,
  BelvoTransactionMerchant,
  BelvoTransactionStatus,
  BelvoTransactionType,
  BelvoAccountCurrency,
} from "@/lib/definitions";

export const columns: ColumnDef<BelvoTransaction>[] = [
  {
    accessorKey: "value_date",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("value_date");
      const dateObj = parseISO(date);
      const formatted = format(dateObj, "dd, MMMM, yyyy");
      return <span>{formatted}</span>;
    },
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "merchant",
    header: "Merchant",
    cell: ({ row }) => {
      const merchant: BelvoTransactionMerchant = row.getValue("merchant");
      return merchant ? merchant.name : "Unknown";
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const status: BelvoTransactionStatus = row.getValue("status");
      return (
        <Badge
          variant={
            status === BelvoTransactionStatus.PROCESSED ? "default" : "warning"
          }
        >
          {status}
        </Badge>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
    cell: ({ row }) => {
      const amount: number = row.getValue("amount");
      const type: BelvoTransactionType = row.original.type;
      const currency: BelvoAccountCurrency = row.original.currency;
      const formatted = amount.toLocaleString("en-US", {
        style: "currency",
        currency: currency,
      });

      return (
        <span>
          {type === BelvoTransactionType.INFLOW ? "" : "-"}
          {formatted}
        </span>
      );
    },
  },
];
