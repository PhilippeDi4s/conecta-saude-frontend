import Image from "next/image";
import Link from "next/link";

export function Header() {
  const logoStyle = "font-(family-name:--font-abel) text-[1.4rem] text-(--blue-500)";
  return (
    <header className=" w-full bg-(--blue-200) flex items-center justify-center p-3">
      <Link href="#home" className="flex items-center justify-center gap-2">
        <span className={`${logoStyle}`}>Conecta</span>
        <Image
          src="/logo.svg"
          alt="Conecta Saúde logo"
          width={50}
          height={50}
        />
        <span className={`${logoStyle}`}>Saúde</span>
      </Link>
    </header>
  );
}
