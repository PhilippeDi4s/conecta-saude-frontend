import { Medico } from "@/src/models/medico";
import { DefaultInput } from "../../DefaultInput";
import { Section } from "../../Section";
import { weekDaysMap } from "@/src/utils/weekDaysMap";
import { getAvailableHours } from "@/src/utils/getAvailableHours";

interface AppointmentTimeFormProps {
  doctor: Medico;
  date: string;
  onSubmit: (dataHora: string) => void;
}

export function AppointmentTimeForm({
  doctor,
  date,
  onSubmit,
}: AppointmentTimeFormProps) {
  const dateDisponibility = doctor.disponibilidades.find((d) => {
    return d.diaSemana === weekDaysMap[new Date(date + "T12:00:00").getDay()];
  });

  const schedules = dateDisponibility
    ? getAvailableHours(
        dateDisponibility.horaInicio,
        dateDisponibility.horaFim,
        doctor.tempoMedioAtendimento,
      )
    : [];

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const time = (form.elements.namedItem("horario") as HTMLSelectElement)
      .value;
    onSubmit(`${date}T${time}:00`);
  }

  return (
    <Section>
      <form onSubmit={handleSubmit}>
        <DefaultInput
          id="medico"
          label="Nome do Médico"
          value={doctor.nome}
          readOnly
        />
        <DefaultInput
          id="especialidade"
          label="Especialidade"
          value={doctor.especialidade}
          readOnly
        />
        <DefaultInput id="dia" label="Dia" value={date} readOnly />

        <select name="horario" required>
          <option value="">Selecione um horário</option>
          {schedules.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </select>

        <button type="submit">Confirmar Agendamento</button>
      </form>
    </Section>
  );
}
