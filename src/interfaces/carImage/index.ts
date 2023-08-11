import { z } from "zod"
import { carImageSchema, carImageSchemaRequest } from "../../schemas/carImage"

export type TCarImageSchema = z.infer<typeof carImageSchema>
export type TCarImageSchemaRequest = z.infer<typeof carImageSchemaRequest>