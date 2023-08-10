import { Repository } from "typeorm";
import { TUserCreate } from "../../interfaces/users";
import { Address, User } from "../../entities";
import { AppDataSource } from "../../data-source";
import { AppError } from "../../errors/AppError";
import { hash } from "bcryptjs";
import { userSchema } from "../../schemas/users";

export const CreateUserService = async (data: TUserCreate) => {
    const { email, cpf, phone_number, address, birthdate, description, name, password } = data
    const userRepo: Repository<User> = AppDataSource.getRepository(User)
    const infosCheck = await userRepo
        .createQueryBuilder("user")
        .select("*")
        .where("user.email = :email", { email: email })
        .orWhere("user.cpf = :cpf", { cpf: cpf })
        .orWhere("phone_number= :phone_number", { phone_number: phone_number })
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

export const GetUsersService = async (data: TUserCreate) => {


}
export const RetrieveUserService = async (data: TUserCreate) => {


}
export const UpdateUserService = async (data: TUserCreate) => {


}
export const DeleteUserService = async (data: TUserCreate) => {


}
