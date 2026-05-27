import { Section } from "@/src/Components/Section";
import { Agendamento } from "@/src/models/agendamento";
import api from "@/src/services/api/api";
import { AgendaView } from "@/src/Components/agendaComponents/AgendaView";
import { requireSession } from "@/src/lib/login/require-session";

export default async function Agenda() {
  const session = await requireSession();

  let agendamentos: Agendamento[] = [];

  try {
    const response = await api.get<Agendamento[]>(
      `/agendamentos/paciente/${session.id}`,
    );
    agendamentos = response.data;
  } catch (e) {
    console.error("Erro ao buscar agendamentos:", e);
  }

  return (
    <Section className="flex flex-col gap-6">
      <AgendaView agendamentos={agendamentos} />
    </Section>
  );
}
