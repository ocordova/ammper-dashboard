"use client";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsExporting from "highcharts/modules/exporting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState, useMemo } from "react";
import Chart from "@/components/chart";
import { HighchartsReactProps } from "highcharts-react-official";
import { BelvoTransaction } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { groupByCategoryAndType, getColorForType } from "@/lib/chart-utils";
import CustomLegend from "./custom-legend";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

interface TransactionsChartProps {
  transactions: BelvoTransaction[];
}

interface ScatterData {
  category: string;
  averageAmount: number;
  totalAmount: number;
  type: string;
  yFormatted: string;
  zFormatted: string;
  color: string;
}

export default function TransactionsChart({
  transactions,
}: TransactionsChartProps) {
  const [scatterData, setScatterData] = useState<ScatterData[]>([]);

  useEffect(() => {
    const data = groupByCategoryAndType(transactions).map((data) => ({
      ...data,
      yFormatted: formatAmount(data.averageAmount),
      zFormatted: formatAmount(data.totalAmount),
      color: getColorForType(data.type),
    }));
    setScatterData(data);
  }, [transactions]);

  const options: HighchartsReactProps["options"] = useMemo(
    () => ({
      chart: {
        type: "bubble",
        plotBorderWidth: 1,
        zooming: {
          type: "xy",
        },
      },
      legend: {
        enabled: false,
      },
      title: {
        text: "",
      },
      xAxis: {
        categories: scatterData.map((data) => data.category),
      },
      yAxis: {
        title: {
          text: "Average Transaction Amount",
        },
      },
      tooltip: {
        useHTML: true,
        headerFormat: "<table>",
        pointFormat:
          "<tr><th>Category:</th><td>{point.category}</td></tr>" +
          "<tr><th>Average Amount:</th><td>{point.yFormatted}</td></tr>" +
          "<tr><th>Total Amount:</th><td>{point.zFormatted}</td></tr>" +
          "<tr><th>Type:</th><td>{point.type}</td></tr>",
        footerFormat: "</table>",
        followPointer: true,
      },
      plotOptions: {
        series: {
          dataLabels: {
            enabled: false,
          },
        },
        bubble: {
          minSize: 5,
          maxSize: 50,
        },
      },
      series: [
        {
          type: "bubble",
          name: "Transactions",
          data: scatterData.map((data) => ({
            x: scatterData.findIndex((d) => d.category === data.category),
            y: data.averageAmount,
            z: data.totalAmount,
            category: data.category,
            type: data.type,
            color: data.color,
            yFormatted: data.yFormatted,
            zFormatted: data.zFormatted,
          })),
        },
      ],
    }),
    [scatterData],
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transaction Summary by Category</CardTitle>
          <p className="text-sm text-muted-foreground">
            View average and total transaction amounts by category, with
            color-coded bubbles for inflows and outflows
          </p>
        </div>
      </CardHeader>
      <CardContent>
        <Chart options={options} highcharts={Highcharts} />
        <CustomLegend />
      </CardContent>
    </Card>
  );
}
