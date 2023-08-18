import { Router } from "express";
import { CreateUserController, GetUsersController, RetrieveUserController, UpdateUserController, DeleteUserController, LoginController } from "../../controllers/users";
import { token, user } from "../../middlewares/users";

const userRoutes = Router()

userRoutes.post("", CreateUserController)
userRoutes.get("", GetUsersController)
userRoutes.get("/:id", RetrieveUserController)
userRoutes.patch("/:id", UpdateUserController)
userRoutes.delete("/:id", DeleteUserController)

export default userRoutes

