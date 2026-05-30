import { Medico } from "@/src/models/medico";
import { DefaultInput } from "../../DefaultInput";
import { Section } from "../../Section";
import { weekDaysMap } from "@/src/utils/weekDaysMap";
import { getAvailableHours } from "@/src/utils/getAvailableHours";
import stylesForm from "../../../styles/form.module.css";
import { CalendarIcon, ClockIcon, CrossIcon, UserIcon } from "lucide-react";
import { SelectInput } from "../../SelectInput";
import { DefaultBtn } from "../../DefaultBtn";

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

  const dateArr = date.split("-");
  const formatedDate = `${dateArr[2]}/${dateArr[1]}/${dateArr[0]}`;

  return (
    <Section>
      <form onSubmit={handleSubmit} className={stylesForm.container}>
        <DefaultInput
          id="odctor"
          name="odctor"
          label="Profissional"
          value={doctor.nome}
          icon={UserIcon}
          readOnly
        />

        <DefaultInput
          id="especialty"
          name="especialty"
          label="Especialidade"
          value={doctor.especialidade}
          icon={CrossIcon}
          readOnly
        />

        <DefaultInput
          id="day"
          name="day"
          label="Dia"
          value={formatedDate}
          icon={CalendarIcon}
          readOnly
        />

        <SelectInput name="time" icon={ClockIcon} required>
          <option value="">Selecione um horário </option>
          {schedules.map((h) => (
            <option key={h} value={h}>
              {h}
            </option>
          ))}
        </SelectInput>

        <DefaultBtn type="submit">Confirmar Consulta</DefaultBtn>
      </form>
    </Section>
  );
}
