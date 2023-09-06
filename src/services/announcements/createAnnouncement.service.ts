import { Response } from "express";
import { CarImage } from "../../entities";
import { AppError } from "../../errors/AppError";
import { TAnnouncementRequest } from "../../interfaces/announcements";
import {
  announcementRepository,
  carImageRepository,
  userRepository,
} from "../../repositories";
import { TUserResponse } from "../../interfaces/users";

export const createAnnouncement = async (
  data: TAnnouncementRequest,
  res: Response
) => {
  const { userTokenId } = res.locals;

  const user = await userRepository.findOne({
    where: {
      id: userTokenId,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  const carImage: CarImage = carImageRepository.create({
    front_image: data.front_image,
    first_image: data.first_image,
    second_image: data.second_image,
  });
  await carImageRepository.save(carImage);

  const { front_image, first_image, second_image, ...payload } = data;

  const newAnnouncement = announcementRepository.create({
    ...payload,
    image: carImage,
    seller: user,
  });

  await announcementRepository.save(newAnnouncement);
  return newAnnouncement;
};
