import { AppDataSource } from "../../data-source";
import { User } from "../../entities";
import { AppError } from "../../errors/AppError";
import { Repository } from "typeorm";
import { TLogin } from "../../interfaces/users";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const loginService = async (userData: TLogin): Promise<string> => {
  const userRepo: Repository<User> = AppDataSource.getRepository(User);
  const user: User | null = await userRepo.findOneBy({
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
    },
    process.env.SECRET_KEY!,
    {
      expiresIn: "24h",
      subject: String(user.id),
    }
  );

  return token;
};

export default loginService;
