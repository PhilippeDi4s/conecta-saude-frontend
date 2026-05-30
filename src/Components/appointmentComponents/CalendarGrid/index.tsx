"use client";
import { ArrowLeftIcon, ArrowRightIcon } from "lucide-react";
import { useToday } from "@/src/hooks/useToday";
import { getMonths } from "@/src/utils/getMonths";
import { useState } from "react";
import { useMemo } from "react";
import { generateDayOfTheMonth } from "@/src/utils/generateDayOfTheMonth";
import { Section } from "../../Section";
import clsx from "clsx";
import { Disponibilidade } from "@/src/models/disponibilidade";
import { weekDaysMap } from "@/src/utils/weekDaysMap";

const months = getMonths();

interface CalendarGridProps {
  disponibilidades: Disponibilidade[];
  onSelect: (data: string) => void; // formato: "2026-06-10"
}

export function CalendarGrid({
  disponibilidades,
  onSelect,
}: CalendarGridProps) {
  const { day, month, year } = useToday();

  const [selectedDay, setSelectedDay] = useState<number>(day);
  const [selectedMonth, setSelectedMonth] = useState<number>(month);
  const [selectedYear, setSelectedYear] = useState<number>(year);

  const diasDisponiveis = useMemo(
    () => new Set(disponibilidades.map((d) => d.diaSemana)),
    [disponibilidades],
  );

  const days = useMemo(
    () => generateDayOfTheMonth(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );

  const firstDayOfMonth = new Date(selectedYear, selectedMonth, 1).getDay();

  const weeks = useMemo(() => {
    const cells = [...Array(firstDayOfMonth).fill(null), ...days];
    const result = [];
    for (let i = 0; i < cells.length; i += 7) {
      result.push(cells.slice(i, i + 7));
    }
    return result;
  }, [days, firstDayOfMonth]);

  function isDayBtnDisabled(calendarDay: number): boolean {
    // Bloqueia dias que o médico não atende
    const date = new Date(selectedYear, selectedMonth, calendarDay);
    const diaSemana = weekDaysMap[date.getDay()];
    if (!diasDisponiveis.has(diaSemana)) return true;

    // Bloqueia dias passados
    if (selectedYear === year && selectedMonth === month && calendarDay < day) {
      return true;
    }

    return false;
  }

  function handleDaySelect(numero: number) {
    setSelectedDay(numero);

    const dataFormatada = `${selectedYear}-${String(selectedMonth + 1).padStart(2, "0")}-${String(numero).padStart(2, "0")}`;
    onSelect(dataFormatada);
  }

  function isBackMonthBtnDisabled(): boolean {
    if (selectedYear > year) {
      return false;
    }
    if (selectedMonth === month + 1 || selectedMonth > month + 1) {
      return false;
    }
    return true;
  }

  function isNextMonthBtnDisabled(): boolean {
    if (selectedMonth > month + 2) {
      return true;
    }
    return false;
  }

  function handleMonthChange(nextMonth: number) {
    let nextYear = selectedYear;

    if (nextMonth > 11) {
      nextMonth = 0;
      nextYear += 1;
    }

    if (nextMonth < 0) {
      nextMonth = 11;
      nextYear -= 1;
    }

    setSelectedMonth(nextMonth);
    setSelectedYear(nextYear);

    if (nextMonth === month && nextYear === year) {
      setSelectedDay(day);
    } else {
      setSelectedDay(1);
    }
  }
  const buttonStyle =
    "cursor-pointer disabled:opacity-50 disabled:cursor-default";

  return (
    <Section>
      <div className="w-full flex items-center justify-between">
        <button
          className={buttonStyle}
          onClick={() => handleMonthChange(selectedMonth - 1)}
          disabled={isBackMonthBtnDisabled()}
        >
          <ArrowLeftIcon />
        </button>
        <span className="font-bold text-2xl">
          {months[selectedMonth]?.label ?? ""}, {selectedYear}
        </span>
        <button
          className={buttonStyle}
          onClick={() => handleMonthChange(selectedMonth + 1)}
          disabled={isNextMonthBtnDisabled()}
        >
          <ArrowRightIcon />
        </button>
      </div>

      <table className="w-full table-fixed border-separate border-spacing-3">
        <thead>
          <tr>
            <th>D</th>
            <th>S</th>
            <th>T</th>
            <th>Q</th>
            <th>Q</th>
            <th>S</th>
            <th>S</th>
          </tr>
        </thead>
        <tbody>
          {weeks.map((week, weekIndex) => (
            <tr key={weekIndex}>
              {week.map((day, dayIndex) => {
                const isSelected = day?.numero === selectedDay;
                return (
                  <td key={dayIndex}>
                    {day && (
                      <button
                        className={clsx(
                          "cursor-pointer w-8 h-8 mx-auto flex items-center justify-center rounded-[50%] p-[.2rem]",
                          "disabled:bg-[#e4eaef] disabled:text-gray-400 disabled:border-black/30 disabled:cursor-default",
                          isSelected
                            ? "bg-(--blue-800) text-white"
                            : "border border-(--blue-800) bg-transparent",
                        )}
                        onClick={() => handleDaySelect(day.numero)}
                        disabled={isDayBtnDisabled(day.numero)}
                      >
                        {day.numero}
                      </button>
                    )}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </Section>
  );
}
