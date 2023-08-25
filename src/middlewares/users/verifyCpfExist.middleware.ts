import { NextFunction, Request, RequestHandler, Response } from "express";
import { Repository } from "typeorm";
import { User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";

export const verifyCpfExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userCpf: string = req.body.cpf

  if (!userCpf) {
    return next()
  } 

  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  const user = await userRepository.exist(
    {
      where: { cpf: userCpf }
    }
  )

  if (user) {
    throw new AppError("CPF already exists", 409)
  }

  return next()
}