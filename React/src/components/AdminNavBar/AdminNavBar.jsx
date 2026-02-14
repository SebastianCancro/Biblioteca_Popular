import React, { useEffect, useState } from 'react';
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
/* lee el usuario guardado en localStorage de forma segura */
function getUserFromStorage() {
  try {
    const raw = localStorage.getItem('current_user') || localStorage.getItem('user');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
/* iniciales del usuario para el Avatar */
function getInitials(user) {
  if (!user) return '';
  const n = (user.nombre || user.name || '').trim();
  const a = (user.apellido || user.lastName || '').trim();

  if (n || a) {
    const first = n ? n[0] : '';
    const last = a ? a[0] : '';
    return (first + last).toUpperCase(); // puede ser 1 o 2 letras//
  }

  const em = (user.email || '').trim();
  return em ? em[0].toUpperCase() : '';
}
const AdminNavBar = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [user, setUser] = useState(getUserFromStorage()); // estado del usuario para refrescar avatar //
  const navigate = useNavigate();

  const toggleDrawer = (open) => () => setOpenDrawer(open);

  useEffect(() => {
    const refresh = () => setUser(getUserFromStorage());
    // Se actualiza al cambiar auth en la app o al cambiar storage //
    window.addEventListener('auth:user-changed', refresh);
    window.addEventListener('storage', refresh);
    return () => {
      window.removeEventListener('auth:user-changed', refresh);
      window.removeEventListener('storage', refresh);
    };
  }, []);

  const handleLogout = () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('role');
      localStorage.removeItem('current_user');
      localStorage.removeItem('user');
    } catch {}
    // Avisa al resto de la app que cambio el usuario y redirige a /login //
    window.dispatchEvent(new Event('auth:user-changed'));
    navigate('/login');
  };
  // Click en logo, volver atras //
  const handleLogoClick = () => {
    if (window.history.length > 1) {
      navigate(-1);
    } else {
      navigate('/admin');
    }
  };
   // Inicial para el avatar //
  const userInitial = getInitials(user);

  return (
    <>
      <AppBar position="static" className="admin-navbar">
        <Toolbar className="admin-toolbar">
          <div className="logo-container">
            {/* Logo vuelve atras */}
            <img
              src={logo}
              alt="Logo"
              className="logo"
              onClick={handleLogoClick}
              style={{ cursor: 'pointer', display: 'block' }}
            />
          </div>

          <Typography variant="h4" className="welcome-panel">
            Bienvenido al Panel Administrativo
          </Typography>

          <Box sx={{ flexGrow: 1 }} />

          <div className="desktop-only user-section">
            <Avatar className="user-avatar">{userInitial}</Avatar>
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
          <Avatar className="drawer-avatar">{userInitial}</Avatar>

          <Typography variant="body1" sx={{ mb: 2, fontWeight: 'bold' }}>
            {user ? (user.nombre || user.name || user.email) : 'Bienvenido'}
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
