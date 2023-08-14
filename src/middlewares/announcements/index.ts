import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { Announcement, announcement } from "../../entities"
import { AppError } from "../../errors/AppError"
import { NextFunction, Request, Response } from "express";

export const announcement = async () => async (req: Request, next: NextFunction) => {
    const announcementRepo: Repository<Announcement> = AppDataSource.getRepository(Announcement)
    const id: string = req.params.id
    const announcement = await announcementRepo.findOneBy({ id: id })

    if (!announcement) {
        throw new AppError("announcement not found", 404)
    }

    return next()
}
