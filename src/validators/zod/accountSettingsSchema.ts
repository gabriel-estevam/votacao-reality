import { z } from "zod";
import { registerBaseSchema } from "./registerSchema";

export const accountSettingsSchema  = z.object({
  name: registerBaseSchema.shape.name,
  email: registerBaseSchema.shape.email,
  password: registerBaseSchema.shape.password,
});

export type accountSettingsData = z.infer<typeof accountSettingsSchema >;
