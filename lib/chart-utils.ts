import { BelvoTransaction } from "@/lib/definitions";
import { format, parseISO, startOfISOWeek, addDays } from "date-fns";
import { highchartColors } from "./highchart";

export type TimePeriod = "daily" | "weekly" | "monthly";

export const formatDate = (date: string, period: TimePeriod): string => {
  const dateObj = parseISO(date);
  return {
    daily: format(dateObj, "yyyy-MM-dd"),
    weekly: format(dateObj, "yyyy-II"),
    monthly: format(dateObj, "yyyy-MM"),
  }[period];
};

export const groupByPeriodAndType = (
  data: BelvoTransaction[],
  period: TimePeriod,
) => {
  const groupedData: { [key: string]: { INFLOW: number; OUTFLOW: number } } =
    {};

  data.forEach((entry) => {
    const date = formatDate(entry.value_date, period);

    if (!groupedData[date]) {
      groupedData[date] = { INFLOW: 0, OUTFLOW: 0 };
    }
    groupedData[date][entry.type] += entry.amount;
  });

  return groupedData;
};

export const convertWeekToDate = (weekYear: string): Date => {
  const [year, week] = weekYear.split("-").map(Number);
  const firstDayOfYear = new Date(year, 0, 1);
  const firstISOWeekDay = startOfISOWeek(firstDayOfYear);
  return addDays(firstISOWeekDay, (week - 1) * 7);
};

export const groupByCategoryAndType = (data: BelvoTransaction[]) => {
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

export const getColorForType = (type: string) => {
  return type === "INFLOW" ? highchartColors.emerald : highchartColors.rose;
};
