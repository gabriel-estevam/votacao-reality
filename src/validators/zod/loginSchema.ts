import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
});

export type LoginData = z.infer<typeof loginSchema>;
