import styles from "../../styles/input.module.css";
import {
  CircleAlertIcon,
  EyeClosedIcon,
  EyeIcon,
  LucideIcon,
} from "lucide-react";
import { forwardRef, InputHTMLAttributes, useState } from "react";

interface DefaultInputProps extends InputHTMLAttributes<HTMLInputElement> {
  icon?: LucideIcon;
  label: string;
  id: string;
  iconClassName?: string;
  error?: string;
  className?: string;
}

export const DefaultInput = forwardRef<HTMLInputElement, DefaultInputProps>(
  (
    { icon: Icon, label, id, iconClassName, error, className, type, ...rest },
    ref,
  ) => {
    const isPassword = type === "password";
    const [showPassword, setShowPassword] = useState(false);
    const resolvedType = isPassword
      ? showPassword
        ? "text"
        : "password"
      : type;

    return (
      <div className={styles["input-group"]}>
        <label htmlFor={id}>{label}</label>
        <div className={styles["input-wrapper"]}>
          {Icon && <Icon className={`${styles.icon} ${iconClassName ?? ""}`} />}
          <input
            ref={ref}
            id={id}
            type={resolvedType}
            className={`${styles["input-field"]} ${className ?? ""}`}
            {...rest}
          />
          {isPassword && (
            <button
              type="button"
              className="cursor-pointer absolute top-[1.2rem] right-3 text-[1px]"
              onClick= {() => setShowPassword((prev) => !prev)}
            >
              {showPassword ? <EyeIcon /> : <EyeClosedIcon />}
            </button>
          )}
          {error && (
            <span className={styles.error}>
              <CircleAlertIcon /> {error}
            </span>
          )}
        </div>
      </div>
    );
  },
);

DefaultInput.displayName = "DefaultInput";
