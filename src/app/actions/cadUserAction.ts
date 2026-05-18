"use server";

import { createLoginSession } from "@/src/lib/login/manage-login";
import { CadUserFields, cadUserSchema } from "@/src/lib/schema/cadUserSchema";
import { Paciente } from "@/src/models/paciente";
import api from "@/src/services/api/api";
import { redirect } from "next/navigation";

export async function cadUserAction(data: CadUserFields) {
  const zodResult = cadUserSchema.safeParse(data);

  if (!zodResult.success) {
    return {
      success: false,
      message: "Verifique os campos e tente novamente.",
      errors: zodResult.error.issues,
    };
  }

  let response;
  try {
    response = await api.post<Paciente>("/pacientes/cadastro", {
      nome: zodResult.data.name,
      email: zodResult.data.email,
      senha: zodResult.data.password,
    });
  } catch (error) {
    console.error("Erro na requisição:", error);
    return {
      success: false,
      message: "Erro ao conectar com o servidor. Tente novamente.",
    };
  }

  await createLoginSession(
    response.data.id,
    response.data.nome,
    response.data.email,
  );

  redirect("/");
}
