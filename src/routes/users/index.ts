import { Router } from "express";
import {
  createUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
} from "../../controllers/users";
import { token, user } from "../../middlewares/users";

export const userRoutes = Router();
userRoutes.post("", createUserController);
userRoutes.get("", token, listUsersController);
userRoutes.get("/:id", token, user, retrieveUserController);
userRoutes.patch("/:id", token, user, updateUserController);
userRoutes.delete("/:id", token, user, deleteUserController);
