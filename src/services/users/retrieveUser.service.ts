import { userRepository } from "../../repositories";

export const retrieveUserService = async (userId: string) => {
    const user = await userRepository
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.address", "address")
        .where("user.id = :userId", { userId })
        .getOne();

    return user;
};