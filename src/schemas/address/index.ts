import { z } from "zod";

export const addressSchema = z.object({
  id: z.string(),
  cep: z.string().max(8),
  state: z.string().min(2),
  city: z.string().max(30),
  street: z.string().max(50),
  number: z.string().max(10),
  complement: z.string().max(50).nullish(),
});

export const addressSchemaRequest = addressSchema.omit({
  id: true,
});

export const addressUpdateSchema = addressSchemaRequest.partial();
