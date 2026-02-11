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
} from "@mui/material";
import { Edit, Delete } from "@mui/icons-material";
import { useNavigate } from "react-router";
import { articleService } from "../../../services/articleService";
import { fileService } from "../../../services/filesService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import "./ArticleManagerPage.css";
import { red } from "@mui/material/colors";

// Validación Zod (sin imagen porque es archivo)
const articleSchema = z.object({
  title: z.string().min(1, "El título es obligatorio"),
  body: z.string().min(1, "El contenido es obligatorio"),
});

export function ArticleManagerPage() {
  const navigate = useNavigate();
  const [noticias, setNoticias] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openModal, setOpenModal] = useState(false);
  const [currentArticle, setCurrentArticle] = useState(null);
  const [imagenFile, setImagenFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [modalLoading, setModalLoading] = useState(false);
  const [deletingID, setDeletingID] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(articleSchema),
    defaultValues: {
      title: "",
      body: "",
    },
  });

  // Obtener artículos
  useEffect(() => {
    articleService
      .getAllArticles()
      .then((response) => {
        setNoticias(response.data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Abrir modal con datos cargados
  const handleEditar = (id) => {
    const articulo = noticias.find((n) => n.id === id);
    setCurrentArticle(articulo);
    reset({
      title: articulo.title || "",
      body: articulo.body || "",
    });
    setPreview(articulo.image || null);
    setImagenFile(null);
    setOpenModal(true);
  };

  // Cerrar modal
  const handleCloseModal = () => {
    setOpenModal(false);
    setCurrentArticle(null);
    reset();
    setPreview(null);
    setImagenFile(null);
  };

  // Guardar cambios
  const handleSaveChanges = async (data) => {
    setModalLoading(true);
    try {
      let imageUrl = currentArticle.image;

      if (imagenFile) {
        const formData = new FormData();
        formData.append("file", imagenFile);
        const uploadResponse = await fileService.UploadFile(formData);
        imageUrl = uploadResponse.data.url;
      }

      const payload = {
        title: data.title,
        body: data.body,
        image: imageUrl,
      };
      await articleService.updateArticle(currentArticle.id, payload);

      setNoticias(noticias.map((n) =>
        n.id === currentArticle.id ? { ...n, ...payload } : n
      ));

      handleCloseModal();
    } catch (err) {
      alert("Error al guardar los cambios");
      console.error(err);
    }
    setModalLoading(false);
  };

  // Eliminar artículo
  const handleEliminar = async (id) => {
    if (window.confirm("¿Seguro que deseas eliminar esta noticia?")) {
        setDeletingID(id);
        await articleService
            .deleteArticleById(id)
            .then(() => {
            setNoticias(noticias.filter((n) => n.id !== id));
            })
            .catch((err) => {
            alert("Error al eliminar la noticia");
            console.error(err);
        });
    }
  };

  const handleCrear = () => {
    navigate("/admin/article-new");
  };

  return (
    <div className="article-manager-page">
      <Container className="container">
        <div className="header">
          <Typography variant="h4">Administración de Noticias</Typography>
          <Button
            className="create-button"
            onClick={handleCrear}
            variant="contained"
          >
            <span className="texto">Nueva Noticia</span>
          </Button>
        </div>

        {loading ? (
          <div className="loading">
            <CircularProgress />
          </div>
        ) : (
          <TableContainer component={Paper} className="table-container">
            <Table>
              <TableHead className="table-header">
                <TableRow>
                  <TableCell><b>ID</b></TableCell>
                  <TableCell><b>Título</b></TableCell>
                  <TableCell><b>Fecha</b></TableCell>
                  <TableCell align="right"><b>Acciones</b></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {noticias.map((noticia) => (
                  <TableRow className="table-row" key={noticia.id}>
                    <TableCell>{noticia.id}</TableCell>
                    <TableCell>{noticia.title}</TableCell>
                    <TableCell>{noticia.date}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        className="edit-button"
                        onClick={() => handleEditar(noticia.id)}
                      >
                        <Edit />
                      </IconButton>
                      <IconButton
                        loading={deletingID === noticia.id ? true : false}
                        color="error"
                        onClick={() => handleEliminar(noticia.id)}
                      >
                        <Delete />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {/* Modal de edición */}
        <Dialog open={openModal} onClose={handleCloseModal} className="edit-aricle-dialog" fullWidth maxWidth="sm">
          <DialogTitle>Editar Noticia</DialogTitle>
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
                id="edit-body"
                label="Contenido"
                variant="outlined"
                fullWidth
                {...register("body")}
                margin="normal"
                multiline
                rows={8}
                error={!!errors.body}
                helperText={errors.body?.message}
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
                      const file = e.target.files[0];
                      if (file) {
                        setImagenFile(file);
                        setPreview(URL.createObjectURL(file));
                      }
                    }}
                  />
                </Button>
              </Box>

              <DialogActions sx={{ mt: 2 }}>
                <Button onClick={handleCloseModal} color="secondary">
                  Cancelar
                </Button>
                <Button disabled={modalLoading} type="submit" color="primary">
                       {modalLoading ? <CircularProgress size={24} color="inherit" /> : "Editar Noticia"}
                </Button>
              </DialogActions>
            </form>
          </DialogContent>
        </Dialog>
      </Container>
    </div>
  );
}
