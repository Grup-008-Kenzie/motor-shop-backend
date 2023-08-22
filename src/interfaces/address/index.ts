import { z } from "zod";
import { addressSchema, addressSchemaRequest } from "../../schemas/address";

export type TAdress = z.infer<typeof addressSchema>;
export type TAdressRequest = z.infer<typeof addressSchemaRequest>;
