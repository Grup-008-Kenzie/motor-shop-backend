import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyNumberExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userNumber: string = req.body.phone_number

  if (!userNumber) {
    return next()
  } 

  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  const user = await userRepository.exist(
    {
      where: { phone_number: userNumber }
    }
  )

  if (user) {
    throw new AppError("This number already exists", 409)
  }

  return next()
}