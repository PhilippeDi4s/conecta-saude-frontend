export const SPECIALTIES= [
  "Todos",
  "Dermatologia",
  "Cardiologia",
  "Pediatria",
] as const;

export type Specialty = (typeof SPECIALTIES)[number];
