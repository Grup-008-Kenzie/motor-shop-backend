import { DeepPartial } from "typeorm";
import {
  loginSchema,
  userCreateSchema,
  userResponseSchema,
  userSchema,
  userUpdateSchema,
  usersResponseSchema,
} from "../../schemas/users";
import { z } from "zod";

type TUser = z.infer<typeof userSchema>;
type TUserCreate = z.infer<typeof userCreateSchema>;
type TUserUpdate = DeepPartial<typeof userUpdateSchema>;
type TUserResponse = z.infer<typeof userResponseSchema>;
type TUsersResponse = z.infer<typeof usersResponseSchema>;
type TLogin = z.infer<typeof loginSchema>;

type TEmailRequest = {
  to: string;
  subject: string;
  text: string;
};

export {
  TUser,
  TUserCreate,
  TUserUpdate,
  TLogin,
  TUserResponse,
  TUsersResponse,
  TEmailRequest,
};
