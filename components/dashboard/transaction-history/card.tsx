"use client";

import { useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DataTable } from "@/components/ui/data-table";
import { BelvoTransaction } from "@/lib/definitions";
import { columns } from "./columns";
import { sortByValueDate } from "@/lib/utils";

interface TransactionsHistoryProps {
  transactions: BelvoTransaction[];
}

export default function TransactionHistory({
  transactions,
}: TransactionsHistoryProps) {
  const sortedTransactions = useMemo(() => {
    return transactions.sort(sortByValueDate);
  }, [transactions]);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transaction History</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <DataTable columns={columns} data={sortedTransactions} />
      </CardContent>
    </Card>
  );
}
