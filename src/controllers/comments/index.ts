import { Request, Response } from "express";
import { newCommentService } from "../../services/comments/newComment.service";
import { updateCommentService } from "../../services/comments/updateComment.service";
import { deleteCommentService } from "../../services/comments/deleteComment.service";

export const newCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const newCar = await newCommentService(req.body, id, res);
  return res.status(201).json(newCar);
};

export const updateCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  const updatedCar = await updateCommentService(req.body, id, res);
  return res.status(200).json(updatedCar);
};

export const deleteCommentController = async (
  req: Request,
  res: Response
): Promise<Response> => {
  const { id } = req.params;
  await deleteCommentService(id, res);
  return res.status(204).json();
};
