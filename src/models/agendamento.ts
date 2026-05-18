import { Medico } from "./medico";
import { Paciente } from "./paciente";

export type Agendamento = {
  id: number;
  paciente: Paciente;
  medico: Medico;
  dataHora: string;
  status: "AGENDADO" | "CANCELADO";
}