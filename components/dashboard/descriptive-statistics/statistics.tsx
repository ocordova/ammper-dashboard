import { useMemo } from "react";
import { calculateStatistics } from "@/lib/statistics";
import StatisticsCard from "./card";
import { BelvoTransaction } from "@/lib/definitions";

interface DescriptiveStatisticsProps {
  transactions: BelvoTransaction[];
}

export default function DescriptiveStatistics({
  transactions,
}: DescriptiveStatisticsProps) {
  const { mean, median, mode, stdDev } = useMemo(
    () => calculateStatistics(transactions),
    [transactions],
  );

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatisticsCard title="Mean" value={mean} />
      <StatisticsCard title="Median" value={median} />
      <StatisticsCard title="Mode" value={mode} />
      <StatisticsCard title="Standard Deviation" value={stdDev} />
    </div>
  );
}
