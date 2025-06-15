import {
    Box,
    Avatar,
    Typography,
    TextField,
    IconButton,
    Divider,
    Paper,
    Button,
    InputAdornment} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useState } from "react";
import Header from "../components/Header";

export default function AccountSettings() {
    const [formData, setFormData] = useState({
        name: "Jessica Alba",
        email: "jenny@gmail.com",
        password: "password123",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    });

    const [editing, setEditing] = useState<{ [key: string]: boolean }>({});
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    const toggleEdit = (field: string) => {
        setEditing((prev) => ({ ...prev, [field]: !prev[field] }));
    };

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            const reader = new FileReader();

            reader.onload = () => {
                setFormData((prev) => ({ ...prev, image: reader.result as string }));
            };

            reader.readAsDataURL(e.target.files[0]);
        }
    };

    return (
        <>
            <Header
                title="Minha Conta"
                backgroundColor="#1a1a1a"
            />

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                    mt: 8,
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
                        width: "100%",
                    }}
                >
                    <Box sx={{ position: "relative", display: "inline-block" }}>
                        <Avatar
                            src={formData.image}
                            sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                        />
                        <IconButton
                            component="label"
                            sx={{ position: "absolute", bottom: 0, right: 0 }}
                        >
                            <EditIcon fontSize="small" sx={{ color: "#3f51b5" }} />
                            <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                        </IconButton>
                    </Box>

                    <Typography sx={{ fontWeight: "bold", fontSize: "1.2rem" }}>
                        {formData.name}
                    </Typography>
                    <Typography
                        variant="body2"
                        color="text.secondary"
                        mb={2}
                        sx={{ fontStyle: "italic" }}
                    >
                        {formData.email}
                    </Typography>

                    <Divider sx={{ mb: 2 }} />

                    {[
                        { label: "Nome", key: "name" },
                        { label: "Email", key: "email" },
                        { label: "Senha", key: "password" }
                    ].map(({ label, key }) => (
                        <Box
                            key={key}
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                my: 2
                            }}
                        >
                            <Typography sx={{ fontWeight: "bold" }}>{label}</Typography>
                            {editing[key] ? (
                                <TextField
                                    variant="standard"
                                    type={key === "password" && !showPassword ? "password" : "text"}
                                    value={formData[key as keyof typeof formData]}
                                    onChange={(e) => handleChange(key, e.target.value)}
                                    onBlur={(e) => {
                                        const target = e.currentTarget;
                                        setTimeout(() => {
                                            if (target && !target.contains(document.activeElement)) {
                                                toggleEdit(key);
                                            }
                                        }, 100);
                                    }}
                                    autoFocus
                                    sx={{ ml: 2, width: "60%" }}
                                    InputProps={{
                                        endAdornment: key === "password" && (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        setShowPassword(!showPassword);
                                                    }}
                                                    onMouseDown={(e) => e.preventDefault()}
                                                    edge="end"
                                                    size="small"
                                                >
                                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}
                                />
                            ) : (
                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                    <Typography>
                                        {key === "password" ? "••••••••" : formData[key as keyof typeof formData]}
                                    </Typography>
                                    <IconButton size="small" onClick={() => toggleEdit(key)}>
                                        <EditIcon fontSize="small" sx={{
                                            color: "#3f51b5", fill: "none",
                                            stroke: "currentColor",
                                            strokeWidth: 1.5
                                        }} />
                                    </IconButton>
                                </Box>
                            )}
                        </Box>
                    ))}

                    <Button variant="contained" color="secondary" fullWidth sx={{ mt: 4 }}>
                        Salvar Alterações
                    </Button>
                </Paper>
            </Box>
        </>
    );
}
