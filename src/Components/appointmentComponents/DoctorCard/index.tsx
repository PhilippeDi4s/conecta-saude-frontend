import { Medico } from "@/src/models/medico";
import clsx from "clsx";
import { ArrowUpRightIcon, CircleCheckIcon, UserIcon } from "lucide-react";

const diasAbreviados: Record<string, string> = {
  SEGUNDA: "Seg",
  TERCA: "Ter",
  QUARTA: "Qua",
  QUINTA: "Qui",
  SEXTA: "Sex",
  SABADO: "Sáb",
  DOMINGO: "Dom",
};

type DoctorCardProps = {
  doctor: Medico;
  onSelect: (medico: Medico) => void;
  isSelected: boolean;
};

export function DoctorCard({ doctor, onSelect, isSelected }: DoctorCardProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(doctor)}
      className={clsx(
        "w-80",
        "shrink-0",
        "p-4",
        "rounded-2xl",
        "flex",
        "flex-col",
        "gap-3",
        "text-left",
        "cursor-pointer",
        "hover:brightness-20",
        "transition-all",
        "bg-[radial-gradient(circle,rgba(197,222,222,1)_100%,rgba(247,247,247,1)_0%)]",
        isSelected ? "outline-4 outline-teal-600" : "outline-none",
      )}
    >
      <div className="flex items-center justify-between gap-7">
        <div className="flex items-center gap-2">
          <UserIcon size={35} className="rounded-full" />
          <div className="flex flex-col">
            <span className="text-lg font-semibold">{doctor.nome}</span>
            <span className="text-black/70">{doctor.especialidade}</span>
          </div>
        </div>
        <ArrowUpRightIcon size={30} />
      </div>

      <div>
        <span className="flex gap-1 mb-2 text-green-700">
          <CircleCheckIcon /> Atende em
        </span>
        <div className="flex items-center justify-center gap-2">
          {doctor.disponibilidades.map((disponibilidade) => (
            <span
              key={disponibilidade.id}
              className="p-1 border rounded-2xl text-center flex-1 max-w-32"
            >
              {diasAbreviados[disponibilidade.diaSemana]}
            </span>
          ))}
        </div>
      </div>
    </button>
  );
}
