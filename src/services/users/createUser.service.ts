import { AppError } from "../../errors/AppError";
import { addressRepository, userRepository } from "../../repositories";
import { userResponseSchema, userSchema } from "../../schemas/users";
import { Address, User } from "../../entities";

export const createUserService = async (data: any) => {
  const {
    email,
    cpf,
    phone_number,
    address,
    birthdate,
    description,
    name,
    password,
  } = data;

  const findEmail = await userRepository.findOne({ where: { email } });
  if (findEmail) throw new AppError("Email is already in use", 409);

  const findCPF = await userRepository.findOne({ where: { cpf } });
  if (findCPF) throw new AppError("CPF is already in use", 409);

  const newAddress: Address = addressRepository.create({
    cep: address.cep,
    state: address.state,
    city: address.city,
    number: address.number,
    street: address.street,
    complement: address.complement,
  });

  await addressRepository.save(newAddress);

  const newUser: User = userRepository.create({
    email,
    cpf,
    phone_number,
    address: newAddress,
    birthdate,
    name,
    password,
    description,
  });

  await userRepository.save(newUser);
  return userResponseSchema.parse(newUser);
};
