import {NextFunction, Request, Response} from 'express'
import { AppError } from './AppError'
import { ZodError } from 'zod'

export const handleErros = (
  err: Error, 
  req: Request, 
  res: Response, 
  next: NextFunction
  ) => {
  if (err instanceof AppError){
    return res.status(err.statusCode).json({
      message: err.message
    })
  }

  if(err instanceof ZodError){
    return res.status(400).json({
      message: err.flatten().fieldErrors
    })
  }

  console.log(err)

  return res.status(500).json({
    message: "Internal server error"
  })
}