import { Box, Typography } from "@mui/material";
import { useState } from "react";
import AuthTabs from "../components/AuthForm/AuthTabs";
import ForgotPasswordForm from "../components/AuthForm/ForgotPasswordForm";
import LoginForm from "../components/AuthForm/LoginForm";
import RegisterForm from "../components/AuthForm/RegisterForm";

export default function LoginRegister() {
  const [tab, setTab] = useState<"login" | "register">("login");
  const [forgotPassword, setForgotPassword] = useState(false);

  const handleTabChange = (_: any, newValue: "login" | "register") => {
    setTab(newValue);
    setForgotPassword(false);
  };

  return (
    <Box
      sx={{
        width: 420,
        mx: "auto",
        mt: 20,
        p: 4,
        border: "1px solid #3f51b5",
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
        <AuthTabs value={tab} onChange={handleTabChange} />
      )}

      <Box mt={3}>
        {forgotPassword ? (
          <ForgotPasswordForm onBack={() => setForgotPassword(false)} />
        ) : tab === "login" ? (
          <LoginForm onForgotPassword={() => setForgotPassword(true)} />
        ) : (
          <RegisterForm />
        )}
      </Box>
    </Box>
  );
}
