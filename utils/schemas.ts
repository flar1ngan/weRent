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

export const messageSchema = z.object({
  senderId: z.string(),
  receiverId: z.string(),
  content: z.string()
})

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


export const itemSchema = z.object({
  name: z
    .string()
    .min(2, {
      message: 'Nosaukumam ir jābūt vismaz 2 rakstzīmes',
    })
    .max(100, {
      message: 'Nosaukumam ir jābūt mazākam par 100 rakstzīmēm',
    }),
  price: z.coerce.number().int().min(0, {
    message: 'Cenai jābūt pozitīvam skaitlim',
  }),
  category: z.string(),
  city: z.string(),
  description: z.string().refine(
    (description) => {
      const wordCount = description.split(' ').length;
      return wordCount >= 10 && wordCount <= 500;
    },
    {
      message: 'Aprakstam ir jābūt no 10 līdz 500 vārdiem.',
    }
  )
});

export const reviewSchema = z.object({
  itemId:z.string(),
  rating:z.coerce.number().int().min(1).max(5),
  comment:z.string().min(10).max(750),
})
