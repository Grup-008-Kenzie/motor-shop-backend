import { Router } from "express";
import { CreateUserController, GetUsersController, RetrieveUserController, UpdateUserController, DeleteUserController, LoginController } from "../../controllers/users";
import { token, user } from "../../middlewares/users";

export const loginRoutes = Router()

loginRoutes.post("/login", LoginController)