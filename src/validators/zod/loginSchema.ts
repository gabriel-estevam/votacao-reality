import { z } from "zod";
import { registerBaseSchema } from "./registerSchema";

export const loginSchema = z.object({
  email: registerBaseSchema.shape.email,
  password: registerBaseSchema.shape.password,
});

export type LoginData = z.infer<typeof loginSchema>;
