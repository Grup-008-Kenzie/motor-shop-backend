import { userCreateSchema, userSchema, userUpdateSchema } from "../../schemas/users";
import { z } from "zod"

type TUser = z.infer<typeof userSchema>
type TUserCreate = z.infer<typeof userCreateSchema>
type TUserUpdate = z.infer<typeof userUpdateSchema>

export { TUser, TUserCreate,TUserUpdate }