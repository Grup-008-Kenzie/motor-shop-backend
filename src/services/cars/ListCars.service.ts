import { Car } from "../../entities";
import { AppError } from "../../errors/AppError";
import { carRepository } from "../../repositories";

export const ListCarsService = async (): Promise<Car[]> => {
  const car: Car[] | undefined = await carRepository.find();
  if (!car) throw new AppError("No cars registered yet.", 404);
  return car;
};
