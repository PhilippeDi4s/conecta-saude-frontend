"use server";

import { CadUserFields, cadUserSchema } from "@/src/lib/cadUserSchema";
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

  return {
    success: true,
    message: "Cadastro feito com sucesso",
  };
  redirect(`/`)
}
