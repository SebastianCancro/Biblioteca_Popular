import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Button,
  Avatar,
  Typography,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";
import { Link, useNavigate } from "react-router-dom";

import "./AdminNavBar.css";
import logo from "/Images/logo2.png";

import { authService } from "../../services/authService";

function getInitials(user) {
  if (!user) return "";

  const n = (user.nombre || user.name || "").trim();
  const a = (user.apellido || user.lastName || "").trim();

  if (n || a) {
    const first = n ? n[0] : "";
    const last = a ? a[0] : "";
    return (first + last).toUpperCase();
  }

  const em = (user.email || "").trim();
  return em ? em[0].toUpperCase() : "";
}

const AdminNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);

  const [user, setUser] = useState(() => {
    try {
      const cached = localStorage.getItem("current_user");
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  });

  const navigate = useNavigate();

  const toggleDrawer = (open) => () => setOpenDrawer(open);

  useEffect(() => {
    const verifyUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        navigate("/login");
        return;
      }

      try {
        const data = await authService.verify();

        const userData = data.user || data;

        setUser(userData);

        localStorage.setItem(
          "current_user",
          JSON.stringify(userData)
        );

      } catch (error) {

        console.error("Token inválido:", error);

        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("current_user");
        localStorage.removeItem("user");

        navigate("/login");
      }
    };

    verifyUser();

  }, [navigate]);

  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("current_user");
    localStorage.removeItem("user");

    navigate("/login");
  };

  const handleLogoClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate("/admin");
    }
  };

  const userInitial = getInitials(user);

  return (
    <>
      <AppBar position="static" className="admin-navbar">
        <Toolbar className="admin-toolbar">

          <div className="logo-container">
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onClick={handleLogoClick}
              style={{ cursor: "pointer", display: "block" }}
            />
          </div>

          <Typography variant="h4" className="welcome-panel">
            Bienvenido al Panel Administrativo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <div className="desktop-only user-section">

            <Avatar className="user-avatar">
              {userInitial}
            </Avatar>

            <Button
              className="logout-button"
              onClick={handleLogout}
            >
              Cerrar sesión
            </Button>

          </div>

          <IconButton
            edge="end"
            color="inherit"
            aria-label="menu"
            onClick={toggleDrawer(true)}
            className="mobile-only"
          >
            <MenuIcon fontSize="large" />
          </IconButton>

        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={openDrawer}
        onClose={toggleDrawer(false)}
      >
        <Box
          sx={{
            width: 250,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            mt: 4
          }}
        >

          <Avatar className="drawer-avatar">
            {userInitial}
          </Avatar>

          <Typography
            variant="body1"
            sx={{ mb: 2, fontWeight: "bold" }}
          >
            {user ? user.nombre || user.name || user.email : "Bienvenido"}
          </Typography>

          <Divider sx={{ width: "100%", mb: 2 }} />

          <List sx={{ width: "100%" }}>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/articles">
                <ListItemText primary="Noticias" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/events">
                <ListItemText primary="Cursos y Eventos" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton component={Link} to="/admin/users">
                <ListItemText primary="Usuarios" />
              </ListItemButton>
            </ListItem>

            <Divider sx={{ my: 2 }} />

            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout}>
                <ListItemText primary="Cerrar sesión" />
              </ListItemButton>
            </ListItem>

          </List>

        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavBar;