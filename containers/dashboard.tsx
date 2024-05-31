import TransactionHistory from "@/components/dashboard/transaction-history/card";
import TransactionsChart from "@/components/dashboard/transactions-chart/card";
import DescriptiveStatistics from "@/components/dashboard/descriptive-statistics/statistics";
import TransactionsScattered from "@/components/dashboard/transactions-scattered/card";
import { getTransactions } from "@/actions/get-transactions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  BELVO_ACCOUNT_ID,
  BELVO_LINK_ID,
  DEFAULT_DAYS_BACK,
} from "@/lib/constants";
import { subDays, format } from "date-fns";

export default async function Dashboard() {
  const linkId = BELVO_LINK_ID;
  const accountId = BELVO_ACCOUNT_ID;
  const defaultTo = new Date();
  const defaultFrom = subDays(defaultTo, DEFAULT_DAYS_BACK);
  const from = format(defaultFrom, "yyyy-MM-dd");
  const to = format(defaultTo, "yyyy-MM-dd");

  const { data } = await getTransactions({
    linkId: linkId,
    accountId: accountId,
    dateFrom: from,
    dateTo: to,
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <Suspense>
        <DescriptiveStatistics transactions={data} />
        <TransactionsChart transactions={data} />
        <TransactionsScattered transactions={data} />
        <TransactionHistory transactions={data} />
      </Suspense>
    </>
  );
}
