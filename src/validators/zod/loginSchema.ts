import { z } from "zod";
import { registerBaseSchema } from "./registerSchema";

export const loginSchema = z.object({
  email: registerBaseSchema.shape.email,
  password: z.string().nonempty("Senha é obrigatória"),
});

export type LoginData = z.infer<typeof loginSchema>;
