import {
    Box,
    Avatar,
    Typography,
    TextField,
    IconButton,
    Divider,
    Paper,
    Button
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function AccountSettings() {
    const [formData, setFormData] = useState({
        name: "Jessica Alba",
        email: "jenny@gmail.com",
        password: "••••••••",
        image: "https://randomuser.me/api/portraits/women/44.jpg"
    });

    const [editing, setEditing] = useState<{ [key: string]: boolean }>({});

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
        <Paper
            elevation={3}
            sx={{
                maxWidth: 500,
                mx: "auto",
                mt: 6,
                p: 4,
                border: "1px solid #3f51b5",
                borderRadius: 2,
                textAlign: "center"
            }}
        >
            {/* Avatar com botão de upload */}
            <Box sx={{ position: "relative", display: "inline-block" }}>
                <Avatar
                    src={formData.image}
                    sx={{ width: 100, height: 100, mx: "auto", mb: 1 }}
                />
                <IconButton
                    component="label"
                    sx={{ position: "absolute", bottom: 0, right: 0 }}
                >
                    <EditIcon fontSize="small" />
                    <input hidden accept="image/*" type="file" onChange={handleImageChange} />
                </IconButton>
            </Box>

            <Typography variant="h6">{formData.name}</Typography>
            <Typography variant="body2" color="text.secondary" mb={2}>
                {formData.email}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            {/* Campos editáveis */}
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
                        my: 1
                    }}
                >
                    <Typography fontWeight="bold">{label}</Typography>
                    {editing[key] ? (
                        <TextField
                            variant="standard"
                            type={key === "password" ? "password" : "text"}
                            value={formData[key as keyof typeof formData]}
                            onChange={(e) => handleChange(key, e.target.value)}
                            onBlur={() => toggleEdit(key)}
                            autoFocus
                            sx={{ ml: 2, width: "60%" }}
                        />
                    ) : (
                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                            <Typography>
                                {key === "password" ? "••••••••" : formData[key as keyof typeof formData]}
                            </Typography>
                            <IconButton size="small" onClick={() => toggleEdit(key)}>
                                <EditIcon fontSize="small" />
                            </IconButton>
                        </Box>
                    )}
                </Box>
            ))}

            <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
                Salvar Alterações
            </Button>
        </Paper>
    );
}
