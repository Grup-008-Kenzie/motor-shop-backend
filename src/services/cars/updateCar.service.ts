import { Car } from "../../entities";
import { AppError } from "../../errors/AppError";
import { TCarUpdate } from "../../interfaces/cars";
import { carRepository } from "../../repositories";
import { carUpdateSchema } from "../../schemas/cars";

// Fazer verifição com id do usuário (admin).

const updateCarService = async (
  carId: string,
  requestData: TCarUpdate
): Promise<Response | Car> => {
  const data = carUpdateSchema.parse(requestData);
  const car = await carRepository.findOne({ where: { id: carId } });

  if (!car) {
    throw new AppError("Car not found.", 404);
  }

  if (data.brand) {
    car.brand = data.brand;
  }
  if (data.model) {
    car.model = data.model;
  }

  await carRepository.save(car);
  return car;
};

export { updateCarService };
