import {
  Box,
  TextField,
  Typography,
  Button,
  InputAdornment,
  IconButton
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { useState } from "react";

interface ForgotPasswordProps {
  onBack: () => void;
}

export default function ForgotPasswordForm({ onBack }: Readonly<ForgotPasswordProps>) {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Recuperar senha para:", email);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ position: "relative", mb: 2 }}>
      <IconButton onClick={onBack} sx={{ position: "absolute", left: 0, top: -36 }}>
        <ArrowBackIcon />
      </IconButton>

      <Typography align="center" sx={{ fontWeight: "bold", mb: 2 }}>
        Recuperar Senha
      </Typography>

      <TextField
        fullWidth
        label="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailOutlineIcon />
            </InputAdornment>
          )
        }}
      />

      <Button variant="contained" color="primary" fullWidth sx={{ mt: 3 }} type="submit">
        Enviar
      </Button>
    </Box>
  );
}
