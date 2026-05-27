"use client";

import { useState } from "react";
import { Medico } from "@/src/models/medico";
import { DoctorsView } from "../DoctorsView";
import { CalendarGrid } from "../CalendarGrid";

export function AppointmentFlow() {
  const [doctor, setDoctor] = useState<Medico | null>(null);
  const [day, setDay] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <>
      <DoctorsView
        onSelect={(d) => {
          setDoctor(d);
          setDay(null);
          setTime(null);
        }}
        selectedId={doctor?.id ?? null}
      />

      {doctor && (
        <CalendarGrid
          onSelect={(d) => {
            setDay(d);
            setTime(null);
          }}
          disponibilidades={doctor.disponibilidades}
        />
      )}
    </>
  );
}
