import { Agendamento } from "@/src/models/agendamento";

type AgendaListProps = {
  agendamentos: Agendamento[];
};
export function AgendaList({ agendamentos }: AgendaListProps) {
  return (
    <ul className="flex flex-col gap-6">
      {agendamentos.map((agendamento) => (
        <li
          key={agendamento.id}
          className="w-full flex flex-col gap-1 p-4 shadow-[0px_2px_8px_.5px_rgba(0,0,0,0.28)] rounded-2xl"
        >
          <h3 className="font-semibold">Doutor(a) {agendamento.medico.nome}</h3>
          <p className="mb-2 text-[15px] text-black/80">
            {agendamento.medico.especialidade}
          </p>
          <span className="text-(--blue-800) font-medium">
            {agendamento.dataHora}
          </span>
        </li>
      ))}
    </ul>
  );
}