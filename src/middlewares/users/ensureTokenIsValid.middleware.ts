import { NextFunction, Request, RequestHandler, Response } from "express";
import { AppError } from "../../errors/AppError";
import jwt from "jsonwebtoken";
import "dotenv/config";

export const ensureTokenIsValidMiddleware: RequestHandler = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token: string | undefined = req.headers.authorization;

  if (!token) {
    throw new AppError("Missing bearer token", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, process.env.SECRET_KEY!, (error: any, decoded: any) => {
    if (error) throw new AppError(error.message, 401);

    res.locals.userTokenId = decoded.id;

    return next();
  });
};
