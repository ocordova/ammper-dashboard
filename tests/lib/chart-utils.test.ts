import "@testing-library/jest-dom";
import {
  formatDate,
  TimePeriod,
  groupByPeriodAndType,
  groupByCategoryAndType,
  getColorForType,
} from "../../lib/chart-utils";
import { BelvoTransaction, BelvoTransactionCategory } from "@/lib/definitions";
import { highchartColors } from "@/lib/highchart";

describe("formatDate", () => {
  it("should format a day correctly", () => {
    const dateString = "2021-01-02T00:00:00Z";
    const period: TimePeriod = "daily";
    const result = formatDate(dateString, period);
    expect(result).toBe("2021-01-01");
  });

  it("should format a week correctly", () => {
    const dateString = "2021-01-12T00:00:00Z";
    const period: TimePeriod = "weekly";
    const result = formatDate(dateString, period);
    expect(result).toBe("2021-02");
  });

  it("should format a month correctly", () => {
    const dateString = "2021-01-02T00:00:00Z";
    const period: TimePeriod = "monthly";
    const result = formatDate(dateString, period);
    expect(result).toBe("2021-01");
  });
});

describe("groupByPeriodAndType", () => {
  it("should group data by day", () => {
    const data = [
      {
        value_date: "2021-01-02T00:00:00Z",
        type: "INFLOW",
        amount: 100,
      },
      {
        value_date: "2021-01-02T00:00:00Z",
        type: "OUTFLOW",
        amount: 50,
      },
    ] as BelvoTransaction[];
    const period: TimePeriod = "daily";
    const result = groupByPeriodAndType(data, period);
    expect(result).toEqual({
      "2021-01-01": { INFLOW: 100, OUTFLOW: 50 },
    });
  });

  it("should group data by week", () => {
    const data = [
      {
        value_date: "2021-01-12T00:00:00Z",
        type: "INFLOW",
        amount: 100,
      },
      {
        value_date: "2021-01-12T00:00:00Z",
        type: "OUTFLOW",
        amount: 50,
      },
    ] as BelvoTransaction[];
    const period: TimePeriod = "weekly";
    const result = groupByPeriodAndType(data, period);
    expect(result).toEqual({
      "2021-02": { INFLOW: 100, OUTFLOW: 50 },
    });
  });

  it("should group data by month", () => {
    const data = [
      {
        value_date: "2021-01-02T00:00:00Z",
        type: "INFLOW",
        amount: 100,
      },
      {
        value_date: "2021-01-02T00:00:00Z",
        type: "OUTFLOW",
        amount: 50,
      },
    ] as BelvoTransaction[];
    const period: TimePeriod = "monthly";
    const result = groupByPeriodAndType(data, period);
    expect(result).toEqual({
      "2021-01": { INFLOW: 100, OUTFLOW: 50 },
    });
  });
});

describe("groupByCategoryAndType", () => {
  it("should group data by category", () => {
    const data = [
      {
        type: "INFLOW",
        amount: 100,
        category: BelvoTransactionCategory.BILLS_UTILITIES,
      },
      {
        type: "OUTFLOW",
        amount: 50,
        category: BelvoTransactionCategory.FOOD_GROCERIES,
      },
    ] as BelvoTransaction[];

    const result = groupByCategoryAndType(data);
    expect(result).toEqual([
      {
        category: BelvoTransactionCategory.BILLS_UTILITIES,
        averageAmount: 100,
        totalAmount: 100,
        type: "INFLOW",
      },
      {
        category: BelvoTransactionCategory.FOOD_GROCERIES,
        averageAmount: 50,
        totalAmount: 50,
        type: "OUTFLOW",
      },
    ]);
  });
});

describe("getColorForType", () => {
  it("should return a color for INFLOW", () => {
    const type = "INFLOW";
    const result = getColorForType(type);
    expect(result).toBe(highchartColors.emerald);
  });

  it("should return a color for OUTFLOW", () => {
    const type = "OUTFLOW";
    const result = getColorForType(type);
    expect(result).toBe(highchartColors.rose);
  });
});
