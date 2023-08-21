import { z } from "zod"

export const addressSchema = z.object({
  id: z.string(),
  cep: z.string().length(8),
  state: z.string().length(2),
  city: z.string().max(50),
  street: z.string().max(50),
  number: z.string().max(10),
  complement: z.string().max(50).optional()
})

export const addressSchemaRequest = addressSchema.omit({
  id: true
})