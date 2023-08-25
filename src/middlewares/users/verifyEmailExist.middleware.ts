import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyEmailExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userEmail: string = req.body.email

  if (!userEmail) {
    return next()
  } 

  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  const user = await userRepository.exist(
    {
      where: { email: userEmail }
    }
  )

  if (user) {
    throw new AppError("Email already exists", 409)
  }

  return next()
}