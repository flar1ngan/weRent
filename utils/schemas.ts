import * as z from "zod";
import { ZodSchema } from "zod";


export const profileSchema = z.object({
    firstName:z.string().min(2, {
        message: "Vārdam ir jābūt vismaz 2 simboli"
    }),
    lastName:z.string().min(2, {
        message: "Uzvārdam ir jābūt vismaz 2 simboli"
    }),
    username:z.string().min(2, {
        message: "Lietotājvārdam ir jābūt vismaz 2 simboli"
    })
})