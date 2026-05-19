import { useMemo } from "react";

export function useToday() {
  const today = useMemo(() => new Date(), []);

  return {
    day: today.getDate(),
    month: today.getMonth(),
    year: today.getFullYear(),
    isPast: (d: number, m: number, y: number) =>
      new Date(y, m, d) <
      new Date(today.getFullYear(), today.getMonth(), today.getDate()),
  };
}
