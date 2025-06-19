import {
    TextField,
    Button,
    InputAdornment,
    IconButton,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterData, registerSchema } from "../../validators/zod/registerSchema";
import BirthdateField from "../form/FormattedDateField";

export default function RegisterForm() {
    const [showPassword, setShowPassword] = useState(false);

    const methods = useForm<RegisterData>({
        resolver: zodResolver(registerSchema),
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = methods;

    const onSubmit = (data: RegisterData) => {
        console.log("Register:", data);
    };

    return (
        <FormProvider {...methods}>
            <form onSubmit={handleSubmit(onSubmit)} noValidate>
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
                        ),
                    }}
                />
                <TextField
                    fullWidth
                    label="Confirmar Senha"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    {...register("confirmPassword")}
                    error={!!errors.confirmPassword}
                    helperText={errors.confirmPassword?.message}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={() => setShowPassword((s) => !s)} edge="end">
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        ),
                    }}
                />
                <BirthdateField />

                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
                    Registrar
                </Button>
            </form>
        </FormProvider>
    );
}
