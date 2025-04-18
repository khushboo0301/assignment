import { z } from "zod";

export const CreateEventSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  date: z.string().refine((val) => new Date(val) > new Date(), {
    message: "Date must be in the future",
  }),
});

export type CreateEventDto = z.infer<typeof CreateEventSchema>;
