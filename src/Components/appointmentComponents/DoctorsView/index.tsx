"use client";

import { useEffect, useState } from "react";
import { Medico } from "@/src/models/medico";
import { DoctorList } from "../DoctorList";
import { SpecialtyStrip } from "../SpecialtyStrip";
import { getDoctorsBySpecialty } from "@/src/app/actions/getDoctorsBySpecialty";
import { SPECIALTIES, Specialty } from "@/src/constants/specialties";
import { getDoctorsAction } from "@/src/app/actions/getDoctorsAction";
import { Section } from "../../Section";

export function DoctorsView() {
  const [selectedSpecialty, setSelectedSpecialty] =
    useState<Specialty>("Todos");
  const [doctors, setDoctors] = useState<Medico[]>([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (selectedSpecialty === "Todos") {
        const data = await getDoctorsAction();
        setDoctors(data);
      } else {
        const data = await getDoctorsBySpecialty(selectedSpecialty);
        setDoctors(data);
      }
    };

    fetchDoctors();
  }, [selectedSpecialty]);

  return (
    <Section className="flex flex-col gap-4">
      <SpecialtyStrip
        specialties={SPECIALTIES}
        onSpecialtyChange={setSelectedSpecialty}
      />
      <DoctorList doctors={doctors} />
    </Section>
  );
}
