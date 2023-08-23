import { Response } from "express";
import { AppError } from "../../errors/AppError";
import { TCommentRequest } from "../../interfaces/comments";
import {
  userRepository,
  announcementRepository,
  commentRepository,
} from "../../repositories";

export const newCommentService = async (
  data: TCommentRequest,
  announcementId: string,
  res: Response
) => {
  const { id: userId } = res.locals;
  const { content } = data;

  const user = await userRepository.findOneOrFail({
    where: {
      id: userId,
    },
  });

  const announcement = await announcementRepository.findOneOrFail({
    where: {
      id: announcementId,
    },
  });

  const newComment = commentRepository.create({
    content,
    user: user,
    announcement: announcement,
  });

  await commentRepository.save(newComment);
  return newComment;
};
