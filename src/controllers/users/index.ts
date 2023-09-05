import { Request } from "express";
import { Response } from "express";
import { createUserService } from "../../services/users/createUser.service";
import { listUsersService } from "../../services/users/listUsers.service";
import { retrieveUserService } from "../../services/users/retrieveUser.service";
import { updateUserService } from "../../services/users/updateUser.service";
import { deleteUserService } from "../../services/users/deleteUser.service";
import { TLogin } from "../../interfaces/users";
import { loginService } from "../../services/login";
import { sendResetEmailPasswordService } from "../../services/users/sendResetEmailPassword.service";
import { resetPasswordService } from "../../services/users/resetPassword.service";

export const createUserController = async (req: Request, res: Response) => {
  const newUser = await createUserService(req.body);
  return res.status(201).json(newUser);
};

export const listUsersController = async (req: Request, res: Response) => {
  const Users = await listUsersService();
  return res.status(200).json(Users);
};

export const retrieveUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const user = await retrieveUserService(UserId);
  return res.status(200).json(user);
};

export const updateUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const updatedUser = await updateUserService(req.body, UserId);
  return res.status(200).json(updatedUser);
};

export const deleteUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const result = await deleteUserService(UserId);
  return res.status(200).json();
};

export const loginController = async (req: Request, res: Response) => {
  const userData: TLogin = req.body;
  const token = await loginService(userData);
  return res.status(200).json({ token });
};

export const sendResetEmailPasswordController = async (
  req: Request,
  res: Response
) => {
  const { email } = req.body;
  await sendResetEmailPasswordService(email);
  return res.json({ message: "token send" });
};

export const resetPasswordController = async (req: Request, res: Response) => {
  const { password } = req.body;
  const { token } = req.params;

  await resetPasswordService(password, token);

  res.json({ message: "password change with sucess" });
};
