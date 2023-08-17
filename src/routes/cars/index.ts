import { Router } from "express";
import {
  deleteCarController,
  listCarsController,
  registerCarController,
  updateCarController,
} from "../../controllers/cars";

export const carsRoutes: Router = Router();
carsRoutes.post("", registerCarController);
carsRoutes.get("", listCarsController);
carsRoutes.patch("", updateCarController);
carsRoutes.delete("", deleteCarController);
