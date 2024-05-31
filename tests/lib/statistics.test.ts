import "@testing-library/jest-dom";
import { BelvoTransaction } from "@/lib/definitions";
import {
  formatNumber,
  calculateMean,
  calculateMedian,
  calculateMode,
  calculateStandardDeviation,
} from "../../lib/statistics";

describe("formatNumber", () => {
  it("should format a 4 digit number correctly", () => {
    const number = 1000;
    const result = formatNumber(number);
    expect(result).toBe("1,000.00");
  });

  it("should format a 7 digit number correctly", () => {
    const number = 1000000;
    const result = formatNumber(number);
    expect(result).toBe("1,000,000.00");
  });

  it("should format a 10 digit number correctly", () => {
    const number = 1000000000;
    const result = formatNumber(number);
    expect(result).toBe("1,000,000,000.00");
  });
});

describe("calculateMean", () => {
  it("should calculate the mean of an array of numbers", () => {
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
    const result = calculateMean(data);
    expect(result).toBe(75);
  });

  it("should return 0 if the array is empty", () => {
    const data = [] as BelvoTransaction[];
    const result = calculateMean(data);
    expect(result).toBe(0);
  });
});

describe("calculateMedian", () => {
  it("should calculate the median of an array of numbers", () => {
    const amounts = [1, 2, 3, 4, 5];
    const result = calculateMedian(amounts);
    expect(result).toBe(3);
  });

  it("should calculate the median of an array of numbers with an even length", () => {
    const amounts = [1, 2, 3, 4, 5, 6];
    const result = calculateMedian(amounts);
    expect(result).toBe(3.5);
  });
});

describe("calculateMode", () => {
  it("should calculate the mode of an array of numbers", () => {
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
      {
        value_date: "2021-01-02T00:00:00Z",
        type: "INFLOW",
        amount: 100,
      },
    ] as BelvoTransaction[];
    const result = calculateMode(data);
    expect(result).toBe(100);
  });

  it("should return undefined if the array is empty", () => {
    const data = [] as BelvoTransaction[];
    const result = calculateMode(data);
    expect(result).toBeUndefined();
  });
});

describe("calculateStandardDeviation", () => {
  it("should calculate the standard deviation of an array of numbers", () => {
    const mean = 75;
    const amounts = [100, 50];
    const result = calculateStandardDeviation(mean, amounts);
    expect(result).toBe(25);
  });

  it("should return 0 if the array is empty", () => {
    const mean = 0;
    const amounts: number[] = [];
    const result = calculateStandardDeviation(mean, amounts);
    expect(result).toBe(0);
  });
});
