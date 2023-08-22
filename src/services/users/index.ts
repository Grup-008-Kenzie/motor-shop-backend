import { Repository } from "typeorm";
import { TUserCreate } from "../../interfaces/users";
import { TUserUpdate } from "../../interfaces/users";
import { Address, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { userResponseSchema, userSchema, usersResponseSchema } from "../../schemas/users";

export const CreateUserService = async (data: TUserCreate) => {
    const { email, cpf, phone_number, address, birthdate, description, name, password } = data
    const userRepo: Repository<any> = AppDataSource.getRepository(User)
    const addressRepo: Repository<any> = AppDataSource.getRepository(Address)

    const existingUserWithEmail = await userRepo.findOne({ where: { email } });
    if (existingUserWithEmail) {
        throw new AppError("Email is already in use", 409);
    }

    const existingUserWithCPF = await userRepo.findOne({ where: { cpf } });
    if (existingUserWithCPF) {
        throw new AppError("CPF is already in use", 409);
    }

    const newAddress = addressRepo.create({
        cep: address.cep,
        state: address.state,
        city: address.city,
        number: address.number,
        street: address.street,
        complement: address.complement
    });

    await addressRepo.save(newAddress);

    const newUser = userRepo.create({
        email, cpf, phone_number, address: newAddress, birthdate, name, password, description
    })

    await userRepo.save(newUser)

    return userSchema.parse(newUser)
}
export const GetUsersService = async () => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const users: User[] = await userRepo.find()
    return users /// adicionar parse de schema
}
export const RetrieveUserService = async (userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneBy({ id: userId })
    return (user) /// adicionar parse de schema e buscar id no locals
}

export const UpdateUserService = async (data: TUserUpdate, userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneByOrFail({ id: userId })
    const { email, address, birthdate, description, name, password, phone_number } = data

    if (email) {
        const existingUserWithEmail = await userRepo.findOne({ where: { email } });
        if (existingUserWithEmail) {
            throw new AppError("Email is already in use", 409);
        }
    }

    if (password) {
        const hashedPassword = await hash(password, 10);
        Object.assign(user, { email, phone_number, address, birthdate, description, name, password: hashedPassword });
    } else {
        Object.assign(user, { email, phone_number, address, birthdate, description, name });
    }
    

    await userRepo.save(user);

    return (user)
}
export const DeleteUserService = async (userId: string) => {
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const user = await userRepo.findOneByOrFail({ id: userId })
    await userRepo.remove(user)
    return "User deleted successfully."
}