import { Router } from "express";
import { loginController } from "../../controllers/users";

export const loginRoutes = Router();

loginRoutes.post("", loginController);
