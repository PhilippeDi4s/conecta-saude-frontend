import { CalendarStrip } from "@/src/Components/agendaComponents/CalendarStrip";
import { AgendaList } from "@/src/Components/agendaComponents/AgendaList";
import { Section } from "@/src/Components/Section";
// import { getLoginSession } from "@/src/lib/login/manage-login";
// import { Agendamento } from "@/src/models/agendamento";
// import api from "@/src/services/api/api";
// import { redirect } from "next/navigation";

export default async function Agenda() {
  // const session = await getLoginSession();

  // if (!session) redirect("/auth/register");

  // let response;
  // try {
  //   response = await api.get<Agendamento[]>(
  //     `agendamentos/paciente/${session.id}`,
  //   );
  // } catch (e) {
  //   return {
  //     succses: false,
  //     message: "Erro ao conectar com o servidor. Tente novamente.",
  //     error: `Error ${e}`,
  //   };
  // }

  return (
    <Section className="flex flex-col gap-6">
      <CalendarStrip />
        <AgendaList agendamentos={[
          
        ]} />
    </Section>
  );
}
