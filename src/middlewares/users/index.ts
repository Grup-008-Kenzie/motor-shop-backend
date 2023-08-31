import { AppError } from "../../errors/AppError";
import { NextFunction, Request, Response } from "express";
import { announcementRepository, userRepository } from "../../repositories";

export const seller =
  async () => async (req: Request, res: Response, next: NextFunction) => {
    const id = res.locals.id;
    const user = await userRepository.findOneBy({ id: id });
    const ann = await announcementRepository.findOneBy({
      id: req.body.announcement,
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    if (!ann) {
      throw new AppError("Announcement not found", 404);
    }

    if (ann.seller.id !== id) {
      throw new AppError("User is not the owner for this announcement", 403);
    }

    next();
  };
