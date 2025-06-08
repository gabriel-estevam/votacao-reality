import { AppBar, Toolbar, Typography, IconButton, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

export default function Header() {
  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#5700c9",
        boxShadow: 2,
        width: "100%",
      }}
    >
      <Toolbar
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: { xs: 2, sm: 4 },
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton edge="start" color="inherit" aria-label="menu">
            <MenuIcon fontSize="large"/>
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: "bold", ml: 1 }}>
            <span style={{ color: "white" }}>g</span>
            <span style={{ color: "#00e0ff" }}>show</span>
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ color: "white", position: "absolute", left: "50%", transform: "translateX(-50%)" }}>
          BBB
        </Typography>

        <IconButton color="inherit" aria-label="user">
          <AccountCircleIcon fontSize="large"/>
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
