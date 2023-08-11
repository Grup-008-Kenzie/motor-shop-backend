import { z } from "zod"

export const carSchema = z.object({
  id: z.string(),
  brand: z.string().max(20),
  model: z.string().max(20), 
})

export const carSchemaRequest = carSchema.omit({
  id: true
})