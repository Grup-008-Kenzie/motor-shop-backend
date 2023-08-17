import { AppError } from "../../errors/AppError";
import { carRepository } from "../../repositories";
import { TCarRequest } from "../../interfaces/cars";
import { carSchemaRequest } from "../../schemas/cars";
import { Car } from "../../entities";

// Fazer verifição com id do usuário (admin).

export const registerCarService = async (
  requestData: TCarRequest
): Promise<Response | Car> => {
  const data = carSchemaRequest.parse(requestData);

  const existingCar = await carRepository.findOne({
    where: {
      brand: data.brand,
      model: data.model,
    },
  });

  if (existingCar) {
    throw new AppError(
      "Car with the same brand and model already exists.",
      400
    );
  }

  const newCar = carRepository.create({
    brand: data.brand,
    model: data.model,
  });

  await carRepository.save(newCar);
  return newCar;
};
