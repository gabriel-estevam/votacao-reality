import { Box, Avatar, Typography, TextField, IconButton, Divider, Paper, Button } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { useState } from "react";

export default function AccountSettings() {
  const [formData, setFormData] = useState({
    name: "Jessica Alba",
    email: "jenny@gmail.com",
    password: "",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
  });

  const handleChange = (field: string, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setFormData({ ...formData, image: reader.result });
        }
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
        textAlign: "center",
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
          <EditIcon fontSize="small" />
          <input
            hidden
            accept="image/*"
            type="file"
            onChange={handleImageChange}
          />
        </IconButton>
      </Box>

      <Typography variant="h6">{formData.name}</Typography>
      <Typography variant="body2" color="text.secondary" mb={2}>
        @{formData.email.split("@")[0]}
      </Typography>

      <Divider sx={{ mb: 2 }} />

      {/* Linha Nome */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 1,
        }}
      >
        <Box sx={{ flexBasis: "30%", textAlign: "left" }}>
          <Typography fontWeight="bold">Nome</Typography>
        </Box>
        <Box sx={{ flexBasis: "70%" }}>
          <TextField
            fullWidth
            variant="standard"
            value={formData.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 1,
        }}
      >
        <Box sx={{ flexBasis: "30%", textAlign: "left" }}>
          <Typography fontWeight="bold">Email</Typography>
        </Box>
        <Box sx={{ flexBasis: "70%" }}>
          <TextField
            fullWidth
            variant="standard"
            value={formData.email}
            onChange={(e) => handleChange("email", e.target.value)}
          />
        </Box>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mt: 1,
        }}
      >
        <Box sx={{ flexBasis: "30%", textAlign: "left" }}>
          <Typography fontWeight="bold">Senha</Typography>
        </Box>
        <Box sx={{ flexBasis: "70%" }}>
          <TextField
            fullWidth
            type="password"
            variant="standard"
            value={formData.password}
            onChange={(e) => handleChange("password", e.target.value)}
            placeholder="••••••••"
          />
        </Box>
      </Box>

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 4 }}>
        Salvar Alterações
      </Button>
    </Paper>
  );
}
