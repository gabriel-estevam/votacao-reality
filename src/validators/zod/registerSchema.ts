import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(6, "Senha deve ter pelo menos 6 caracteres"),
  birthdate: z
    .string()
    .regex(/^\d{2}\/\d{2}\/\d{4}$/, "Formato da data deve ser dd/mm/aaaa"),
});

export type RegisterData = z.infer<typeof registerSchema>;
