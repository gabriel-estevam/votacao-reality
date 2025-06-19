import {
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Box
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../../validators/zod/registerSchema";

export default function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<RegisterData>({
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = (data: RegisterData) => {
    console.log("Register:", data);
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} noValidate>
      <TextField
        fullWidth
        label="Nome Completo"
        margin="normal"
        {...register("name")}
        error={!!errors.name}
        helperText={errors.name?.message}
      />

      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
      />

      <TextField
        fullWidth
        label="Senha"
        type={showPassword ? "text" : "password"}
        margin="normal"
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        label="Data de Nascimento"
        margin="normal"
        placeholder="dd/mm/aaaa"
        {...register("birthdate")}
        error={!!errors.birthdate}
        helperText={errors.birthdate?.message}
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
        Registrar
      </Button>
    </Box>
  );
}
