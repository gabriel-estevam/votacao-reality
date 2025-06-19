import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ForgotPasswordData, forgotPasswordSchema } from "../../validators/zod/forgotPasswordSchema";

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPasswordForm({ onBack }: Readonly<ForgotPasswordProps>) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotPasswordData>({
    resolver: zodResolver(forgotPasswordSchema),
  });

  const onSubmit = (data: ForgotPasswordData) => {
    console.log("Recuperar senha para:", data.email);
    // Aqui você pode chamar uma API ou lógica de envio de email
  };

  return (
    <Box component="form" onSubmit={handleSubmit(onSubmit)} sx={{ position: "relative", mb: 2 }}>
      <IconButton onClick={onBack} sx={{ position: "absolute", left: 0, top: -36 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        Recuperar Senha
      </Typography>

      <TextField
        fullWidth
        label="Email"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          ),
        }}
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
        Enviar
      </Button>
    </Box>
  );
}
