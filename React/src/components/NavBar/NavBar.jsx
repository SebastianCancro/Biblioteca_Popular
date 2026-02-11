import './NavBar.css';
import { AppBar, Toolbar, Button, Box, Container } from '@mui/material';
import { useLocation, Link } from 'react-router';

const navItems = [
  { name: 'Noticias', route: '/noticias' },
  { name: 'Cursos y eventos', route: '/cursos-y-eventos' },
  { name: 'Sobre Nosotros', route: '/nosotros' },
  { name: 'Catálogo', route: '/catalogo' },
  { name: 'Preguntas', route: '/preguntas', icon: '❓' }, 

];

const Navbar = () => {
  const location = useLocation(); // para saber qué ruta está activa //

  return (
    <AppBar position="static" color="primary">
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ justifyContent: 'space-between' }}>
          <Box className="NavBox">
            {navItems.map((item) => (
              <Button
                key={item.name}
                component={Link}
                to={item.route}
                className={`NavButton ${location.pathname === item.route ? 'active' : ''}`}
              >
                {item.icon ? `${item.name} ${item.icon}` : item.name}
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
