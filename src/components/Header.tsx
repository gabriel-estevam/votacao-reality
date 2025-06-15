import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Menu,
  MenuItem,
  ListItemIcon,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import LogoutIcon from "@mui/icons-material/Logout";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

interface HeaderProps {
  title?: string;
  backgroundColor?: string;
  rightMenuItems?: React.ReactNode;
}

export default function Header({
  title = "BBB",
  backgroundColor = "#5700c9",
  rightMenuItems,
}: Readonly<HeaderProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    handleClose();
    localStorage.clear();
    navigate("/login");
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor,
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
        <Link
          component={RouterLink}
          to="/votacao"
          underline="none"
          sx={{ fontWeight: "bold", fontSize: "1.5rem", ml: 1 }}
        >
          <span style={{ color: "white" }}>g</span>
          <span style={{ color: "#00e0ff" }}>show</span>
        </Link>

        <Typography
          variant="h5"
          sx={{
            color: "white",
            position: "absolute",
            left: "50%",
            transform: "translateX(-50%)",
          }}
        >
          {title}
        </Typography>

        <Box>
          <IconButton color="inherit" onClick={handleMenuClick}>
            <AccountCircleIcon fontSize="large" />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            transformOrigin={{ vertical: "top", horizontal: "center" }}
            PaperProps={{
              sx: {
                minWidth: 160,
                px: 1,
              },
            }}
          >
            {rightMenuItems}

            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <LogoutIcon fontSize="small" />
              </ListItemIcon>
              Sair
            </MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
