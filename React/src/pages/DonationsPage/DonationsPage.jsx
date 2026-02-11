import "./DonationsPage.css";
import {
  Container,
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Button,
  Stack,
  Link,
} from "@mui/material";
import { CheckCircle, Cancel, LocalPhone, Email, Place } from "@mui/icons-material";

export function DonationsPage() {
  return (
    <div className="donations-background">
      <Container maxWidth="md" className="donations">
       
        <Typography variant="h2" className="donations-title">
          Donaciones de libros
        </Typography>

        
        <Typography variant="body1" className="donations-intro">
          La Biblioteca Popular “Dr. Antonio Novaro” recibe donaciones de libros para ampliar
          su catálogo y preservar el patrimonio cultural. Tu aporte ayuda a que más
          personas accedan al conocimiento y la lectura.
        </Typography>

        <Paper className="donations-card">
          <Typography variant="h6" className="donations-subtitle">
            Requisitos para donar
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon><CheckCircle className="icon-success" /></ListItemIcon>
              <ListItemText primary="Libros en buen estado, completos y sin humedad." />
            </ListItem>
            <ListItem>
              <ListItemIcon><CheckCircle className="icon-success" /></ListItemIcon>
              <ListItemText primary="Se aceptan literatura, historia, ciencia, educación y cultura general." />
            </ListItem>
            <ListItem>
              <ListItemIcon><Cancel className="icon-error" /></ListItemIcon>
              <ListItemText primary="No se aceptan enciclopedias obsoletas ni revistas antiguas." />
            </ListItem>
            <ListItem>
              <ListItemIcon><Cancel className="icon-error" /></ListItemIcon>
              <ListItemText primary="No se aceptan libros escolares desactualizados." />
            </ListItem>
          </List>
        </Paper>

        <Paper className="donations-card">
          <Typography variant="h6" className="donations-subtitle">
            ¿Cómo donar?
          </Typography>
          <Typography variant="body1">
            Podés acercar los libros personalmente a la sede de la biblioteca.
          </Typography>
          <Typography variant="body2" color="text.secondary" className="donations-intro-note">
            Horarios de recepción: Lunes a viernes de 13:30 a 19 horas, y adicionalmente  los martes y jueves de 9 a 12 horas.
          </Typography>
        </Paper>

        <Paper className="donations-card">
          <Typography variant="h6" className="donations-subtitle">
            Contacto
          </Typography>
          <Stack spacing={1}>
            <Stack direction="row" spacing={1} alignItems="center">
              <LocalPhone fontSize="small" />
              <Link href="tel:+542346432493" underline="hover" color="inherit">
                (2346) 432493
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Email fontSize="small" />
              <Link href="mailto:contacto@biblioteca.com" underline="hover" color="inherit">
                contacto@biblioteca.com
              </Link>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <Place fontSize="small" />
              <Link
                href="https://www.google.com/maps?q=Moreno%2030,%20Chivilcoy,%20Buenos%20Aires"
                target="_blank"
                underline="hover"
                color="inherit"
              >
                Moreno 30, Chivilcoy, Buenos Aires
              </Link>
            </Stack>
          </Stack>
        </Paper>

        <Button
          variant="contained"
          color="primary"
          href="mailto:contacto@biblioteca.com"
          className="donations-btn"
        >
          Consultar por donación
        </Button>
      </Container>
    </div>
  );
}
