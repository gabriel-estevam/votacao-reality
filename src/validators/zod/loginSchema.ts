import { z } from "zod";
import { registerSchema } from "./registerSchema";

export const loginSchema = z.object({
  email: registerSchema.shape.email,
  password: z.string().nonempty("Senha é obrigatório"),
});

export type LoginData = z.infer<typeof loginSchema>;
