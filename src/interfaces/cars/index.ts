import { z } from "zod";
import {
  carSchema,
  carSchemaRequest,
  carUpdateSchema,
} from "../../schemas/cars";

export type TCar = z.infer<typeof carSchema>;
export type TCarRequest = z.infer<typeof carSchemaRequest>;
export type TCarUpdate = z.infer<typeof carUpdateSchema>;
