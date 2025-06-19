import { z } from "zod";

export const registerBaseSchema = z.object({
  name: z.string().nonempty("Nome é obrigatório"),
  email: z.string().email("Email inválido").nonempty("Email é obrigatório"),
  password: z.string().min(3, "Senha deve ter pelo menos 3 caracteres"),
  confirmPassword: z.string().min(3, "Confirmação de senha é obrigatória"),
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
