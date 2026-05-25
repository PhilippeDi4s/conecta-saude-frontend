import { CalendarStrip } from "@/src/Components/agendaComponents/CalendarStrip";
import { AgendaList } from "@/src/Components/agendaComponents/AgendaList";
import { Section } from "@/src/Components/Section";
import { getLoginSession } from "@/src/lib/login/manage-login";
import { Agendamento } from "@/src/models/agendamento";
import api from "@/src/services/api/api";
import { redirect } from "next/navigation";
import { AgendaView } from "@/src/Components/agendaComponents/AgendaView";

type SessionPayload = {
  id: number;
  username: string;
  useremail: string;
  expiresAt: string;
};

export default async function Agenda() {
  const session = (await getLoginSession()) as SessionPayload | false;

  if (!session) redirect("/auth/register");

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
