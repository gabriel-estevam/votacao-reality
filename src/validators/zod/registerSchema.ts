import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
  birthdate: z
    .date({
      required_error: "Data de nascimento é obrigatória",
      invalid_type_error: "Data inválida",
    })
    .refine((date) => date <= new Date(), "Data não pode ser no futuro"),
});

export type RegisterData = z.infer<typeof registerSchema>;
