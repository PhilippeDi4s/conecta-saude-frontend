import { IMaskInput } from "react-imask";
import { Controller, Control } from "react-hook-form";
import { CadUserFields } from "@/src/lib/schema/cadUserSchema";
import styles from "../../styles/input.module.css";
import { LucideIcon, CircleAlertIcon } from "lucide-react";

type Props = {
  mask: string;
  name: keyof CadUserFields;
  control: Control<CadUserFields>;
  label: string;
  placeholder: string;
  icon: LucideIcon;
  error?: string;
  id: string;
};

export function MaskedInput({
  mask,
  name,
  control,
  label,
  placeholder,
  icon: Icon,
  error,
  id,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className={styles["input-group"]}>
          <label htmlFor={id}>{label}</label>
          <div className={styles["input-wrapper"]}>
            <Icon className={styles.icon} />
            <IMaskInput
              id={id}
              mask={mask}
              onAccept={field.onChange}
              inputRef={field.ref}
              placeholder={placeholder}
              className={styles["input-field"]}
            />
          </div>
          {error && (
            <span className={styles.error}>
              <CircleAlertIcon /> {error}
            </span>
          )}
        </div>
      )}
    />
  );
}
