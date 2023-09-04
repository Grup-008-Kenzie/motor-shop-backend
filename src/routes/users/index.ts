import { Router } from "express";
import {
  createUserController,
  listUsersController,
  retrieveUserController,
  updateUserController,
  deleteUserController,
} from "../../controllers/users";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { userCreateSchema, userUpdateSchema } from "../../schemas/users";
import { verifyEmailExistMiddleware } from "../../middlewares/users/verifyEmailExist.middleware";
import { verifyNumberExistMiddleware } from "../../middlewares/users/verifyNumberExist.middleware";
import { verifyCpfExistMiddleware } from "../../middlewares/users/verifyCpfExist.middleware";
import { ensureUserExistMiddleware } from "../../middlewares/users/ensureUserExist.middleware";
import { ensureTokenIsValidMiddleware } from "../../middlewares/users/ensureTokenIsValid.middleware";
import { ensureUserIsOwnerMiddleware } from "../../middlewares/users/ensureUserIsOwner.middleware";

export const userRoutes = Router();
userRoutes.post(
  "",
  ensureDataIsValidMiddleware(userCreateSchema),
  verifyEmailExistMiddleware,
  verifyCpfExistMiddleware,
  verifyNumberExistMiddleware,
  createUserController
);
userRoutes.get("", listUsersController);
userRoutes.get("/:id", ensureUserExistMiddleware, retrieveUserController);
userRoutes.patch(
  "/:id",
  ensureDataIsValidMiddleware(userUpdateSchema),
  ensureTokenIsValidMiddleware,
  ensureUserExistMiddleware,
  ensureUserIsOwnerMiddleware,
  verifyEmailExistMiddleware,
  verifyNumberExistMiddleware,
  updateUserController
);
userRoutes.delete(
  "/:id",
  ensureTokenIsValidMiddleware,
  ensureUserExistMiddleware,
  ensureUserIsOwnerMiddleware,
  deleteUserController
);
