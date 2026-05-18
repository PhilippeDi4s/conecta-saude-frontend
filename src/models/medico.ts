import { Disponibilidade } from "./disponibilidade";

export type Medico = {
  id: number;
  nome: string;
  especialidade: string;
  tempoMedioAtendimento: number;
  disponibilidades: Disponibilidade[];
}