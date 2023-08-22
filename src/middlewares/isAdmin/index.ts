import { NextFunction, Request, Response } from "express";
import { AppError } from "../../errors/AppError";

const isAdminMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const { admin } = res.locals;
  if (!admin) throw new AppError("Insufficient permission", 403);
  next();
};

export { isAdminMiddleware };
