"use client";

import { useState } from "react";
import { CalendarStrip } from "./CalendarStrip";
import { AgendaList } from "./AgendaList";
import { Agendamento } from "@/src/models/agendamento";
import { formatDateToString } from "@/src/utils/formatDateToString";
import { AppointmentCard } from "./AppointmentCard";

type Props = {
  agendamentos: Agendamento[];
};

export function AgendaView({ agendamentos }: Props) {
  const today = new Date();
  const todayStr = formatDateToString(
    today.getFullYear(),
    today.getMonth(),
    today.getDay(),
  );
  const [selectedDate, setSelectedDate] = useState<string | null>(todayStr);

  const filtered = selectedDate
    ? agendamentos.filter((a) => a.dataHora.startsWith(selectedDate))
    : agendamentos;

  return (
    <>
      <CalendarStrip onDateChange={setSelectedDate} />
      {filtered.length > 0 ? (
        <AgendaList agendamentos={filtered} />
      ) : (
        <AppointmentCard as="div" className="text-center py-10">
          <h2 className="text-2xl font-bold mb-2">Tudo certo por aqui!</h2>
          <span className="text-black/65">
            Não há consultas agendadas para hoje.
          </span>
        </AppointmentCard>
      )}
    </>
  );
}
