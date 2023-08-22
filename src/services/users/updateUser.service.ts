import { hash } from "bcryptjs";
import { AppError } from "../../errors/AppError";
import { userRepository } from "../../repositories";
import { TUserUpdate } from "../../interfaces/users";

export const updateUserService = async (data: TUserUpdate, userId: string) => {
  const user = await userRepository.findOneByOrFail({ id: userId });
  const {
    email,
    address,
    birthdate,
    description,
    name,
    password,
    phone_number,
  } = data;

  if (email) {
    const existingUserWithEmail = await userRepository.findOne({
      where: { email },
    });
    if (existingUserWithEmail) {
      throw new AppError("Email is already in use", 409);
    }
  }

  if (password) {
    const hashedPassword = await hash(password, 10);
    Object.assign(user, {
      email,
      phone_number,
      address,
      birthdate,
      description,
      name,
      password: hashedPassword,
    });
  } else {
    Object.assign(user, {
      email,
      phone_number,
      address,
      birthdate,
      description,
      name,
    });
  }

  await userRepository.save(user);
  return user;
};
