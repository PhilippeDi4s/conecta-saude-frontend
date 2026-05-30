import { Calendar1Icon, PlusIcon, UserIcon } from "lucide-react";
import Link from "next/link";

export function BottomBar() {
  const linkStyles = "flex flex-col items-center gap-1";
  const selectedLinkStyles = "text-(--blue-500) font-bold"; 

  return (
    <nav className="flex justify-between items-center bg-(--blue-800) text-white/80 p-2 fixed bottom-0 w-full">
      <Link href="#" className={linkStyles}>
        <UserIcon />
        Perfil
      </Link>

      <Link
        href="/bookAppointment"
        className="
          flex
          flex-col
          items-center
          absolute
          left-1/2
          translate-x-[-50%]
          -top-5
        "
      >
        <PlusIcon
          size={50}
          className="bg-(--blue-600) rounded-full p-2 text-white "
        />

        <span>Agendar</span>
      </Link>

      <Link href="/" className={`${linkStyles}`}>
        <Calendar1Icon />
        Agenda
      </Link>
    </nav>
  );
}