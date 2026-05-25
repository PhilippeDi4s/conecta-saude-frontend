"use server";

import { Medico } from "@/src/models/medico";
import api from "@/src/services/api/api";

export async function getDoctorsAction(): Promise<Medico[]> {
  try {
    const response = await api.get("/medicos");
    return response.data;
  } catch (error) {
    console.error("Erro ao buscar médicos:", error);
    return [];
  }
}
