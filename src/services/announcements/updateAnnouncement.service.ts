import { Response } from "express";
import { AppError } from "../../errors/AppError";
import {
  announcementRepository,
  carImageRepository,
  userRepository,
} from "../../repositories";

const updateAnnouncementService = async (
  requestData: any,
  announcementId: string,
  res: Response
) => {
  const { id: userId } = res.locals;

  const announcement = await announcementRepository.findOne({
    where: { id: announcementId },
  });
  if (!announcement) throw new AppError("Announcement not found.", 404);
  if (announcement.seller != userId)
    throw new AppError("You don't have permission.", 403);

  const user = await userRepository.findOne({
    where: {
      id: userId,
    },
  });

  if (!user) throw new AppError("User not found", 404);

  const { brand, model, front_image, first_image, second_image, ...payload } =
    requestData;

  const carImage = carImageRepository.create({
    front_image,
    first_image,
    second_image,
  });
  await carImageRepository.save(carImage);

  const newAnnouncement = announcementRepository.create({
    ...payload,
    image: carImage,
    seller: user,
  });

  await announcementRepository.save(newAnnouncement);
  return newAnnouncement;
};

export { updateAnnouncementService };
