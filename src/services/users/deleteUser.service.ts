import { userRepository } from "../../repositories";

export const deleteUserService = async (userId: string) => {
  const user = await userRepository.findOneByOrFail({ id: userId });
  await userRepository.remove(user);
  return;
};
