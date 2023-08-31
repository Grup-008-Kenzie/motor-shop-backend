import { userRepository } from "../../repositories";
import { userResponseSchema } from "../../schemas/users";

export const retrieveUserService = async (userId: string) => {
  const user = await userRepository
    .createQueryBuilder("user")
    .leftJoinAndSelect("user.address", "address")
    .where("user.id = :userId", { userId })
    .getOne();

  const returnUser = userResponseSchema.parse(user);
  return returnUser;
};
