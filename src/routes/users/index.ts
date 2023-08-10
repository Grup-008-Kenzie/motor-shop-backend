import { Router } from "express";
import { CreateUserController, GetUsersController, RetrieveUserController, UpdateUserController, DeleteUserController } from "../../controllers/users";

const userRoutes = Router()

userRoutes.post("", CreateUserController)
userRoutes.get("", GetUsersController)
userRoutes.get("/:id", RetrieveUserController)
userRoutes.patch("/:id", tokenValidation, UpdateUserController)
userRoutes.delete("/:id", tokenValidation, DeleteUserController)
