import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../../errors/AppError";

export const ensureUserIsOwnerMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userTokenId: string = res.locals.userTokenId;
  const userParamsId: string = res.locals.userId;

  if (userTokenId !== userParamsId) {
    throw new AppError("Insufficient permission", 403);
  }

  return next();
};
