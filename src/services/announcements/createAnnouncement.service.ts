import { Response } from "express";
import { CarImage } from "../../entities";
import { AppError } from "../../errors/AppError";
import { TAnnouncementRequest } from "../../interfaces/announcements";
import {
  announcementRepository,
  carRepository,
  carImageRepository,
  userRepository,
} from "../../repositories";
import { announcementSchemaRequest } from "../../schemas/announcements";

const createAnnouncement = async (
  requestData: TAnnouncementRequest,
  res: Response
) => {
  const { id: userId } = res.locals;
  const data = announcementSchemaRequest.parse(requestData);

  const car = await carRepository.findOne({
    where: {
      brand: requestData.brand,
      model: requestData.model,
    },
  });

  if (!car) throw new AppError("Car not Found.", 404);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  const { brand, model, front_image, first_image, second_image, ...payload } =
    data;

  const carImage: CarImage = carImageRepository.create({
    front_image: front_image,
    first_image: first_image,
    second_image: second_image,
  });
  await carImageRepository.save(carImage);

  const newAnnouncement = announcementRepository.create({
    ...payload,
    car: car,
    image: carImage,
    seller: user,
  });

  await announcementRepository.save(newAnnouncement);
  return newAnnouncement;
};

export { createAnnouncement };
