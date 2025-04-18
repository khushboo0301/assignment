import { z } from "zod";

export const CreateUserSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  mobile: z.string().optional(),
});

export type CreateUserDto = z.infer<typeof CreateUserSchema>;
