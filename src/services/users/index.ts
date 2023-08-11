import { Repository } from "typeorm";
import { TUserCreate, TUserUpdate } from "../../interfaces/users";
import { Address, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { userResponseSchema, userSchema, usersResponseSchema } from "../../schemas/users";

export const CreateUserService = async (data: TUserCreate) => {
    const { email, cpf, phone_number, address, birthdate, description, name, password } = data
    const userRepo: Repository<User> = AppDataSource.getRepository(User)

    const infosCheck = await userRepo
        .createQueryBuilder("user")
        .select("*")
        .where("user.email = :email", { email: email })
        .orWhere("user.cpf = :cpf", { cpf: cpf })
        .getCount();

    if (infosCheck > 0) {
        throw new AppError("Unique user informations already in use", 409)
    }

    const addressRepo: Repository<Address> = AppDataSource.getRepository(Address)
    const addressCheck: Address | null = await addressRepo.findOne(address)
    if (addressCheck) {
        throw new AppError("Unique address informations already in use", 409)
    }

    const hashedPassword = await hash(password, 10)

    const newUser = userRepo.create({
        email, cpf, phone_number, address, birthdate, name, password: hashedPassword
    })
    await userRepo.save(newUser)
    return userSchema.parse(newUser)

}
export const GetUsersService = async () => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const users = await userRepo.find()
    return usersResponseSchema.parse(users)
}
export const RetrieveUserService = async (userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({ id: userId })
    return userResponseSchema.parse(user)
}

export const UpdateUserService = async (data: TUserUpdate, userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneByOrFail({ id: userId })
    const { email, address, birthdate, description, name, password, phone_number } = data

    const emailCheck = await userRepo
        .createQueryBuilder("user")
        .where("user.email = :email", { email: email })
        .getCount()

    if (emailCheck > 0) {
        throw new AppError("Unique email already in use", 409)
    }

    if (password) {
        const hashedPassword = await hash(password, 10);
        Object.assign(user, { email, phone_number, address, birthdate, description, name, password: hashedPassword });
    } else {
        Object.assign(user, { email, phone_number, address, birthdate, description, name });
    }

    await userRepo.save(user);

    return userResponseSchema.parse(user)
}
export const DeleteUserService = async (userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneByOrFail({ id: userId })
    await userRepo.remove(user)
    return "User deleted successfully."
}
