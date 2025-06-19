import {
  TextField,
  InputAdornment,
  IconButton,
  Button,
  Box,
  Typography
} from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoginData, loginSchema } from "../../validators/zod/loginSchema";

interface Props {
  onForgotPassword: () => void;
}

export default function LoginForm({ onForgotPassword }: Readonly<Props>) {
  const [showPassword, setShowPassword] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginData) => {
    console.log("LOGIN OK", data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <TextField
        fullWidth
        label="Email"
        margin="normal"
        {...register("email")}
        error={!!errors.email}
        helperText={errors.email?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          )
        }}
      />

      <TextField
        fullWidth
        label="Senha"
        margin="normal"
        type={showPassword ? "text" : "password"}
        {...register("password")}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LockOutlinedIcon />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                {showPassword ? <VisibilityOff /> : <Visibility />}
              </IconButton>
            </InputAdornment>
          )
        }}
      />

      <Box textAlign="right" mt={1}>
        <Typography
          variant="body2"
          sx={{ cursor: "pointer", color: "gray" }}
          onClick={onForgotPassword}
        >
          Esqueceu a Senha?
        </Typography>
      </Box>

      <Button variant="contained" type="submit" fullWidth sx={{ mt: 3 }}>
        CONTINUAR
      </Button>
    </form>
  );
}
