import {
    Box,
    Button,
    Tab,
    Tabs,
    TextField,
    Typography,
    InputAdornment,
    IconButton
} from "@mui/material";
import { useState } from "react";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";

function LoginRegister() {
    const [tab, setTab] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [forgotPassword, setForgotPassword] = useState(false);
    const [loginData, setLoginData] = useState({ email: "", password: "" });
    const [registerData, setRegisterData] = useState({
        name: "",
        email: "",
        password: "",
        birthdate: ""
    });
    const [resetEmail, setResetEmail] = useState("");

    const handleChangeTab = (_: any, newValue: string) => {
        setTab(newValue);
        setForgotPassword(false);
    };

    const handleTogglePassword = () => setShowPassword((prev) => !prev);

    let formContent;

    if (forgotPassword) {
        formContent = (
            <Box sx={{ position: "relative", mb: 2 }}>
                <IconButton
                    onClick={() => setForgotPassword(false)}
                    sx={{ position: "absolute", left: 0, top: -36 }}
                >
                    <ArrowBackIcon />
                </IconButton>
                <Typography align="center" sx={{ fontWeight: "bold", mb: 2 }}>
                    Recuperar Senha
                </Typography>
                <TextField
                    fullWidth
                    label="Email"
                    value={resetEmail}
                    onChange={(e) => setResetEmail(e.target.value)}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <MailOutlineIcon />
                            </InputAdornment>
                        )
                    }}
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Enviar
                </Button>
            </Box>
        );
    } else if (tab === "login") {
        formContent = (
            <>
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={loginData.email}
                    onChange={(e) =>
                        setLoginData({ ...loginData, email: e.target.value })
                    }
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
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    value={loginData.password}
                    onChange={(e) =>
                        setLoginData({ ...loginData, password: e.target.value })
                    }
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <LockOutlinedIcon />
                            </InputAdornment>
                        ),
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
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
                        onClick={() => {
                            setForgotPassword(true);
                            setLoginData({ email: "", password: "" });
                        }}
                    >
                        Esqueceu a Senha?
                    </Typography>
                </Box>
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    CONTINUAR
                </Button>
            </>
        );
    } else {
        formContent = (
            <>
                <TextField
                    fullWidth
                    label="Nome Completo"
                    margin="normal"
                    value={registerData.name}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                    }
                />
                <TextField
                    fullWidth
                    label="Email"
                    margin="normal"
                    value={registerData.email}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                    }
                />
                <TextField
                    fullWidth
                    label="Senha"
                    type={showPassword ? "text" : "password"}
                    margin="normal"
                    value={registerData.password}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                    }
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton onClick={handleTogglePassword} edge="end">
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
                    value={registerData.birthdate}
                    onChange={(e) =>
                        setRegisterData({ ...registerData, birthdate: e.target.value })
                    }
                />
                <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }}>
                    Registrar
                </Button>
            </>
        );
    }

    return (
        <Box
            sx={{
                width: 420,
                mx: "auto",
                mt: 20,
                p: 4,
                borderRadius: 2,
                boxShadow: 3,
                bgcolor: "white"
            }}
        >
            <Typography
                sx={{
                    textAlign: "center",
                    fontWeight: "bold",
                    fontSize: 24,
                    mb: 2,
                    color: "#0058e0",
                    fontFamily: "Arial"
                }}
            >
                conta<strong style={{ color: "#0058e0" }}>globo</strong>
            </Typography>

            {!forgotPassword && (
                <Tabs
                    value={tab}
                    onChange={handleChangeTab}
                    centered
                    sx={{
                        mb: 2,
                        "& .MuiTab-root": {
                            minWidth: 120,
                            mx: 4,
                        }
                    }}
                >
                    <Tab label="LOGIN" value="login" sx={{ fontWeight: "bold" }} />
                    <Tab label="REGISTRAR" value="register" sx={{ fontWeight: "bold" }} />
                </Tabs>


            )}

            <Box mt={3}>{formContent}</Box>
        </Box>
    );
}

export default LoginRegister;
