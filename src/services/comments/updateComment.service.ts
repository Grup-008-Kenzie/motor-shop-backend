import { Response } from "express";
import { AppError } from "../../errors/AppError";
import { TCommentRequest } from "../../interfaces/comments";
import { userRepository, commentRepository } from "../../repositories";

export const updateCommentService = async (
  data: TCommentRequest,
  commentId: string,
  res: Response
) => {
  const { id: userId } = res.locals;
  const { content } = data;

  const user = await userRepository.findOneOrFail({
    where: {
      id: userId,
    },
  });

  const comment = await commentRepository.findOneOrFail({
    where: {
      id: commentId,
    },
  });

  if (comment.user.id !== userId)
    throw new AppError("Insufficient permission.", 403);

  comment.content = content;

  await commentRepository.save(comment);
  return comment;
};
