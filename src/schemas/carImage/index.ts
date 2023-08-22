import { z } from "zod";

export const carImageSchema = z.object({
  id: z.string(),
  front_image: z.string().max(255),
  first_image: z.string().max(255),
  second_image: z.string().max(255),
});

export const carImageSchemaRequest = carImageSchema.omit({
  id: true,
});
