import { Request } from "express";
import { Response } from "express";

import {
  CreateUserService,
  GetUsersService,
  RetrieveUserService,
  UpdateUserService,
  DeleteUserService,
} from "../../services/users";
import { TLogin } from "../../interfaces/users";
import loginService from "../../services/login";

const CreateUserController = async (req: Request, res: Response) => {
  const newUser = await CreateUserService(req.body);
  return res.status(201).json(newUser);
};

const GetUsersController = async (req: Request, res: Response) => {
  const Users = await GetUsersService();
  return res.status(200).json(Users);
};

const RetrieveUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const user = await RetrieveUserService(UserId);
  return res.status(200).json(user);
};

const UpdateUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const updatedUser = await UpdateUserService(req.body, UserId);
  return res.status(200).json(updatedUser);
};

const DeleteUserController = async (req: Request, res: Response) => {
  const UserId: string = req.params.id;
  const result = await DeleteUserService(UserId);
  return res.status(200).json(result);
};

const LoginController = async (req: Request, res: Response) => {
  const userData: TLogin = req.body;
  const token = await loginService(userData);
  return res.status(200).json({ token });
};

export {
  CreateUserController,
  UpdateUserController,
  DeleteUserController,
  RetrieveUserController,
  GetUsersController,
  LoginController,
};
