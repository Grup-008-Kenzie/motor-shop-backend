import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";

const payloadValidationMiddleware =
  (schema: ZodTypeAny) =>
  (req: Request, res: Response, next: NextFunction): void => {
    const validateData = schema.parse(req.body);
    req.body = validateData;
    return next();
  };

export { payloadValidationMiddleware };
