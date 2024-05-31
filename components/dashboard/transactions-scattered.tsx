"use client";
import Highcharts from "highcharts";
import HighchartsMore from "highcharts/highcharts-more";
import HighchartsExporting from "highcharts/modules/exporting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Chart from "@/components/chart";
import { HighchartsReactProps } from "highcharts-react-official";
import { BelvoTransaction } from "@/lib/definitions";
import { formatAmount } from "@/lib/utils";
import { highchartColors } from "@/lib/highchart";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
  HighchartsMore(Highcharts);
}

const groupByCategoryAndType = (data: BelvoTransaction[]) => {
  const groupedData: {
    [key: string]: {
      totalAmount: number;
      count: number;
      type: string;
    };
  } = {};

  data.forEach((entry) => {
    const category = entry.category || "Unknown";
    if (!groupedData[category]) {
      groupedData[category] = { totalAmount: 0, count: 0, type: entry.type };
    }
    groupedData[category].totalAmount += entry.amount;
    groupedData[category].count += 1;
  });

  const result = Object.keys(groupedData).map((category) => {
    const { totalAmount, count, type } = groupedData[category];
    return {
      category,
      averageAmount: totalAmount / count,
      totalAmount,
      type,
    };
  });

  return result;
};

const getColorForType = (type: string) => {
  return type === "INFLOW" ? highchartColors.emerald : highchartColors.rose;
};

const CustomLegendMarkup = (
  <div
    id="custom-legend"
    className="flex flex-row items-center justify-center gap-x-1.5"
  >
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm">
      <svg
        className="h-2 w-2 fill-emerald-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Inflow
    </span>
    <span className="inline-flex items-center gap-x-1.5 rounded-full px-2 py-1 text-sm">
      <svg
        className="h-2 w-2 fill-rose-500"
        viewBox="0 0 6 6"
        aria-hidden="true"
      >
        <circle cx={3} cy={3} r={3} />
      </svg>
      Outflow
    </span>
  </div>
);

export default function TransactionsChart({
  transactions,
}: {
  transactions: BelvoTransaction[];
}) {
  const [scatterData, setScatterData] = useState<any[]>([]);

  useEffect(() => {
    const data = groupByCategoryAndType(transactions);
    setScatterData(data);
  }, [transactions]);

  const options: HighchartsReactProps["options"] = {
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
          color: getColorForType(data.type),
          yFormatted: formatAmount(data.averageAmount),
          zFormatted: formatAmount(data.totalAmount),
        })),
      },
    ],
  };

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
        {CustomLegendMarkup}
      </CardContent>
    </Card>
  );
}
