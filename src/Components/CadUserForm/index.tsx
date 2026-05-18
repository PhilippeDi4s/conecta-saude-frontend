"use client";

import {
  CalendarIcon,
  ClipboardIcon,
  IdCardIcon,
  LockIcon,
  MailIcon,
  PhoneIcon,
  UserIcon,
} from "lucide-react";
import styles from "../../styles/form.module.css";
import { DefaultInput } from "../DefaultInput";
import { MaskedInput } from "../MaskedInput";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { CadUserFields, cadUserSchema } from "@/src/lib/cadUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadUserAction } from "@/src/app/actions/cadUserAction";
import { showMessage } from "@/src/adapters";
import { Section } from "../Section";

export function CadUserForm() {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<CadUserFields>({
    resolver: zodResolver(cadUserSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CadUserFields> = async (data) => {
    const result = await cadUserAction(data);

    if (!result.success) {
      showMessage.error("Não foi possível realizar o cadastro");
      return;
    }

    showMessage.succsses("Cadastro feito com sucesso");
    console.log(data);
    return;
  };

  return (
    <Section className="mt-2">
      <form className={styles.container} onSubmit={handleSubmit(onSubmit)}>
        <h1 className="font-bold text-xl md:text-2xl w-fit mx-auto text-black/70 flex items-center gap-1">
          Cadastrar-se
          <ClipboardIcon />
        </h1>
        <DefaultInput
          type="text"
          id="name"
          icon={UserIcon}
          label="Nome completo"
          placeholder="Digite seu nome completo"
          {...register("name")}
          error={errors.name?.message}
        />
        <MaskedInput
          mask="00/00/0000"
          name="dateOfBirth"
          control={control}
          id="dateOfBirth"
          icon={CalendarIcon}
          label="Data de nascimento"
          placeholder="DD/MM/AAAA"
          error={errors.dateOfBirth?.message}
        />
        <MaskedInput
          mask="000.000.000-00"
          name="cpf"
          control={control}
          id="cpf"
          icon={IdCardIcon}
          label="CPF"
          placeholder="000.000.000-00"
          error={errors.cpf?.message}
        />
        <MaskedInput
          mask="(00) 00000-0000"
          name="phone"
          control={control}
          id="phone"
          icon={PhoneIcon}
          label="Telefone"
          placeholder="(00) 00000-0000"
          error={errors.phone?.message}
        />
        <DefaultInput
          type="email"
          id="email"
          icon={MailIcon}
          label="E-mail"
          placeholder="email@exemplo.com"
          {...register("email")}
          error={errors.email?.message}
        />
        <DefaultInput
          type="password"
          id="password"
          label="Senha"
          icon={LockIcon}
          placeholder="Crie sua senha"
          {...register("password")}
          error={errors.password?.message}
        />
        <DefaultInput
          type="password"
          id="confirmpassword"
          label="Confirmar senha"
          icon={LockIcon}
          {...register("confirmPassword")}
          placeholder="Repita sua senha"
          error={errors.confirmPassword?.message}
        />
        <button
          type="submit"
          className={clsx(
            "cursor-pointer",
            "py-4",
            "px-6",
            "flex",
            "items-center",
            "justify-center",
            "gap-2",
            "rounded-2xl",
            "font-bold",
            "bg-(--blue-400)",
            "disabled:brightness-50",
          )}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Cadastrando" : "Cadastrar"}
        </button>
      </form>
    </Section>
  );
}
