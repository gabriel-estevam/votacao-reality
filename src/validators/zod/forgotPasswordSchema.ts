import { z } from "zod";
import { registerBaseSchema } from "./registerSchema";

export const forgotPasswordSchema = registerBaseSchema.pick({
  email: true,
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;
