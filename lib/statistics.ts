import { BelvoTransaction } from "./definitions";

const formatNumber = (num: number | undefined) => {
  if (!num) return "-";
  return new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(num);
};

export const calculateStatistics = (data: BelvoTransaction[]) => {
  const amounts = data.map((transaction) => transaction.amount);
  const mean = amounts.reduce((a, b) => a + b, 0) / amounts.length;
  const median = amounts.sort((a, b) => a - b)[Math.floor(amounts.length / 2)];
  const mode = amounts
    .sort(
      (a, b) =>
        amounts.filter((v) => v === a).length -
        amounts.filter((v) => v === b).length,
    )
    .pop();
  const variance =
    amounts.reduce((sum, current) => sum + (current - mean) ** 2, 0) /
    amounts.length;
  const stdDev = Math.sqrt(variance);

  return {
    mean: formatNumber(mean),
    median: formatNumber(median),
    mode: formatNumber(mode),
    stdDev: formatNumber(stdDev),
  };
};
