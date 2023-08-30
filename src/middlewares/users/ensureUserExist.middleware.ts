import { NextFunction, Request, RequestHandler, Response } from 'express'
import { Repository } from 'typeorm'
import { User } from '../../entities'
import { AppDataSource } from '../../data-source'
import { AppError } from '../../errors/AppError'

export const ensureUserExistMiddleware: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const userId: string = req.params.id

  const userRepository: Repository<User> = AppDataSource.getRepository(User)
  const user = await userRepository.findOne({
    where: {
      id: userId
    }
  })

  if (!user) {
    throw new AppError('User not found', 404)
  }

  res.locals.userId = userId

  return next()
}
