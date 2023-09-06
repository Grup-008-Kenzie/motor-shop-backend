import { z } from "zod";

export const announcementSchema = z.object({
  id: z.string(),
  brand: z.string().max(60),
  model: z.string().max(60),
  year: z.string().length(4),
  fuel_type: z.string().max(10),
  kilometer: z.string().max(6),
  color: z.string().max(30),
  fipe_price: z.string().max(10),
  price: z.string().max(10),
  description: z.string().max(100).default(""),
});

export const announcementsSchema = z.array(announcementSchema);

export const announcementSchemaRequest = announcementSchema
  .omit({
    id: true,
  })
  .extend({
    brand: z.string().max(20),
    model: z.string().max(50),
    front_image: z.string().max(255),
    first_image: z.string().max(255),
    second_image: z.string().max(255),
  });

export const updatedAnnouncementSchema = announcementSchemaRequest.partial();
