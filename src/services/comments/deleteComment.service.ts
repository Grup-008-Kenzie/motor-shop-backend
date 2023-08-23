import { Response } from "express";
import { AppError } from "../../errors/AppError";
import { commentRepository } from "../../repositories";

export const deleteCommentService = async (
  commentId: string,
  res: Response
) => {
  const { id: userId } = res.locals;

  const comment = await commentRepository.findOneOrFail({
    where: { id: commentId, user: { id: userId } },
  });

  if (comment.user.id !== userId)
    throw new AppError("Insufficient permission.", 403);

  await commentRepository.remove(comment);
  return;
};
