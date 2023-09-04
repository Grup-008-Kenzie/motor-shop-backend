import { Router } from "express";
import {
  DeleteAnnouncementController,
  createAnnouncementController,
  listAnnouncementsController,
  listFilteredAnnouncementsController,
  listSellerAnnouncementsController,
  updateAnnouncementController,
} from "../../controllers/announcements";
import { announcementSchemaRequest } from "../../schemas/announcements";
import { payloadValidationMiddleware } from "../../middlewares/payloadValidation";
import { isSellerMiddleware } from "../../middlewares/announcements/EnsureIsSeller.middleware";

export const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  payloadValidationMiddleware(announcementSchemaRequest),
  createAnnouncementController
);

announcementRoutes.get("/filtered", listFilteredAnnouncementsController);

announcementRoutes.get(
  "/:id",
  isSellerMiddleware,
  listSellerAnnouncementsController
);

announcementRoutes.get("", listAnnouncementsController);

announcementRoutes.patch(
  "/:id",
  isSellerMiddleware,
  updateAnnouncementController
);

announcementRoutes.delete(
  "/:id",
  isSellerMiddleware,
  DeleteAnnouncementController
);

export default announcementRoutes;
