import { randomUUID } from "crypto";
import { AppError } from "../../errors/AppError";
import { userRepository } from "../../repositories";
import { emailservice } from "../../utils/sendEmail.utils";

export const sendResetEmailPasswordService = async (email: string) => {
  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User not found", 404);
  }

  const resetToken = randomUUID();

  Object.assign(user, {
    reset_token: resetToken,
  });

  await userRepository.save(user);

  const resetPasswordTemplate = emailservice.resetPasswordTemplate(
    user.email,
    user.name,
    user.reset_token!
  );

  await emailservice.sendEmail(resetPasswordTemplate);
};
