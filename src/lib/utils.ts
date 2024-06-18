import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function roundNumber(value: number | string | null) {
  if (typeof value === "number") {
    return parseFloat(value.toFixed(2));
  } else if (typeof value === "string") {
    const num = parseFloat(value);
    const rounded = parseFloat(num.toFixed(2));
    return rounded;
  }
  return value;
}

export function convertDate(date: Date): string {
  const timestampDate = new Date(date);
  const year = timestampDate.getFullYear();
  const month = timestampDate.getMonth() + 1;
  const day = timestampDate.getDate();

  const formattedDate = `${year}/${month}/${day}`;
  return formattedDate;
}

export const PRICE_ID = "price_1PT1xBDFuo2gr4uaEXYoRJj6";
