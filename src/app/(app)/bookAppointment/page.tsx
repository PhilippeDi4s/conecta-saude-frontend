import { AppointmentFlow } from "@/src/Components/appointmentComponents/AppointmentFlow";
import { requireSession } from "@/src/lib/login/require-session";

export default async function BookAppointment() {
  await requireSession();
  
  return <AppointmentFlow/>
}
