import {
    Box,
    Avatar,
    Typography,
    TextField,
    IconButton,
    Divider,
    Paper,
    Button,
    InputAdornment,
    ClickAwayListener
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Header from "../components/Header";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
    accountSettingsSchema,
    accountSettingsData
} from "../validators/zod/accountSettingsSchema";
import { Remove } from "@mui/icons-material";

export default function AccountSettings() {
    const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
    const [showPassword, setShowPassword] = useState(false);
    const [image, setImage] = useState("https://randomuser.me/api/portraits/women/44.jpg");
    const [showAvatarActions, setShowAvatarActions] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        getValues
    } = useForm<accountSettingsData>({
        resolver: zodResolver(accountSettingsSchema),
        defaultValues: {
            name: "Jessica Alba",
            email: "jenny@gmail.com",
            password: "password123"
        }
    });

    const toggleEdit = (field: keyof accountSettingsData) => {
        setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();
            reader.onload = () => setImage(reader.result as string);
            reader.readAsDataURL(e.target.files[0]);
        }
    };

    const onSubmit = (data: accountSettingsData) => {
        console.log("Form data enviada:", data);
    };

    return (
        <>
            <Header title="Minha Conta" backgroundColor="#1a1a1a" />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh"
                }}
            >
                <Paper
                    elevation={3}
                    sx={{
                        maxWidth: 500,
                        p: 4,
                        border: "1px solid #3f51b5",
                        borderRadius: 2,
                        textAlign: "center",
                        width: "100%"
                    }}
                >
                    <ClickAwayListener onClickAway={() => setShowAvatarActions(false)}>
                        <Box sx={{ position: "relative", display: "inline-flex", alignItems: "center" }}>
                            <Avatar
                                src={image || undefined}
                                sx={{
                                    width: 100,
                                    height: 100,
                                    transition: "transform 0.3s ease-in-out",
                                    borderRadius: "50%",
                                    cursor: "pointer",
                                    "&:hover": {
                                        transform: "scale(1.05)",
                                    },
                                }}
                                onClick={() => setShowAvatarActions((prev) => !prev)}
                            />

                            {showAvatarActions && (
                                <Box
                                    sx={{
                                        display: "flex",
                                        flexDirection: "column",
                                        gap: 1,
                                        position: "absolute",
                                        left: "110%",
                                        top: "0%",
                                        borderRadius: 2,
                                        padding: 0.5,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.3)",
                                        zIndex: 1,
                                    }}
                                >
                                    <IconButton
                                        component="label"
                                        sx={{
                                            bgcolor: "white",
                                            color: "#3f51b5",
                                            "&:hover": {
                                                bgcolor: "#f0f0f0",
                                            },
                                            p: 0.5,
                                        }}
                                    >
                                        <EditIcon />
                                        <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                                    </IconButton>
                                    <IconButton
                                        onClick={() => setImage("")}
                                        sx={{
                                            bgcolor: "white",
                                            color: "#3f51b5",
                                            "&:hover": {
                                                bgcolor: "#f0f0f0",
                                            },
                                            p: 0.5,
                                        }}
                                    >
                                        <Remove />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    </ClickAwayListener>

                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem", mt: 1 }}>
                        {getValues("name")}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                        sx={{ fontStyle: "italic" }}
                    >
                        {getValues("email")}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        {(["name", "email", "password"] as const).map((field) => (
                            <Box
                                key={field}
                                sx={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    my: 2
                                }}
                            >
                                <Typography sx={{ fontWeight: "bold" }}>
                                    {field === "name"
                                        ? "Nome"
                                        : field === "email"
                                            ? "Email"
                                            : "Senha"}
                                </Typography>

                                {editing[field] ? (
                                    <TextField
                                        variant="standard"
                                        type={field === "password" && !showPassword ? "password" : "text"}
                                        {...register(field)}
                                        error={!!errors[field]}
                                        helperText={errors[field]?.message}
                                        autoFocus
                                        sx={{ ml: 2, width: "60%" }}
                                        onBlur={() => toggleEdit(field)}
                                        InputProps={{
                                            endAdornment:
                                                field === "password" && (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={(e) => {
                                                                e.preventDefault();
                                                                e.stopPropagation();
                                                                setShowPassword((prev) => !prev);
                                                            }}
                                                            onMouseDown={(e) => e.preventDefault()}
                                                            edge="end"
                                                            size="small"
                                                        >
                                                            {showPassword ? <VisibilityOff /> : <Visibility />}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            sx: {
                                                "&:before": {
                                                    borderBottomColor: "#3f51b5"
                                                },
                                                "&:after": {
                                                    borderBottomColor: "#3f51b5"
                                                }
                                            }
                                        }}
                                    />
                                ) : (
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Typography>
                                            {field === "password" ? "••••••••" : getValues(field)}
                                        </Typography>
                                        <IconButton size="small" onClick={() => toggleEdit(field)}>
                                            <EditIcon
                                                fontSize="small"
                                                sx={{
                                                    color: "#3f51b5",
                                                    fill: "none",
                                                    stroke: "currentColor",
                                                    strokeWidth: 1.5
                                                }}
                                            />
                                        </IconButton>
                                    </Box>
                                )}
                            </Box>
                        ))}

                        <Button variant="contained" color="primary" fullWidth type="submit" sx={{ mt: 4 }}>
                            Salvar Alterações
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    );
}
