import "@testing-library/jest-dom";
import {
  sortByValueDate,
  formatAmount,
  formatDateRange,
  Period,
} from "../../lib/utils";
import { BelvoTransaction } from "@/lib/definitions";

describe("sortByValueDate", () => {
  it("should sort transactions by value date", () => {
    const data = [
      {
        value_date: "2021-01-14T00:00:00Z",
        type: "INFLOW",
        amount: 100,
      },
      {
        value_date: "2021-01-14T00:00:00Z",
        type: "OUTFLOW",
        amount: 50,
      },
    ] as BelvoTransaction[];
    const result = data.sort(sortByValueDate);
    expect(result[0].value_date).toBe("2021-01-14T00:00:00Z");
  });
});

describe("formatAmount", () => {
  it("should format an amount correctly", () => {
    const amount = 1000;
    const result = formatAmount(amount);
    expect(result).toBe("$1,000.00");
  });
});

describe("formatDateRange", () => {
  it("should format a date range correctly", () => {
    const start = "2021-01-01T00:00:00Z";
    const end = "2021-01-31T00:00:00Z";
    const period: Period = {
      from: "2021-01-01T00:00:00Z",
      to: "2021-01-31T00:00:00Z",
    };
    const result = formatDateRange(period);
    expect(result).toBe("Dec 31 - Jan 30, 2021");
  });
});
