import { User } from "../../entities";
import { userRepository } from "../../repositories";

export const listUsersService = async () => {
  const users: User[] = await userRepository.find();
  return users;
};
