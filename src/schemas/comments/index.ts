import { z } from "zod";

export const commentSchema = z.object({
  id: z.string(),
  content: z.string().max(280),
  releaseDate: z.date(),
});

export const commentSchemaRequest = commentSchema.omit({
  id: true,
  releaseDate: true,
});
