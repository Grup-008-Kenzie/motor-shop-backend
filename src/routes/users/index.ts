import { Router } from "express";
import { CreateUserController, GetUsersController, RetrieveUserController, UpdateUserController, DeleteUserController } from "../../controllers/users";
import { user } from "../../middlewares/users";

const userRoutes = Router()

userRoutes.post("", CreateUserController)
userRoutes.get("", GetUsersController)
userRoutes.get("/:id", user, RetrieveUserController)
userRoutes.patch("/:id", user, UpdateUserController)
userRoutes.delete("/:id", user, DeleteUserController)
