import TransactionHistory from "@/components/dashboard/transactions-histoy";
import TransactionsChart from "@/components/dashboard/transactions-chart";
import DescriptiveStatistics from "@/components/dashboard/descriptive-statistics";

export default function Dashboard() {
  return (
    <>
      <main className="flex flex-1 flex-col gap-4 p-4 md:gap-8 md:p-8">
        <DescriptiveStatistics />
        <TransactionsChart />
        <TransactionHistory />
      </main>
    </>
  );
}
