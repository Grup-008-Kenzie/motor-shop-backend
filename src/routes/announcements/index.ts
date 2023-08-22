import { Router } from "express";
import {
  createAnnouncementController,
  listAnnouncementsController,
} from "../../controllers/announcements";
import { announcementSchemaRequest } from "../../schemas/announcements";
import { payloadValidationMiddleware } from "../../middlewares/payloadValidation";

export const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  payloadValidationMiddleware(announcementSchemaRequest),
  createAnnouncementController
);
announcementRoutes.get("", listAnnouncementsController);
///announcementRoutes.patch("/:id", updateAnnouncementController);
///announcementRoutes.delete("/:id", deleteAnnouncementController);