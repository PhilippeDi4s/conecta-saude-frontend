"use client";

import { generateDayOfTheMonth } from "@/src/utils/generateDayOfTheMonth";
import { CalendarIcon } from "lucide-react";
import { useState, useRef, useEffect, useMemo } from "react";

const MONTHS = Array.from({ length: 12 }, (_, i) => {
  const name = new Date(2000, i).toLocaleString("pt-BR", { month: "long" });
  return {
    value: i,
    label: name.charAt(0).toUpperCase() + name.slice(1),
  };
});

const YEARS = [2026, 2027, 2028];

export function CalendarStrip() {
  const today = useMemo(() => new Date(), []);

  const [selectedDay, setSelectedDay] = useState<number>(today.getDate());
  const [selectedMonth, setSelectedMonth] = useState<number>(today.getMonth());
  const [selectedYear, setSelectedYear] = useState<number>(today.getFullYear());
  const [showPicker, setShowPicker] = useState<boolean>(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<(HTMLButtonElement | null)[]>([]);

  const days = useMemo(
    () => generateDayOfTheMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );

  const formattedMonthName = new Date(
    selectedYear,
    selectedMonth,
  ).toLocaleString("pt-BR", { month: "long" });

  const displayMonth =
    formattedMonthName.charAt(0).toUpperCase() + formattedMonthName.slice(1);

  const scrollToDay = (number: number) => {
    const container = scrollRef.current;
    const button = buttonsRef.current[number - 1];
    if (!container || !button) return;

    const containerRect = container.getBoundingClientRect();
    const buttonRect = button.getBoundingClientRect();
    const currentScroll = container.scrollLeft;
    const distanceToButton = buttonRect.left - containerRect.left;

    container.scrollTo({
      left: currentScroll + distanceToButton,
      behavior: "smooth",
    });
  };

  const selectDay = (number: number) => {
    setSelectedDay(number);
    scrollToDay(number);
  };

  const handleMonthChange = (month: number) => {
    setSelectedMonth(month);
    setSelectedDay(1);
  };

  const handleYearChange = (year: number) => {
    setSelectedYear(year);
    setSelectedDay(1);
  };

  useEffect(() => {
    scrollToDay(selectedDay);
  }, [selectedDay]);

  useEffect(() => {
    scrollToDay(today.getDate());
  }, [today]);

  return (
    <div className="flex flex-col gap-4">
      <div className="flex gap-4 items-center">
        <span className="font-semibold">
          {displayMonth} {selectedYear}
        </span>

        <button
          onClick={() => setShowPicker((prev) => !prev)}
          className="cursor-pointer"
        >
          <CalendarIcon
            className={showPicker ? "text-black" : "text-black/65"}
            size={18}
          />
        </button>
      </div>

      {showPicker && (
        <div className="flex gap-2">
          <select
            value={selectedMonth}
            onChange={(e) => handleMonthChange(Number(e.target.value))}
            className="border border-black/20 rounded-lg px-2 py-1 text-sm bg-white"
          >
            {MONTHS.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>

          <select
            value={selectedYear}
            onChange={(e) => handleYearChange(Number(e.target.value))}
            className="border border-black/20 rounded-lg px-2 py-1 text-sm bg-white"
          >
            {YEARS.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        </div>
      )}

      <div
        ref={scrollRef}
        className="w-full flex gap-3 overflow-x-auto pb-1 scrollbar-none"
      >
        {days.map(({ numero, diaSemana }) => {
          const isSelected = selectedDay === numero;

          return (
            <button
              key={numero}
              ref={(el) => {
                buttonsRef.current[numero - 1] = el;
              }}
              onClick={() => selectDay(numero)}
              className={
                isSelected
                  ? "cursor-pointer text-white bg-(--blue-800) px-3 py-1 rounded-2xl shrink-0"
                  : "cursor-pointer border border-black/70 rounded-full px-[.6rem] py-[.2rem] shrink-0 hover:bg-black/5 transition-colors"
              }
            >
              {numero}
              {isSelected && (
                <>
                  , <span className="text-white/60">{diaSemana}</span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
