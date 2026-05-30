"use clent";

import { ChevronDownIcon, ChevronUpIcon, LucideIcon } from "lucide-react";
import styles from "../../styles/input.module.css";
import { useState } from "react";

type SelectInputProps = {
  children: React.ReactNode;
  className?: string;
  icon?: LucideIcon;
  iconClassName?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export function SelectInput({
  children,
  className,
  icon: Icon,
  iconClassName,
  ...props
}: SelectInputProps) {
  const [chevronUp, setChevronUp] = useState(false);
  return (
    <div className={styles["input-wrapper"]}>
      {Icon && <Icon className={`${styles.icon} ${iconClassName ?? ""}`} />}
      <select
        onFocus={() => setChevronUp((prev) => !prev)}
        onBlur={() => setChevronUp((prev) => !prev)}
        className={`${styles["input-field"]} ${className ?? ""} appearance-none`.trim()}
        {...props}
      >
        {children}
      </select>

      <ChevronDownIcon
        className={`${styles.icon} cursor-pointer absolute top-[1.2rem] text-[1px] left-auto! right-3 ${chevronUp ? "rotate-180" : "rotate-0"}`}
      />
    </div>
  );
}