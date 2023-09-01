import { userRepository } from "../../repositories";
import { TUserUpdate } from "../../interfaces/users";
import { userUpdateSchemaResponse } from "../../schemas/users";

export const updateUserService = async (data: TUserUpdate, userId: string) => {
  const user = await userRepository.findOneByOrFail({ id: userId });

  Object.assign(user, {
    ...data,
  });

  const updateUser = await userRepository.save(user);

  const returnUser = userUpdateSchemaResponse.parse(updateUser);
  return returnUser;
};
