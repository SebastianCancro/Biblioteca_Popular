import { useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  CircularProgress,
  Button,
  Tooltip,
  TablePagination,
  Box,
  Chip,
} from "@mui/material";

import { Delete, ArrowBack, Download } from "@mui/icons-material";
import { useNavigate, useParams } from "react-router";
import { inscriptionService } from "../../../services/inscriptionService";
import { eventService } from "../../../services/eventService";
import { inscriptionExportService } from "../../../services/inscriptionExportService";

import "./InscriptionManagerPage.css";

export function InscriptionManagerPage() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [inscriptions, setInscriptions] = useState([]);
  const [eventData, setEventData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [deletingID, setDeletingID] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Obtener evento + inscriptos
  useEffect(() => {
    setLoading(true);

    Promise.all([
      eventService.getEventById(id),
      inscriptionService.getInscriptionsByEvent(id),
    ])
      .then(([eventResponse, inscriptionsResponse]) => {
        setEventData(eventResponse.data);
        setInscriptions(inscriptionsResponse.data ?? []);
      })
      .catch((err) => {
        console.error(err);
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleEliminar = async (inscriptionId) => {
    if (!window.confirm("¿Eliminar esta inscripción?")) return;

    try {
      setDeletingID(inscriptionId);
      await inscriptionService.deleteInscriptionById(inscriptionId);
      setInscriptions((prev) =>
        prev.filter((ins) => ins.id !== inscriptionId)
      );
    } catch (err) {
      alert("Error al eliminar la inscripción");
      console.error(err);
    } finally {
      setDeletingID(null);
    }
  };

  const handleBack = () => {
    navigate("/admin/events");
  };

const handleDownloadExcel = async () => {
  try {
    const blob = await inscriptionExportService.exportByEvent(id);

    const url = window.URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `inscriptos_evento_${id}.xlsx`);
    document.body.appendChild(link);
    link.click();

    link.remove();
    window.URL.revokeObjectURL(url);
  } catch (error) {
    console.error(error);
    alert("Error al descargar el archivo");
  }
};

  return (
    <div className="inscription-manager-page">
      <Container className="container">
        {/* HEADER SUPERIOR */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 3,
          }}
        >
          <Box>
            <Typography className="title-inscription">
              Inscriptos del Evento
            </Typography>

            <Typography variant="subtitle1" color="text.secondary">
              {eventData?.title || "Cargando..."}
            </Typography>

            {/* Cantidad total */}
            {!loading && (
              <Chip
                label={`Total: ${inscriptions.length} inscriptos`}
                color="primary"
                sx={{ marginTop: 1 }}
              />
            )}
          </Box>

          <Box sx={{ display: "flex", gap: 1 }}>
            <Tooltip title="Descargar planilla Excel">
              <Button
                variant="contained"
                startIcon={<Download />}
                onClick={handleDownloadExcel}
                disabled={inscriptions.length === 0}
              >
                Descargar Planilla
              </Button>
            </Tooltip>

            <Tooltip title="Volver a eventos">
              <IconButton onClick={handleBack}>
                <ArrowBack />
              </IconButton>
            </Tooltip>
          </Box>
        </Box>

        {/* CONTENIDO */}
        {loading ? (
          <Box sx={{ textAlign: "center", marginTop: 5 }}>
            <CircularProgress />
          </Box>
        ) : (
          <Paper className="table-container">
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Nombre</b></TableCell>
                    <TableCell><b>Email</b></TableCell>
                    <TableCell><b>Fecha inscripción</b></TableCell>
                    <TableCell align="right"><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {inscriptions.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        No hay inscriptos en este evento
                      </TableCell>
                    </TableRow>
                  ) : (
                    inscriptions
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((ins) => (
                        <TableRow key={ins.id}>
                          <TableCell>{ins.id}</TableCell>
                          <TableCell>{ins.name}</TableCell>
                          <TableCell>{ins.email}</TableCell>
                          <TableCell>
                            {ins.created_at
                              ? String(ins.created_at).slice(0, 10)
                              : "-"}
                          </TableCell>

                          <TableCell align="right">
                            <Tooltip title="Eliminar inscripción">
                              <IconButton
                                color="error"
                                onClick={() => handleEliminar(ins.id)}
                                disabled={deletingID === ins.id}
                              >
                                <Delete />
                              </IconButton>
                            </Tooltip>
                          </TableCell>
                        </TableRow>
                      ))
                  )}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={inscriptions.length}
              page={page}
              onPageChange={(e, newPage) => setPage(newPage)}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={(e) => {
                setRowsPerPage(parseInt(e.target.value, 10));
                setPage(0);
              }}
              labelRowsPerPage="Filas por página:"
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        )}
      </Container>
    </div>
  );
}