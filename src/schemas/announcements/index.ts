import { z } from "zod"


export const announcementSchema = z.object({
  id: z.string(),
  year: z.string().length(4),
  fuel_type: z.string().max(10),
  kilometer: z.string().max(6),
  color: z.string().max(30),
  fipe_price: z.string().max(10),
  price: z.string().max(10),
  description: z.string().max(100).optional()
})

export const announcementsSchema = z.array(announcementSchema)

export const announcementSchemaRequest = announcementSchema.omit({
  id: true
})

export const updatedAnnouncementSchema = announcementSchemaRequest.partial()