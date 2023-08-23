import { Router } from "express";
import {
  deleteCommentController,
  newCommentController,
  updateCommentController,
} from "../../controllers/comments";

export const commentsRoutes = Router();

commentsRoutes.post("/:id", newCommentController);
commentsRoutes.patch("/:id", updateCommentController);
commentsRoutes.delete("/:id", deleteCommentController);
