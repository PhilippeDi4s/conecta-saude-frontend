import { redirect } from "next/navigation";
import { getLoginSession } from "@/src/lib/login/manage-login";
import { SessionPayload } from "@/src/types/auth";

export async function requireSession(): Promise<SessionPayload> {
  const session = (await getLoginSession()) as SessionPayload | false;
  if (!session) redirect("/auth/register");
  return session;
}
