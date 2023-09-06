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
import { ensureDataIsValidMiddleware } from "../../middlewares/ensureDataIsValid.middleware";
import { ensureTokenIsValidMiddleware } from "../../middlewares/users/ensureTokenIsValid.middleware";

export const announcementRoutes: Router = Router();

announcementRoutes.post(
  "",
  ensureDataIsValidMiddleware(announcementSchemaRequest),
  ensureTokenIsValidMiddleware,
  createAnnouncementController
);
announcementRoutes.get("", listAnnouncementsController);
announcementRoutes.get(
  "/:id",
  isSellerMiddleware,
  listSellerAnnouncementsController
);
announcementRoutes.get("/filtered", listFilteredAnnouncementsController);
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
