// SpecialtyStrip.tsx
"use client";

import { useState } from "react";
import { HorizontalStrip, StripItem } from "../../HorizontalStrip";
import { Specialty } from "@/src/constants/specialties";

type SpecialtyStripProps = {
  specialties: readonly string[];
  onSpecialtyChange: (specialty: Specialty) => void;
};

export function SpecialtyStrip({
  specialties,
  onSpecialtyChange,
}: SpecialtyStripProps) {
  const [selected, setSelected] = useState<string>(specialties[0]);

const handleSelect = (specialty: string) => {
  setSelected(specialty);
  onSpecialtyChange(specialty as Specialty);
};

  return (
    <HorizontalStrip
      items={specialties.map(
        (specialty): StripItem<string> => ({
          id: specialty,
          label: specialty,
        }),
      )}
      selectedId={selected}
      onSelect={handleSelect}
    />
  );
}
