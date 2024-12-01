import * as z from "zod";
import { ZodSchema } from "zod";

export function zodValidate<T>(schema: ZodSchema<T>, data: unknown): T {
  const validatedData = schema.safeParse(data);
  if (!validatedData.success) {
    const errors = validatedData.error.errors.map((error) => error.message);
    throw new Error(errors.join(", "));
  }
  return validatedData.data;
}

export const profileSchema = z.object({
  firstName: z.string().min(2, {
    message: "Vārdam ir jābūt vismaz 2 simboli",
  }),
  lastName: z.string().min(2, {
    message: "Uzvārdam ir jābūt vismaz 2 simboli",
  }),
  username: z.string().min(2, {
    message: "Lietotājvārdam ir jābūt vismaz 2 simboli",
  }),
});
