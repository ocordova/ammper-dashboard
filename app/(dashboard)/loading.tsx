import { Skeleton } from "@/components/ui/skeleton";

const DescriptiveStatisticsMarkup = (
  <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-24 rounded-xl" />
    </div>
    <div className="flex flex-col space-y-3">
      <Skeleton className="h-24 rounded-xl" />
    </div>
  </div>
);

const TransactionsChartMarkup = (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-44 rounded-xl" />
  </div>
);

const TransactionsScatteredMarkup = (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-44 rounded-xl" />
  </div>
);

const TransactionHistoryMarkup = (
  <div className="flex flex-col space-y-3">
    <Skeleton className="h-44 rounded-xl" />
  </div>
);

export default function Loading() {
  return (
    <>
      {DescriptiveStatisticsMarkup}
      {TransactionsChartMarkup}
      {TransactionsScatteredMarkup}
      {TransactionHistoryMarkup}
    </>
  );
}
