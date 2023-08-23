import { AppError } from "../../errors/AppError";
import { carRepository } from "../../repositories";

export const deleteCarService = async (carId: string): Promise<void> => {
  const car = await carRepository.findOne({ where: { id: carId } });
  if (!car) throw new AppError("Car not found.", 404);
  await carRepository.remove(car);
};
