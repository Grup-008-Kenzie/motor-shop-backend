import { Router } from "express";
import {
  createUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
} from "../../controllers/users";
import { token, user } from "../../middlewares/users";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { userCreateSchema, userUpdateSchema } from "../../schemas/users";
import { verifyEmailExistMiddleware } from "../../middlewares/users/verifyEmailExist.middleware";

export const userRoutes = Router();
userRoutes.post("", 
  ensureDataIsValidMiddleware(userCreateSchema),
  verifyEmailExistMiddleware, 
  createUserController
);
userRoutes.get("", token, listUsersController);
userRoutes.get("/:id", token, user, retrieveUserController);
userRoutes.patch("/:id", 
ensureDataIsValidMiddleware(userUpdateSchema), 
  token, 
  user,
  verifyEmailExistMiddleware, 
  updateUserController
);
userRoutes.delete("/:id", token, user, deleteUserController);
