import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

export const idIsValid = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  const id = req.params.id;
  const { id: userId } = res.locals;
  if (!id === userId) throw new AppError("Invalid id.", 400);
  next();
};
