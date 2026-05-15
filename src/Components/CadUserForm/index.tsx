"use client";

import {
  ClipboardIcon,
  LockIcon,
  MailIcon,
  SendIcon,
  UserIcon,
} from "lucide-react";
import styles from "../../styles/form.module.css";
import { DefaultInput } from "../DefaultInput";
import clsx from "clsx";
import { SubmitHandler, useForm } from "react-hook-form";
import { CadUserFields, cadUserSchema } from "@/src/lib/cadUserSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { cadUserAction } from "@/src/app/actions/cadUserAction";
import { showMessage } from "@/src/adapters";

export function CadUserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CadUserFields>({
    resolver: zodResolver(cadUserSchema),
    mode: "onChange",
  });

  const onSubmit: SubmitHandler<CadUserFields> = async (data) => {
    const result = await cadUserAction(data);

    if (!result.success) {
      showMessage.error("Naõ foi possível realizar o cadastro");
      return;
    }

    showMessage.succsses("Cadastro feito com sucesso");
    console.log(data);
    return;
  };

  return (
    <section className="mt-2">
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
          error={errors.name?.message as string}
        />
        <DefaultInput
          type="email"
          id="email"
          icon={MailIcon}
          label="E-mail"
          placeholder="email@exemplo.com"
          {...register("email")}
          error={errors.email?.message as string}
        />
        <DefaultInput
          type="password"
          id="password"
          label="Senha"
          icon={LockIcon}
          placeholder="Crie sua senha"
          {...register("password")}
          error={errors.password?.message as string}
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
            "bg-(--blue-400)",
          )}
        >
          <SendIcon />
          Cadastrar
        </button>
      </form>
    </section>
  );
}
