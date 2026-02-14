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
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Box,
  TablePagination,
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
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
  // end_date es opcional (tu BD la permite NULL); si viene, validar formato
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

  // paginación
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
        // si tu API incluye borrado lógico, podés filtrar acá:
        // const data = (response.data ?? []).filter(e => !e.deleted);
        setEvents(response.data ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  

  // Abrir modal con datos cargados
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

  // Cerrar modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentEvent(null);
    reset();
    setPreview(null);
    setImagenFile(null);
  };

  // Guardar cambios
  const handleSaveChanges = async (data) => {
    if (!currentEvent) return;
    setModalLoading(true);
    try {
      let imageUrl = typeof currentEvent.image === "string" ? currentEvent.image : "";

      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile, imagenFile.name);
        const uploadResponse = await fileService.UploadFile(formData);
        imageUrl = uploadResponse.data.url || imageUrl;
      }

      const payload = {
        title: data.title,
        description: data.description,
        end_date: data.end_date ? data.end_date : null, // tu BD permite NULL
        image: imageUrl, // tu columna es NOT NULL: evitar null
        // si quisieras también enviar is_Active/deleted, agregalos aquí
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

  // Eliminar evento
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

  const handleInscriptions = () => {
    navigate("/admin/inscriptions");
  };


  return (
    <div className="event-manager-page">
      <Container className="container">
        <div className="header">
          <Typography variant="h4">Administración de Eventos</Typography>
          <Button className="create-button" onClick={handleCrear} variant="contained">
            <span className="texto">Nuevo Evento</span>
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
                      <TableRow className="table-row" key={ev.id}>
                        <TableCell>{ev.id}</TableCell>
                        <TableCell className="table-row-title">{ev.title}</TableCell>
                        <TableCell>
                          {ev.end_date ? String(ev.end_date).slice(0, 10) : "-"}
                        </TableCell>
                        <TableCell>{ev.inscriptions_count ?? 0}</TableCell>
                        <TableCell align="right">
                          <IconButton className="edit-button" onClick={() => handleEditar(ev.id)}>
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleEliminar(ev.id)}
                            disabled={deletingID === ev.id}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            
          </Paper>
        )}

        <Button
          variant="outlined"
          color="primary"
          onClick={() => window.open("/cursos-y-eventos", "_blank")}
          sx={{
            borderColor: "#8b5e34",
            color: "#8b5e34 ",
            fontWeight: "bold",
            borderRadius: "12px",
            marginTop: "20px",
            padding: "12px 20px",
            backgroundColor: "#faf6f1ff",
            "&:hover": { backgroundColor: "#e0d8ceff", borderColor: "#283618" },
          }}
        >
          Ver Eventos
        </Button>

         
        <Button
          variant="outlined"
          color="primary"
          onClick={handleInscriptions}
          sx={{
            borderColor: "#8b5e34",
            color: "#8b5e34 ",
            fontWeight: "bold",
            borderRadius: "12px",
            marginTop: "20px",
            marginLeft: "20px",
            padding: "12px 20px",
            backgroundColor: "#faf6f1ff",
            "&:hover": { backgroundColor: "#e0d8ceff", borderColor: "#283618" },
          }}
          
        >
          Ver Inscriptos
        </Button>

        {/* Modal de edición */}
        <Dialog
          open={openModal}
          onClose={handleCloseModal}
          className="edit-event-dialog"
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Editar Evento</DialogTitle>
          <DialogContent>
            <form onSubmit={handleSubmit(handleSaveChanges)}>
              <TextField
                id="edit-title"
                label="Título"
                variant="outlined"
                fullWidth
                {...register("title")}
                margin="normal"
                error={!!errors.title}
                helperText={errors.title?.message}
              />

              <TextField
                id="edit-description"
                label="Descripción"
                variant="outlined"
                fullWidth
                {...register("description")}
                margin="normal"
                multiline
                rows={8}
                error={!!errors.description}
                helperText={errors.description?.message}
              />

              <TextField
                id="edit-end_date"
                label="Fecha fin"
                type="date"
                fullWidth
                margin="normal"
                InputLabelProps={{ shrink: true }}
                {...register("end_date")}
                error={!!errors.end_date}
                helperText={errors.end_date?.message}
              />

              <Box className="preview-imagen" sx={{ mt: 2 }}>
                {preview ? (
                  <img
                    src={preview}
                    alt="Vista previa"
                    style={{ width: "100%", maxHeight: 200, objectFit: "cover" }}
                  />
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    Vista previa de la imagen
                  </Typography>
                )}

                <Button
                  className="edit-image-btn"
                  variant="outlined"
                  component="label"
                  fullWidth
                  sx={{ mt: 1 }}
                >
                  Subir Imagen
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        setImagenFile(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
              </Box>

              <DialogActions sx={{ mt: 2 }}>
                <Button disabled={modalLoading} onClick={handleCloseModal} color="secondary">
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  color="primary"
                  variant="contained"
                  disabled={modalLoading}
                  sx={{
                    position: "relative",
                    fontWeight: "bold",
                    borderRadius: "8px",
                    padding: "8px 20px",
                    backgroundColor: "#606c38",
                    color: "#fefae0",
                    minWidth: "160px",
                    height: "40px",
                    "&:hover": { backgroundColor: "#283618" },
                  }}
                >
                  {modalLoading ? (
                    <CircularProgress
                      size={24}
                      sx={{
                        color: "#fefae0",
                        position: "absolute",
                        top: "50%",
                        left: "50%",
                        marginTop: "-12px",
                        marginLeft: "-12px",
                      }}
                    />
                  ) : (
                    "Guardar Cambios"
                  )}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
