import { Agendamento } from "@/src/models/agendamento";
import { AppointmentCard } from "../AppointmentCard";

type AgendaListProps = {
  agendamentos: Agendamento[];
};

const formatarHorario = (dataHora: string) => {
  return new Date(dataHora).toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const formatarHorarioFim = (dataHora: string, duracaoMinutos: number) => {
  const data = new Date(dataHora);
  data.setMinutes(data.getMinutes() + duracaoMinutos);
  return data.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
  });
};

const status: Record<Agendamento["status"], string> = {
  AGENDADO: "text-green-600",
  CANCELADO: "text-red-600",
};

export function AgendaList({ agendamentos }: AgendaListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {agendamentos.map((agendamento) => (
        <AppointmentCard
          as="li"
          key={agendamento.id}
        >
          <h3 className="font-semibold">Doutor(a) {agendamento.medico.nome}</h3>
          <p className="mb-2 text-[15px] text-black/80">
            {agendamento.medico.especialidade}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-(--blue-800) font-medium">
              {formatarHorario(agendamento.dataHora)} -{" "}
              {formatarHorarioFim(
                agendamento.dataHora,
                agendamento.medico.tempoMedioAtendimento,
              )}
            </span>
            <span className={`${status[agendamento.status]}`}>
              {agendamento.status}
            </span>
          </div>
        </AppointmentCard>
      ))}
    </ul>
  );
}
