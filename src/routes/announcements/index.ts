import { Router } from "express";
import {
  DeleteAnnouncementController,
  createAnnouncementController,
  listAnnouncementsController,
  listSellerAnnouncementsController,
  updateAnnouncementController,
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
announcementRoutes.get("/:id", listSellerAnnouncementsController);
announcementRoutes.patch("/:id", updateAnnouncementController);
announcementRoutes.delete("/:id", DeleteAnnouncementController);