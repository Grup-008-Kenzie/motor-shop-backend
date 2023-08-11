/// middleware isSeller?
/// middleware isEmailAlreadyInUse?
/// middleware isCPFAlreadyInUse?
/// middleware isTokenValid?

import { Repository } from "typeorm"
import { AppDataSource } from "../../data-source"
import { User } from "../../entities"
import { AppError } from "../../errors/AppError"
import { NextFunction, Request, Response } from "express";

export const user = async () => async (req: Request, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const id: string = req.params.id
    const user = await userRepo.findOneBy({ id: id })

    if (!user) {
        throw new AppError("User not found", 404)
    }

    return next()
}

