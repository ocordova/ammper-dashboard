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
import { format } from "date-fns";
import { DataTable } from "@/components/ui/data-table";
import TransactionData from "@/db/transactions.json";
import { Badge } from "../ui/badge";
import { sortByAccountingDate } from "@/lib/utils";

export const columns: ColumnDef<BelvoTransaction>[] = [
  {
    accessorKey: "accounting_date",
    header: "Date",
    cell: ({ row }) => {
      const date: string = row.getValue("accounting_date");
      return <span>{format(date, "dd MMMM, yyyy")}</span>;
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

export default function TransactionsTable() {
  const transactions: BelvoTransaction[] =
    TransactionData as BelvoTransaction[];
  transactions.sort(sortByAccountingDate);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transaction History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={transactions} />
      </CardContent>
    </Card>
  );
}
