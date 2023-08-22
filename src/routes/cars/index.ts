import { Router } from "express";
import {
  deleteCarController,
  listCarsController,
  registerCarController,
  updateCarController,
} from "../../controllers/cars";
import { isAdminMiddleware } from "../../middlewares/isAdmin";

export const carsRoutes: Router = Router();
carsRoutes.post("", isAdminMiddleware, registerCarController);
carsRoutes.get("", listCarsController);
carsRoutes.patch("/:id", isAdminMiddleware, updateCarController);
carsRoutes.delete("/:id", isAdminMiddleware, deleteCarController);
