import { Request, Response, NextFunction } from "express";
import { AppError } from "../../errors/AppError";

export const isSellerMiddleware = async (req: Request, res: Response, next: NextFunction): Promise<Response | void> => {
    const {is_seller} = res.locals;
    if(!is_seller) throw new AppError("Insufficient permission.", 403);
    next()
}