import { z } from "zod";

export const registerBaseSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório").max(65, "Nome deve ter no máximo 65 caracteres"),
  email: z.string().email("Email inválido").max(60, "Email deve ter no máximo 60 caracteres"),
  password: z.string().nonempty("Senha é obrigatório").min(3, "Senha deve ter pelo menos 3 caracteres").max(16, "Senha deve ter no máximo 16 caracteres"),
  confirmPassword: z.string().nonempty("Confirmação Senha é obrigatório").min(3, "Senha deve ter pelo menos 3 caracteres").max(16, "Senha deve ter no máximo 16 caracteres"),
  birthdate: z.date({
    required_error: "Data de nascimento é obrigatória",
    invalid_type_error: "Data inválida",
  }),
});

export const registerSchema = registerBaseSchema
  .refine((data) => data.birthdate <= new Date(), {
    message: "Data não pode ser no futuro",
    path: ["birthdate"],
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas precisam ser iguais",
    path: ["confirmPassword"],
  });

export type RegisterData = z.infer<typeof registerSchema>;
