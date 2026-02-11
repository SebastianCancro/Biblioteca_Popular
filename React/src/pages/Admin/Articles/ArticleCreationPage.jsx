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
import "./ArticleCreationPage.css";
import { useNavigate } from "react-router";
import { fileService } from "../../../services/filesService";
import { articleService } from "../../../services/articleService";
import { set } from "zod";

export function ArticleCreationPage() {
  const [titulo, setTitulo] = useState("");
  const [contenido, setContenido] = useState("");
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

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
    setLoading(true);

    try {
      const imgFormData = new FormData();
      imgFormData.append("file", imagen);
      const imgResponse = await fileService.UploadFile(imgFormData);

      const formData = new FormData();
      formData.append("title", titulo);
      formData.append("body", contenido);
      formData.append("image", imgResponse.data.url);

      await articleService.createArticle(formData);
      
      setLoading(false);
      navigate("/admin/articles");
    } catch (error) {
      console.error("Error al crear el artículo:", error);
      alert("Ocurrió un error al crear la noticia");
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
                  className="campo-contenido"
                />
              </Box>

              {/* Imagen abajo */}
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
                className="create-button"
                disabled={loading}
                type="submit"
                variant="contained"
                color="primary"
                size="large"
              >
                {loading ? <CircularProgress size={24} color="inherit" /> : "Crear Noticia"}
              </Button>
            </Box>
          </form>
        </Container>
    </div>
  );
}
