import { Router } from "express";
import { CreateUserController, GetUsersController, RetrieveUserController, UpdateUserController, DeleteUserController, LoginController } from "../../controllers/users";
import { token, user } from "../../middlewares/users";

const userRoutes = Router()

userRoutes.post("", CreateUserController)
userRoutes.get("", token, GetUsersController)
userRoutes.get("/:id", token, user, RetrieveUserController)
userRoutes.patch("/:id", token, user, UpdateUserController)
userRoutes.delete("/:id", token, user, DeleteUserController)

const loginRoutes = Router()

loginRoutes.post("/login", LoginController)