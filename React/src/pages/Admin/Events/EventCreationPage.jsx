import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import "./EventCreationPage.css";
import { useNavigate } from "react-router";
import { fileService } from "../../../services/filesService";
import { eventService } from "../../../services/eventService";

export function EventCreationPage() {
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [fechaFin, setFechaFin] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Manejo de imagen
  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Envío del formulario
  const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);

  try {
    let imageUrl = "";

    
    if (imagen) {
      const imgForm = new FormData();
      imgForm.append("file", imagen, imagen.name); 
      const imgResp = await fileService.UploadFile(imgForm);

      imageUrl =
        imgResp?.data?.url ||
        imgResp?.data?.path ||
        imgResp?.data?.Location ||
        "";
    }

    
    const payload = {
      title: titulo,
      description: descripcion || "",
      end_date: fechaFin || "", 
      image: imageUrl || "",    
    };

    await eventService.createEvent(payload);
    alert("Evento creado correctamente");
    navigate("/admin/events");
  } catch (err) {
    console.error(
      "Error al crear el evento:",
      err?.response?.status,
      err?.response?.data || err
    );
    alert("Ocurrió un error al crear el evento");
  } finally {
    setLoading(false);
  }
};



  return (
    <div className="event-creation-page">
      <Container maxWidth="md" className="crear-container">
        <Button
          variant="contained"
          color="primary"
          className="volver-btn"
          onClick={() => navigate(-1)}
        >
          ← Volver
        </Button>

        <Typography variant="h4" className="titulo-pagina">
          Crear Nuevo Evento / Curso
        </Typography>

        <form onSubmit={handleSubmit}>
          <Paper className="preview-card">
            <Box className="preview-contenido">
              <TextField
                variant="outlined"
                placeholder="Título del evento"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth
                className="campo-titulo"
              />

              <TextField
                variant="outlined"
                placeholder="Descripción del evento..."
                value={descripcion}
                onChange={(e) => setDescripcion(e.target.value)}
                fullWidth
                multiline
                rows={6}
                className="campo-contenido"
              />

              <TextField
                label="Fecha de finalización"
                type="date"
                fullWidth
                InputLabelProps={{ shrink: true }}
                value={fechaFin}
                onChange={(e) => setFechaFin(e.target.value)}
                className="campo-fecha"
                sx={{ mt: 2 }}
              />
            </Box>

            {/* Imagen */}
            <Box className="preview-imagen">
              {preview ? (
                <img src={preview} alt="Vista previa" />
              ) : (
                <div className="preview-placeholder">
                  <Typography variant="body2" color="text.secondary">
                    Vista previa de la imagen
                  </Typography>
                </div>
              )}
              <Button
                variant="outlined"
                component="label"
                className="btn-subir"
              >
                Subir Imagen
                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImagen}
                />
              </Button>
            </Box>
          </Paper>

          <Box textAlign="center" mt={3}>
            <Button
              className="create-new-button"
              disabled={loading}
              type="submit"
              variant="contained"
              color="primary"
              size="large"
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Crear Evento"
              )}
            </Button>
          </Box>
        </form>
      </Container>
    </div>
  );
}
