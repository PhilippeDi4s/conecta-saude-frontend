"user server"

import { Agendamento } from "@/src/models/agendamento";

export async function createAppointmentAction(data: Agendamento){
    console.log(data)
}