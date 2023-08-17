import { Router } from "express";
import { listCarsController } from "../../controllers/cars";

export const carsRoutes: Router = Router();
carsRoutes.get("", listCarsController);
