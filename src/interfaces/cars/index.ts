import { z } from "zod"
import { carSchema, carSchemaRequest } from "../../schemas/cars"

export type TCar = z.infer<typeof carSchema>
export type TCarRequest = z.infer<typeof carSchemaRequest>