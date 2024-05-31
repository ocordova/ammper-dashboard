"use client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import {
  BelvoAccountCurrency,
  BelvoTransaction,
  BelvoTransactionMerchant,
  BelvoTransactionStatus,
  BelvoTransactionType,
} from "@/lib/definitions";
import { ColumnDef } from "@tanstack/react-table";

import { DataTable } from "@/components/ui/data-table";
import { Badge } from "../ui/badge";
import { sortByValueDate } from "@/lib/utils";
import { format, parseISO } from "date-fns";

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

export default function TransactionsHistory({
  transactions,
}: {
  transactions: BelvoTransaction[];
}) {
  const sorted = transactions.sort(sortByValueDate);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transaction History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={sorted} />
      </CardContent>
    </Card>
  );
}
