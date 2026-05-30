export function getAvailableHours(
  stratTime: string,
  endTime: string,
  avarageTime: number,
) {
  const availableTimes = [];
  const [hStart, mStart] = stratTime.split(":").map(Number);
  const [hEnd, mEnd] = endTime.split(":").map(Number);

  let startMinutes = hStart * 60 + mStart;
  const endMinutes = hEnd * 60 + mEnd;

  while (startMinutes < endMinutes){
    const h = String(Math.floor(startMinutes / 60)).padStart(2, "0")
    const m = String((startMinutes % 60)).padStart(2, "0")
    availableTimes.push(`${h}:${m}`)
    startMinutes+=avarageTime
  }
  
  return availableTimes; 
}
