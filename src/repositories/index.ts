import { Repository } from "typeorm";
import { Address, Announcement, Car, CarImage, User } from "../entities";
import { AppDataSource } from "../data-source";

export const addressRepository: Repository<Address> =
  AppDataSource.getRepository(Address);

export const announcementRepository: Repository<Announcement> =
  AppDataSource.getRepository(Announcement);

export const carRepository: Repository<Car> = AppDataSource.getRepository(Car);

export const carImageRepository: Repository<CarImage> =
  AppDataSource.getRepository(CarImage);

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);
