/// middleware isSeller?
/// middleware isEmailAlreadyInUse?
/// middleware isCPFAlreadyInUse?
/// middleware isTokenValid?

import { Repository } from "typeorm";
import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";


export const user =
  async () => async (req: Request, res: Response, next: NextFunction) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User);
    const id: string = req.params.id;
    const user = await userRepo.findOneBy({ id: id });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    res.locals.id = id;

    return next();
  };

export const token = async () => async (req: Request, res: Response, next: NextFunction) => {
  let token: string | undefined = req.headers.authorization
  if (!token) {
    throw new AppError('Missing bearer token', 401)
  }

  token = token.split(' ')[1]

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) throw new AppError(error.message, 401)

    res.locals.id = decoded.sub
    return next()
  })
}
