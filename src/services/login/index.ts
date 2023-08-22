import { User } from "../../entities";
import { AppError } from "../../errors/AppError";
import { TLogin } from "../../interfaces/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Response } from "express";
import { userRepository } from "../../repositories";

const loginService = async (res: Response, userData: TLogin): Promise<string> => {
  const user: User | null = await userRepository.findOneBy({
    email: userData.email,
  });
  if (!user) {
    throw new AppError("Invalid credentials", 401);
  }

  const verifyPassword = bcrypt.compare(userData.password, user.password);

  if (!verifyPassword) {
    throw new AppError("Invalid credentials", 401);
  }

  const token: string = jwt.sign(
    {
      id: user.id,
      admin: user.admin,
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  res.locals.token = token
  res.locals.id = user.id
  res.locals.isSeller = user.is_seller
  res.locals.admin = user.admin

  return token;
};

export default loginService;
