import { unstable_noStore as noStore } from "next/cache";
import TransactionHistory from "@/components/dashboard/transaction-history/card";
import TransactionsChart from "@/components/dashboard/transactions-chart/card";
import DescriptiveStatistics from "@/components/dashboard/descriptive-statistics/statistics";
import TransactionsScattered from "@/components/dashboard/transactions-scattered/card";
import { getTransactions } from "@/actions/get-transactions";
import { Suspense } from "react";
import Loading from "./loading";

import {
  BELVO_ACCOUNT_ID,
  BELVO_LINK_ID,
  DEFAULT_DAYS_BACK,
} from "@/lib/constants";
import { subDays, format } from "date-fns";

const linkId = BELVO_LINK_ID;
const accountId = BELVO_ACCOUNT_ID;
const defaultTo = new Date();
const defaultFrom = subDays(defaultTo, DEFAULT_DAYS_BACK);
const from = format(defaultFrom, "yyyy-MM-dd");
const to = format(defaultTo, "yyyy-MM-dd");

async function GetTransactions() {
  noStore();
  const { data } = await getTransactions({
    linkId: linkId,
    accountId: accountId,
    dateFrom: from,
    dateTo: to,
  });

  return data ? (
    <>
      <DescriptiveStatistics transactions={data} />
      <TransactionsChart transactions={data} />
      <TransactionsScattered transactions={data} />
      <TransactionHistory transactions={data} />
    </>
  ) : (
    <div className="text-sm text-muted-foreground">
      No transactions found :C
    </div>
  );
}

export default async function DashboardPage() {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <GetTransactions />
      </Suspense>
    </>
  );
}
