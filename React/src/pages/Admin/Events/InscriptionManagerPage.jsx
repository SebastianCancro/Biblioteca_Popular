import { useEffect, useState } from "react";
import { inscriptionService } from "../../../services/inscriptionService";
import {
  Button,
  Container,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Typography,
  CircularProgress,
  Paper,
} from "@mui/material";
import "./InscriptionManagerPage.css";
import { useNavigate } from "react-router";

export function InscriptionManagerPage() {
  const navigate = useNavigate();
  const [inscriptions, setInscriptions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchInscriptions() {
      try {
        const response = await inscriptionService.getAllInscriptions();
        // Asegurate que sea response.data (si usás axios)
        setInscriptions(response.data || []);
      } catch (error) {
        console.error("Error al obtener inscripciones:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchInscriptions();
  }, []);

  return (
    <div className="inscription-manager-page">
      <Container maxWidth="md" className="crear-container">
        <Button
          variant="contained"
          color="primary"
          className="volver-btn"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>
        
        <Typography className="title-inscription" variant="h4">
          Lista de Inscripciones
        </Typography>

        {loading ? (
          <CircularProgress />
        ) : inscriptions.length === 0 ? (
          <Typography variant="body1">No hay inscripciones registradas.</Typography>
        ) : (
          <Paper>
            <Table className="inscription-table">
              <TableHead className="table-header">
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Nombre</b></TableCell>
                  <TableCell><b>Apellido</b></TableCell>
                  <TableCell><b>Email</b></TableCell>
                  <TableCell><b>Teléfono</b></TableCell>
                  <TableCell><b>ID Evento</b></TableCell>
                  <TableCell><b>Nombre del Evento</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                  {inscriptions.map((inscription) => (
                    <TableRow className="table-row" key={inscription.id}>
                      <TableCell data-label="ID">{inscription.id}</TableCell>
                      <TableCell data-label="Nombre">{inscription.name}</TableCell>
                      <TableCell data-label="Apellido">{inscription.surname}</TableCell>
                      <TableCell data-label="Email">{inscription.email}</TableCell>
                      <TableCell data-label="Teléfono">{inscription.phone}</TableCell>
                      <TableCell data-label="ID Evento">{inscription.id_event}</TableCell>
                      <TableCell data-label="Nombre del Evento">{inscription.event}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
            </Table>
          </Paper>
        )}
      </Container>
    </div>
  );
}
