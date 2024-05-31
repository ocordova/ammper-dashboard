import TransactionHistory from "@/components/dashboard/transactions-histoy";
import TransactionsChart from "@/components/dashboard/transactions-chart";
import DescriptiveStatistics from "@/components/dashboard/descriptive-statistics";
import TransactionsScattered from "@/components/dashboard/transactions-scattered";
import AccountFilter from "@/components/account-filter";
import { getAccounts } from "@/actions/get-accounts";
import { DateFilter } from "@/components/date-filter";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

async function Filters() {
  const { data } = await getAccounts();
  const accounts = data || [];

  return (
    <>
      <AccountFilter accounts={accounts} defaultAccount={accounts[0]} />
      <DateFilter />
    </>
  );
}

export default async function Dashboard() {
  return (
    <>
      <div className="flex-1">
        <div className="flex items-center justify-between space-y-2">
          <div className="flex items-center space-x-2">
            <Suspense
              fallback={
                <>
                  <Skeleton className="h-8 w-36" />
                  <Skeleton className="h-8 w-36" />
                </>
              }
            >
              <Filters />
            </Suspense>
          </div>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <DescriptiveStatistics />
        <TransactionsChart />
        <TransactionsScattered />
        <TransactionHistory />
      </div>
    </>
  );
}
