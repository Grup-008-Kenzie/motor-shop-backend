import { userRepository } from "../../repositories";
import { usersResponseSchema } from "../../schemas/users";

export const listUsersService = async () => {
  const users = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .getMany();

  const returnUsers = usersResponseSchema.parse(users);
  return returnUsers;
};
