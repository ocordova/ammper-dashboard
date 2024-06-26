"use client";
import Highcharts from "highcharts";
import HighchartsExporting from "highcharts/modules/exporting";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";
import { AreaChart, BarChart3, LineChart } from "lucide-react";
import { useEffect, useState, useMemo, useCallback } from "react";
import Chart from "@/components/chart";
import { HighchartsReactProps } from "highcharts-react-official";
import { BelvoTransaction } from "@/lib/definitions";
import {
  groupByPeriodAndType,
  convertWeekToDate,
  TimePeriod,
} from "@/lib/chart-utils";
import { highchartColors } from "@/lib/highchart";

if (typeof Highcharts === "object") {
  HighchartsExporting(Highcharts);
}

enum ChartType {
  area = "area",
  line = "line",
  bar = "column",
}

interface TransactionsChartProps {
  transactions: BelvoTransaction[];
}

export default function TransactionsChart({
  transactions,
}: TransactionsChartProps) {
  const [chartType, setChartType] = useState<ChartType>(ChartType.area);
  const [timePeriod, setTimePeriod] = useState<TimePeriod>("daily");
  const [incomes, setIncomes] = useState<[number, number][]>([]);
  const [outcomes, setOutcomes] = useState<[number, number][]>([]);

  const groupedData = useMemo(
    () => groupByPeriodAndType(transactions, timePeriod),
    [transactions, timePeriod],
  );

  useEffect(() => {
    const mapData = (type: "INFLOW" | "OUTFLOW"): [number, number][] =>
      Object.keys(groupedData)
        .map((date) => {
          const timestamp =
            timePeriod === "weekly"
              ? convertWeekToDate(date).getTime()
              : new Date(date).getTime();
          return [timestamp, groupedData[date][type]] as [number, number];
        })
        .sort((a, b) => a[0] - b[0]);

    setIncomes(mapData("INFLOW"));
    setOutcomes(mapData("OUTFLOW"));
  }, [groupedData, timePeriod]);

  const onTypeChange = useCallback((type: ChartType) => {
    setChartType(type);
  }, []);

  const onTimePeriodChange = useCallback((period: TimePeriod) => {
    setTimePeriod(period);
  }, []);

  const options: HighchartsReactProps["options"] = useMemo(
    () => ({
      title: {
        text: "",
      },
      xAxis: {
        type: "datetime",
        title: {
          text: "Date",
        },
        labels: {
          formatter: function () {
            if (timePeriod === "weekly") {
              return Highcharts.dateFormat("%Y-%m-%d", Number(this.value));
            } else if (timePeriod === "monthly") {
              return Highcharts.dateFormat("%Y-%m", Number(this.value));
            } else {
              return Highcharts.dateFormat("%e %b", Number(this.value));
            }
          },
        },
      },
      yAxis: {
        title: {
          text: "Amount",
        },
      },
      tooltip: {
        formatter: function () {
          const seriesName = this.series.name;
          const sign = seriesName === "Inflow" ? "+" : "-";
          const amount = this.y?.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          });
          return `${seriesName}: ${sign}$${amount}`;
        },
      },
      series: [
        {
          name: "Inflow",
          data: incomes,
          type: chartType,
          color: highchartColors.green,
        },
        {
          name: "Outflow",
          data: outcomes,
          type: chartType,
          color: highchartColors.rose,
        },
      ],
    }),
    [chartType, incomes, outcomes, timePeriod],
  );

  return (
    <Card>
      <CardHeader className="flex flex-col items-center justify-between space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
        <div className="grid gap-2">
          <CardTitle>Transaction Trends Over Time</CardTitle>
          <p className="text-sm text-muted-foreground">
            Explore how incomes and outcomes vary over daily, weekly, or monthly
            periods
          </p>
        </div>
        <div className="flex space-x-2">
          <Select
            defaultValue={chartType}
            onValueChange={(value) => onTypeChange(value as ChartType)}
          >
            <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
              <SelectValue placeholder="Chart type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value={ChartType.area}>
                <div className="flex items-center">
                  <AreaChart className="mr-2 size-4 shrink-0" />
                  <p className="line-clamp-1">Area chart</p>
                </div>
              </SelectItem>
              <SelectItem value={ChartType.line}>
                <div className="flex items-center">
                  <LineChart className="mr-2 size-4 shrink-0" />
                  <p className="line-clamp-1">Line chart</p>
                </div>
              </SelectItem>
              <SelectItem value={ChartType.bar}>
                <div className="flex items-center">
                  <BarChart3 className="mr-2 size-4 shrink-0" />
                  <p className="line-clamp-1">Bar chart</p>
                </div>
              </SelectItem>
            </SelectContent>
          </Select>
          <Select
            defaultValue={timePeriod}
            onValueChange={(value) => onTimePeriodChange(value as TimePeriod)}
          >
            <SelectTrigger className="h-9 rounded-md px-3 lg:w-auto">
              <SelectValue placeholder="Time period" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="daily">
                <p className="line-clamp-1">Daily</p>
              </SelectItem>
              <SelectItem value="weekly">
                <p className="line-clamp-1">Weekly</p>
              </SelectItem>
              <SelectItem value="monthly">
                <p className="line-clamp-1">Monthly</p>
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <Chart options={options} highcharts={Highcharts} />
      </CardContent>
    </Card>
  );
}
