import { addressRepository, userRepository } from "../../repositories";
import { userResponseSchema } from "../../schemas/users";
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
