import { Request, Response } from "express";
import { ListCarsService } from "../../services/cars/ListCars.service";
import { registerCarService } from "../../services/cars/registerCar.service";
import { updateCarService } from "../../services/cars/updateCar.service";
import { deleteCarService } from "../../services/cars/deleteCar.service";

export const registerCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const newCar = await registerCarService(req.body);
  return res.status(201).json(newCar);
};

export const listCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cars = await ListCarsService();
  return res.status(200).json(cars);
};

export const updateCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updatedCar = await updateCarService(id, req.body);
  return res.status(200).json(updatedCar);
};

export const deleteCarController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  await deleteCarService(id);
  return res.status(204).send();
};
