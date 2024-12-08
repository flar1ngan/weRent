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

function validateImage() {
  const maxSize = 1024 * 1024;
  const fileTypes = ['image/'];
  return z
    .instanceof(File)
    .refine((file) => {
      return file.size <= maxSize || !file;
    }, "Faila lielums nedrīkst pārsniegt 1 MB")
    .refine((file) => {
      return fileTypes.some((type) => file.type.startsWith(type)) || !file;
    }, "Atlasītais fails nav attēls");
}

export const imageSchema = z.object({
  image: validateImage(),
});
