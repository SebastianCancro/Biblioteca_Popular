import { useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Container,
  Paper,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import "./ArticleCreationPage.css";
import { useNavigate } from "react-router";
import { fileService } from "../../../services/filesService";
import { articleService } from "../../../services/articleService";
import { z } from "zod";

const articleSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  body: z.string().min(1, "El contenido es obligatorio"),
  image: z.any().optional(),
});

export function ArticleCreationPage() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  const navigate = useNavigate();

  const handleImagen = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagen(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const result = articleSchema.safeParse({
      title: titulo,
      body: contenido,
      image: imagen,
    });

    if (!result.success) {
      const fieldErrors = result.error.flatten().fieldErrors;
      setErrors(fieldErrors);
      setSnackbar({
        open: true,
        message: "Por favor completa los campos obligatorios.",
        severity: "warning",
      });
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      let imageUrl = "";

      if (imagen) {
        const imgFormData = new FormData();
        imgFormData.append("file", imagen);
        const imgResponse = await fileService.UploadFile(imgFormData);
        imageUrl = imgResponse.data.url;
      }

      const formData = new FormData();
      formData.append("title", titulo);
      formData.append("body", contenido);
      formData.append("image", imageUrl);

      await articleService.createArticle(formData);

      setSnackbar({
        open: true,
        message: "Noticia creada correctamente 🎉",
        severity: "success",
      });

      setTimeout(() => navigate("/admin/articles"), 1500);
    } catch (error) {
      console.error("Error al crear el artículo:", error);
      setSnackbar({
        open: true,
        message: "Ocurrió un error al crear la noticia 😞",
        severity: "error",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="article-creation-page">
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
          Crear Nueva Noticia
        </Typography>

        <form onSubmit={handleSubmit}>
          <Paper className="preview-card">
            <Box className="preview-contenido">
              <TextField
                variant="outlined"
                placeholder="Título de la noticia"
                value={titulo}
                onChange={(e) => setTitulo(e.target.value)}
                fullWidth
                error={!!errors.title}
                helperText={errors.title?.[0]}
                className="campo-titulo"
              />

              <TextField
                variant="outlined"
                placeholder="Contenido de la noticia..."
                value={contenido}
                onChange={(e) => setContenido(e.target.value)}
                fullWidth
                multiline
                rows={6}
                error={!!errors.body}
                helperText={errors.body?.[0]}
                className="campo-contenido"
              />
            </Box>

            <Box className="preview-imagen">
              {preview ? (
                <img src={preview} alt="Sin imagen" />
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
                "Crear Noticia"
              )}
            </Button>
          </Box>
        </form>

        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => setSnackbar({ ...snackbar, open: false })}
            severity={snackbar.severity}
            variant="filled"
            sx={{ width: "100%" }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </div>
  );
}
