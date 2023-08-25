import { Router } from "express";
import { loginController } from "../../controllers/users";
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { loginSchema } from "../../schemas/users";

export const loginRoutes: Router = Router();

loginRoutes.post("", ensureDataIsValidMiddleware(loginSchema), loginController);
