import { loginSchema, userCreateSchema, userSchema, userUpdateSchema } from "../../schemas/users";
import { z } from "zod"

type TUser = z.infer<typeof userSchema>
type TUserCreate = z.infer<typeof userCreateSchema>
type TUserUpdate = z.infer<typeof userUpdateSchema>
type TLogin = z.infer<typeof loginSchema>

export { TUser, TUserCreate,TUserUpdate, TLogin }