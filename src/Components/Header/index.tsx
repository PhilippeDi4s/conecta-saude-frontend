import Image from "next/image";
import Link from "next/link";

export function Header() {
  const logoStyle =
    "font-(family-name:--font-abel) text-[1.4rem] text-(--blue-500)";

  return (
    <header className="w-full bg-(--blue-800) text-white flex items-center justify-center p-3">
      <Link href="#home" className="flex items-center gap-2">
        <span className={`${logoStyle} w-28 text-right`}>
          Conecta
        </span>

        <Image
          src="/logo.svg"
          alt="Conecta Saúde logo"
          width={50}
          height={50}
        />

        <span className={`${logoStyle} w-28 text-left`}>
          Saúde
        </span>
      </Link>
    </header>
  );
}