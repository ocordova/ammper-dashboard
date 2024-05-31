import TransactionHistory from "@/components/dashboard/transactions-histoy";
import TransactionsChart from "@/components/dashboard/transactions-chart";
import DescriptiveStatistics from "@/components/dashboard/descriptive-statistics";
import TransactionsScattered from "@/components/dashboard/transactions-scattered";
import { getTransactions } from "@/actions/get-transactions";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";

export default async function Dashboard() {
  const { data } = await getTransactions({
    linkId: "ef513177-bba7-4ecb-ad5a-4b34fcc3ef45",
    accountId: "120e009a-d042-4279-b907-afce9cccbd4b",
    dateFrom: "2024-02-01",
    dateTo: "2024-05-30",
  });

  if (!data) {
    return null;
  }

  return (
    <>
      <Suspense
        fallback={
          <>
            <Skeleton className="h-8 w-36" />
            <Skeleton className="h-8 w-36" />
          </>
        }
      >
        <DescriptiveStatistics transactions={data} />
        <TransactionsChart transactions={data} />
        <TransactionsScattered transactions={data} />
        <TransactionHistory transactions={data} />
      </Suspense>
    </>
  );
}
