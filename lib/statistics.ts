import { BelvoTransaction } from "./definitions";

export const formatNumber = (num: number | undefined | null) => {
  if (!num) return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const calculateMean = (data: BelvoTransaction[]) => {
  if (data.length === 0) return 0;
  return data.reduce((a, b) => a + b.amount, 0) / data.length;
};

export const calculateMedian = (amounts: number[]) => {
  amounts.sort((a, b) => a - b);
  const middle = Math.floor(amounts.length / 2);

  if (amounts.length % 2 === 0) {
    // Even number of elements: average the two middle elements
    return (amounts[middle - 1] + amounts[middle]) / 2;
  } else {
    // Odd number of elements: return the middle element
    return amounts[middle];
  }
};

export const calculateMode = (data: BelvoTransaction[]) => {
  const transaction = data
    .sort(
      (a, b) =>
        data.filter((v) => v === a).length - data.filter((v) => v === b).length,
    )
    .pop();

  return transaction?.amount;
};

export const calculateStandardDeviation = (mean: number, amounts: number[]) => {
  if (amounts.length === 0) return 0;
  const n = amounts.length;
  return Math.sqrt(
    amounts.map((x) => Math.pow(x - mean, 2)).reduce((a, b) => a + b) / n,
  );
};

export const calculateStatistics = (data: BelvoTransaction[]) => {
  const amounts = data.map((transaction) => transaction.amount);
  const mean = calculateMean(data);
  const median = calculateMedian(amounts);
  const mode = calculateMode(data);
  const stdDev = calculateStandardDeviation(mean, amounts);

  return {
    mean: formatNumber(mean),
    median: formatNumber(median),
    mode: formatNumber(mode),
    stdDev: formatNumber(stdDev),
  };
};
