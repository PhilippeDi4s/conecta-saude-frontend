import { z } from "zod";

export const cadUserSchema = z
  .object({
    name: z
      .string()
      .min(1, "Nome é obrigatório")
      .min(3, "Nome deve ter pelo menos 3 caracteres")
      .max(100, "Nome muito longo")
      .regex(/^[a-zA-ZÀ-ÿ\s]+$/, "Nome deve conter apenas letras"),

    dateOfBirth: z
      .string()
      .min(1, "Data de nascimento é obrigatória")
      .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Informe a data no formato DD/MM/AAAA")
      .refine((val) => {
        const [dia, mes, ano] = val.split("/").map(Number);
        const data = new Date(ano, mes - 1, dia);

        if (
          data.getFullYear() !== ano ||
          data.getMonth() !== mes - 1 ||
          data.getDate() !== dia
        )
          return false;

        const hoje = new Date();
        const idade = hoje.getFullYear() - ano;
        return idade >= 1 && idade <= 120;
      }, "Data de nascimento inválida"),

    cpf: z
      .string()
      .min(1, "CPF é obrigatório")
      .regex(/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/, "Informe um CPF válido")
      .refine((val) => {
        const digits = val.replace(/\D/g, "");

        if (digits.length !== 11) return false;
        if (/^(\d)\1{10}$/.test(digits)) return false;

        let sum = 0;
        for (let i = 0; i < 9; i++) sum += parseInt(digits[i]) * (10 - i);
        let remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(digits[9])) return false;

        sum = 0;
        for (let i = 0; i < 10; i++) sum += parseInt(digits[i]) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(digits[10])) return false;

        return true;
      }, "CPF inválido"),

    phone: z
      .string()
      .min(1, "Telefone é obrigatório")
      .regex(
        /^\(?\d{2}\)?[\s-]?9\d{4}[\s-]?\d{4}$/,
        "Informe um celular válido",
      ),

    email: z
      .string()
      .min(1, "E-mail é obrigatório")
      .email("Informe um e-mail válido")
      .max(150, "E-mail muito longo")
      .toLowerCase(),

    password: z
      .string()
      .min(1, "Senha é obrigatória")
      .min(8, "Senha deve ter pelo menos 8 caracteres")
      .max(64, "Senha muito longa")
      .regex(/[A-Z]/, "Senha deve conter pelo menos uma letra maiúscula")
      .regex(/[0-9]/, "Senha deve conter pelo menos um número"),

    confirmPassword: z.string().min(1, "Confirme sua senha"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem",
    path: ["confirmPassword"],
  });

export type CadUserFields = z.infer<typeof cadUserSchema>;
