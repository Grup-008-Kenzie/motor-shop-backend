import { AppError } from "../../errors/AppError";
import { userRepository } from "../../repositories";

export const resetPasswordService = async (
  password: string,
  resetToken: string
) => {
  const user = await userRepository.findOneBy({
    reset_token: resetToken,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  Object.assign(user, {
    password: password,
    reset_token: null,
  });

  const updateUser = await userRepository.save(user);

  return updateUser;
};
