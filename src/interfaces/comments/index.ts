import { z } from "zod";
import { commentSchema, commentSchemaRequest } from "../../schemas/comments";

export type TComment = z.infer<typeof commentSchema>;
export type TCommentRequest = z.infer<typeof commentSchemaRequest>;
