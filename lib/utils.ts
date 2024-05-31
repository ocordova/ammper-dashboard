import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { BelvoTransaction } from "./definitions";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function sortByAccountingDate(a: BelvoTransaction, b: BelvoTransaction) {
  return a.accounting_date > b.accounting_date ? -1 : 1;
}
