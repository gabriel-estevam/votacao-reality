// AuthTabs.tsx
import { Tabs, Tab } from "@mui/material";

interface AuthTabsProps {
  value: "login" | "register";
  onChange: (_: React.SyntheticEvent, newValue: "login" | "register") => void;
}

export default function AuthTabs({ value, onChange }: Readonly<AuthTabsProps>) {
  return (
    <Tabs
      value={value}
      onChange={onChange}
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
  );
}
