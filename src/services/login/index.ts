import { User } from "../../entities";
import { AppError } from "../../errors/AppError";
import { TLogin } from "../../interfaces/users";
import { userRepository } from "../../repositories";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { Response } from "express";

export const loginService = async (
  loginData: TLogin
): Promise<string | Response> => {
  const user: User | null = await userRepository.findOne({
    where: {
      email: loginData.email,
    },
  });
  if (!user) throw new AppError("Invalid credentials", 401);

  const comparePassword = await compare(loginData.password, user.password);
  if (!comparePassword) throw new AppError("Invalid credentials", 401);

  const token = sign(
    {
      id: user.id,
      admin: user.admin,
    },
    String(process.env.SECRET_KEY),
    {
      subject: String(user.id),
      expiresIn: "1d",
    }
  );

  return token;
};
