import { Request, Response } from "express";
import { ListCarsService } from "../../services/cars/ListCars.service";

export const listCarsController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const cars = ListCarsService();
  return res.status(200).json(cars);
};
