import { userCreateSchema, userSchema } from "../../schemas/users";
import { z } from "zod"

type TUser = z.infer<typeof userSchema>
type TUserCreate = z.infer<typeof userCreateSchema>

export {TUser, TUserCreate}