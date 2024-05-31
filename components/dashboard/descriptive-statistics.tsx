import { calculateStatistics } from "@/lib/statistics";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { BelvoTransaction } from "@/lib/definitions";

export default function DescriptiveStatistics({
  transactions,
}: {
  transactions: BelvoTransaction[];
}) {
  const { mean, median, mode, stdDev } = calculateStatistics(transactions);

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mean</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mean}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Median</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{median}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Mode</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{mode}</div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Standard Deviation
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{stdDev}</div>
        </CardContent>
      </Card>
    </div>
  );
}
