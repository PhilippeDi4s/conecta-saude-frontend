export function generateDayOfTheMonth(month: number, year: number) {
  const totalDays = new Date(year, month + 1, 0).getDate();
  const weekDays = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];

  return Array.from({ length: totalDays }, (_, i) => {
    const date = new Date(year, month, i + 1);
    return {
      numero: i + 1,
      diaSemana: weekDays[date.getDay()],
    };
  });
}