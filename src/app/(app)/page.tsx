"use client";

import { CalendarStrip } from "@/src/Components/agendaComponents/CalendarStrip";
import { Section } from "@/src/Components/Section";


export default function Agenda() {

  return (
    <Section className="flex flex-col gap-6">
      <CalendarStrip />
      <ul className="flex flex-col gap-6">
        <li className="w-full flex flex-col gap-1 p-4 shadow-[0px_2px_8px_.5px_rgba(0,0,0,0.28)] rounded-2xl">
          <h3 className="font-semibold">Dr. Carlos Souza</h3>
          <p className="mb-2 text-[15px] text-black/80">Dermatologia</p>
          <span className="text-(--blue-800) font-medium">09h00 - 10h00</span>
        </li>
      </ul>
    </Section>
  );
}
