import { Repository } from "typeorm";
import { Address, Announcement, CarImage, Comment, User } from "../entities";
import { AppDataSource } from "../data-source";

export const addressRepository: Repository<Address> =
  AppDataSource.getRepository(Address);

export const announcementRepository: Repository<Announcement> =
  AppDataSource.getRepository(Announcement);

export const carImageRepository: Repository<CarImage> =
  AppDataSource.getRepository(CarImage);

export const userRepository: Repository<User> =
  AppDataSource.getRepository(User);

export const commentRepository: Repository<Comment> =
  AppDataSource.getRepository(Comment);
