import clsx from "clsx";

type DefaultBtnProps = {
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function DefaultBtn({ children, ...props }: DefaultBtnProps) {
  return (
    <button
      {...props}
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
        "text-white",
        "bg-(--blue-800)",
        "disabled:brightness-50",
      )}
    >
      {children}
    </button>
  );
}
