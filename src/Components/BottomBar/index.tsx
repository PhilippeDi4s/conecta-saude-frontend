import { UserIcon } from "lucide-react";
import Link from "next/link";

export function BottomBar(){
    return(
        <nav>
            <Link href="#"><UserIcon/>Perfil</Link>
            <Link href="#"><UserIcon/>Meus Agendamentos</Link>
            <Link href="#"><UserIcon/>Agendar</Link>
        </nav>
    )
}