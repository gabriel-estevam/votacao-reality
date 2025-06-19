import { z } from "zod";
import { registerSchema } from "./registerSchema";

export const forgotPasswordSchema = registerSchema.pick({ email: true });
export type ForgotPasswordData = z.infer<typeof forgotPasswordSchema>;