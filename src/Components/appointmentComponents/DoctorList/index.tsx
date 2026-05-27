import { useEffect, useRef } from "react";
import { DoctorCard } from "../DoctorCard";
import { Medico } from "@/src/models/medico";

interface DoctorListProps {
  doctors: Medico[];
  onSelect: (medico: Medico) => void;
  selectedId: number | null;
}

export function DoctorList({ doctors, onSelect, selectedId }: DoctorListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Record<number, HTMLDivElement | null>>({});

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) scrollRef.current.scrollLeft = 0;
    }, 0);
    return () => clearTimeout(timeout);
  }, [doctors]);

  useEffect(() => {
    if (selectedId === null) return;

    const card = cardRefs.current[selectedId];
    const container = scrollRef.current;

    if (card && container) {
      container.scrollTo({
        left: card.offsetLeft - container.offsetLeft,
        behavior: "smooth",
      });
    }
  }, [selectedId]);

  return (
    <div
      ref={scrollRef}
      className="w-full flex overflow-x-auto scrollbar-none gap-3 p-1"
    >
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          ref={(el) => {
            cardRefs.current[doctor.id] = el;
          }}
        >
          <DoctorCard
            doctor={doctor}
            onSelect={onSelect}
            isSelected={doctor.id === selectedId}
          />
        </div>
      ))}
    </div>
  );
}
