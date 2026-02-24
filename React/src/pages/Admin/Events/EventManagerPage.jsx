import { useEffect, useState } from "react";
import {
  Button,
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
  Badge,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  TablePagination,
  Tooltip,
} from "@mui/material";

import { Edit, Delete, Groups } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { eventService } from "../../../services/eventService";
import { fileService } from "../../../services/filesService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import "./EventManagerPage.css";

// Validación Zod
const eventSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  description: z.string().min(1, "La descripción es obligatoria"),
  end_date: z
    .string()
    .optional()
    .refine((v) => !v || /^\d{4}-\d{2}-\d{2}$/.test(v), "Fecha inválida (YYYY-MM-DD)"),
});

export function EventManagerPage() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  const [openModal, setOpenModal] = useState(false);
  const [currentEvent, setCurrentEvent] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [deletingID, setDeletingID] = useState(null);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      title: "",
      description: "",
      end_date: "",
    },
  });

  // Obtener eventos
  useEffect(() => {
    eventService
      .getAllEvents()
      .then((response) => {
        setEvents(response.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const handleViewInscriptions = (id) => {
    navigate(`/admin/events/${id}/inscriptions`);
  };

  const handleEditar = (id) => {
    const ev = events.find((n) => n.id === id);
    if (!ev) return;

    setCurrentEvent(ev);
    reset({
      title: ev.title || "",
      description: ev.description || "",
      end_date: ev.end_date ? String(ev.end_date).slice(0, 10) : "",
    });
    setPreview(ev.image || null);
    setImagenFile(null);
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentEvent(null);
    reset();
    setPreview(null);
    setImagenFile(null);
  };

  const handleSaveChanges = async (data) => {
    if (!currentEvent) return;
    setModalLoading(true);

    try {
      let imageUrl =
        typeof currentEvent.image === "string" ? currentEvent.image : "";

      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile, imagenFile.name);
        const uploadResponse = await fileService.UploadFile(formData);
        imageUrl = uploadResponse.data.url || imageUrl;
      }

      const payload = {
        title: data.title,
        description: data.description,
        end_date: data.end_date ? data.end_date : null,
        image: imageUrl,
      };

      await eventService.updateEvent(currentEvent.id, payload);

      setEvents((prev) =>
        prev.map((n) => (n.id === currentEvent.id ? { ...n, ...payload } : n))
      );

      handleCloseModal();
    } catch (err) {
      alert("Error al guardar los cambios");
      console.error(err);
    } finally {
      setModalLoading(false);
    }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este evento?")) return;

    try {
      setDeletingID(id);
      await eventService.deleteEventById(id);
      setEvents((prev) => prev.filter((n) => n.id !== id));
    } catch (err) {
      alert("Error al eliminar el evento");
      console.error(err);
    } finally {
      setDeletingID(null);
    }
  };

  const handleCrear = () => {
    navigate("/admin/event-new");
  };

  return (
    <div className="event-manager-page">
      <Container className="container">
        <div className="header">
          <Typography variant="h4">Administración de Eventos</Typography>
          <Button className="create-button" onClick={handleCrear} variant="contained">
            Nuevo Evento
          </Button>
        </div>

        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <Paper className="table-container">
            <TableContainer>
              <Table>
                <TableHead className="table-header">
                  <TableRow>
                    <TableCell><b>ID</b></TableCell>
                    <TableCell><b>Título</b></TableCell>
                    <TableCell><b>Fecha fin</b></TableCell>
                    <TableCell><b>Inscriptos</b></TableCell>
                    <TableCell align="right"><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>

                <TableBody>
                  {events
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((ev) => (
                      <TableRow key={ev.id}>
                        <TableCell>{ev.id}</TableCell>
                        <TableCell>{ev.title}</TableCell>
                        <TableCell>
                          {ev.end_date ? String(ev.end_date).slice(0, 10) : "-"}
                        </TableCell>
                        <TableCell>{ev.inscriptions_count ?? 0}</TableCell>

                        <TableCell align="right">

                      <Tooltip title="Ver inscriptos">
                        <IconButton
                          color="primary"
                          onClick={() => handleViewInscriptions(ev.id)}
                        >
                      <Badge
                        badgeContent={ev.inscriptions_count ?? 0}
                        overlap="circular"
                        size="small"
                        sx={{
                          "& .MuiBadge-badge": {
                            backgroundColor: "#dfa335",
                            color: "white",
                            fontSize: "0.65rem",
                            height: "16px",
                            minWidth: "16px",
                          },
                        }}
                      >
                            <Groups fontSize="small" />
                          </Badge>
                        </IconButton>
                      </Tooltip>

                          <Tooltip title="Editar">
                            <IconButton
                              onClick={() => handleEditar(ev.id)}
                            >
                              <Edit />
                            </IconButton>
                          </Tooltip>

                          <Tooltip title="Eliminar">
                            <IconButton
                              color="error"
                              onClick={() => handleEliminar(ev.id)}
                              disabled={deletingID === ev.id}
                            >
                              <Delete />
                            </IconButton>
                          </Tooltip>

                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={events.length}
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