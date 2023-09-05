import { z } from "zod";
import { addressSchemaRequest, addressUpdateSchema } from "../address";
import { announcementSchema } from "../announcements";

export const userSchema = z.object({
  id: z.string(),
  name: z.string().max(90),
  email: z.string().email().max(125),
  cpf: z.string().max(15),
  phone_number: z.string().max(15),
  birthdate: z.string().max(10),
  description: z.string().nullable().optional(),
  is_seller: z.boolean(),
  admin: z.boolean(),
  password: z.string().max(120),
  reset_token: z.string().nullable().optional(),
  address: addressSchemaRequest,
  announcement: announcementSchema.optional(),
});

export const userCreateSchema = userSchema
  .omit({
    id: true,
    announcement: true,
    admin: true,
  })
  .extend({
    is_seller: z.boolean().optional(),
  });

export const userResponseSchema = userSchema.omit({
  password: true,
});

export const usersResponseSchema = z.array(userResponseSchema);

export const userUpdateSchema = userCreateSchema
  .omit({ address: true, cpf: true })
  .partial();

export const userUpdateSchemaResponse = userSchema.omit({
  password: true,
  address: true,
  announcement: true,
});

export const loginSchema = z.object({
  email: z.string().email().max(125),
  password: z.string().max(120),
});
