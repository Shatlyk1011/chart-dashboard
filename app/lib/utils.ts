import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

type PercentDifference = {
  previousValue: number;
  currentValue: number;
};

export function getPercentDifference({ previousValue, currentValue }: PercentDifference): number {
  if (previousValue === 0) return currentValue > 0 ? Infinity : -Infinity;
  return ((currentValue - previousValue) / previousValue) * 100;
}
