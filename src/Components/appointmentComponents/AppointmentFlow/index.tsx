"use client";

import { useState } from "react";
import { Medico } from "@/src/models/medico";
import { DoctorsView } from "../DoctorsView";
import { CalendarGrid } from "../CalendarGrid";
import { AppointmentTimeForm } from "../AppointmentTimeForm";

export function AppointmentFlow() {
  const [doctor, setDoctor] = useState<Medico | null>(null);
  const [date, setDate] = useState<string | null>(null);
  const [time, setTime] = useState<string | null>(null);

  return (
    <>
      <DoctorsView
        onSelect={(d) => {
          setDoctor(d);
          setDate(null);
          setTime(null);
        }}
        selectedId={doctor?.id ?? null}
      />

      {doctor && (
        <CalendarGrid
          onSelect={(d) => {
            setDate(d);
            setTime(null);
          }}
          disponibilidades={doctor.disponibilidades}
        />
      )}

      {doctor && date && (
        <AppointmentTimeForm date={date} doctor={doctor}/>
      )}
    </>
  );
}
