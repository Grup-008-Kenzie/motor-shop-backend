import { AppError } from "../../errors/AppError";
import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { announcementRepository, userRepository } from "../../repositories";


export const user =
  async () => async (req: Request, res: Response, next: NextFunction) => {
    const id: string = req.params.id;
    const user = await userRepository.findOneBy({ id: id });

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

export const seller = async () => async (req: Request, res: Response, next: NextFunction) => {
  const id = res.locals.id
  const user = await userRepository.findOneBy({ id: id });
  const ann = await
    announcementRepository.findOneBy({ id: req.body.announcement })

  if (!user) {
    throw new AppError("User not found", 404);
  }

  if (!ann) {
    throw new AppError("Announcement not found", 404);
  }

  if (ann.seller.id !== id) {
    throw new AppError("User is not the owner for this announcement", 403);
  }

  return next()

}