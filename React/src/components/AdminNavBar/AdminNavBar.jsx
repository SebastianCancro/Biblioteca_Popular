import React, { useState } from 'react';
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
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { Link, useNavigate } from 'react-router-dom'; 
import './AdminNavBar.css';
import logo from '/Images/logo2.png';

const AdminNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const navigate = useNavigate(); 

  const toggleDrawer = (open) => () => setOpenDrawer(open);

  const handleLogout = () => {
    localStorage.removeItem("token"); 
    localStorage.removeItem("role");   
    localStorage.removeItem("user");
    navigate("/login"); 
  };

  //Obtener la inicial del usuario guardado en localStorage//
  const getUserInitial = () => {
    try {
      const userData = JSON.parse(localStorage.getItem("user"));
      return userData?.name
        ? userData.name.charAt(0).toUpperCase()
        : "U";
    } catch {
      return "U";
    }
  };

  return (
    <>
      <AppBar position="static" className="admin-navbar">
        <Toolbar className="admin-toolbar">
          <div className="logo-container">
            <Link to="/admin">
              <img src={logo} alt="Logo" className="logo" />
            </Link>
          </div>

          <Typography variant="h4" className="welcome-panel">
            Bienvenido al Panel Administrativo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

        
          <div className="desktop-only user-section">
            <Avatar className="user-avatar">{getUserInitial()}</Avatar>
            <Button className="logout-button" onClick={handleLogout}>
              Cerrar sesión
            </Button>
          </div>

          {/* Menú móvil */}
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

      <Drawer anchor="right" open={openDrawer} onClose={toggleDrawer(false)}>
        <Box
          sx={{
            width: 250,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            mt: 4
          }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <Avatar className="drawer-avatar">{getUserInitial()}</Avatar>

          <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
            Bienvenido
          </Typography>

          <Divider sx={{ width: '100%', mb: 2 }} />

          <List sx={{ width: '100%' }}>
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
                <ListItemText primary="Cerrar sesión" className="logout-text" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </>
  );
};

export default AdminNavBar;
