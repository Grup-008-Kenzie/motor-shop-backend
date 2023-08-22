import { z } from 'zod';
import { addressSchemaRequest } from '../address';
import { announcementSchema } from '../announcements';

export const userSchema = z.object({
    id: z.string(),
    name: z.string().max(90),
    email: z.string().email().max(125),
    cpf: z.string().max(11),
    phone_number: z.string().max(11),
    birthdate: z.string().length(8),
    description: z.string().nullable(),
    is_seller: z.boolean(),
    admin: z.boolean(),
    password: z.string().max(120),
    address: addressSchemaRequest,
    announcement: announcementSchema.optional()
});

export const userCreateSchema = userSchema.omit({
  id: true,
  is_seller: true,
  announcement: true,
  admin: true
});

export const userResponseSchema = userSchema.omit({
  password: true,
});

export const usersResponseSchema = userResponseSchema.array();
export const userUpdateSchema = userCreateSchema.partial().omit({
  cpf: true,
});

export const loginSchema = z.object({
  email: z.string().email().max(125),
  password: z.string().max(120),
});
