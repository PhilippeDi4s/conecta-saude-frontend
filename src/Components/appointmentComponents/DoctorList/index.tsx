import { Medico } from "@/src/models/medico";
import { ArrowUpIcon, CircleCheckIcon, UserIcon } from "lucide-react";
import { useEffect, useRef } from "react";

type DoctorListProps = {
  doctors: Medico[];
};

const diasAbreviados: Record<string, string> = {
  SEGUNDA: "Seg",
  TERCA: "Ter",
  QUARTA: "Qua",
  QUINTA: "Qui",
  SEXTA: "Sex",
  SABADO: "Sáb",
  DOMINGO: "Dom",
};

export function DoctorList({ doctors }: DoctorListProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (scrollRef.current) {
        scrollRef.current.scrollLeft = 0;
      }
    }, 0);

    return () => clearTimeout(timeout);
  }, [doctors]);
  
  return (
    <div
      ref={scrollRef}
      className="w-full flex overflow-x-auto scrollbar-none gap-3"
    >
      {doctors.map((doctor) => (
        <div
          key={doctor.id}
          className="shrink-0 p-4 rounded-2xl flex flex-col gap-3 bg-[radial-gradient(circle,rgba(197,222,222,1)_100%,rgba(247,247,247,1)_0%)]"
        >
          <div className="flex items-center justify-between gap-7">
            <div className="flex items-center gap-2">
              <UserIcon size={35} className="rounded-[50%]" />
              <div className="flex flex-col">
                <span className="text-lg font-semibold">{doctor.nome}</span>
                <span className="text-black/70">{doctor.especialidade}</span>
              </div>
            </div>
            <ArrowUpIcon size={30} className="rotate-45" />
          </div>
          <div>
            <span className="flex gap-1 mb-2 text-green-700">
              <CircleCheckIcon /> Atende em
            </span>
            <div className="flex items-center justify-center gap-2">
              {doctor.disponibilidades.map((disponibilidade) => (
                <span
                  key={disponibilidade.id}
                  className="p-1  border rounded-2xl text-center flex-1 max-w-32"
                >
                  {diasAbreviados[disponibilidade.diaSemana]}
                </span>
              ))}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
