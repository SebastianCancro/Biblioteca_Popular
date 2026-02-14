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
import { articleService } from "../../../services/articleService";
import { fileService } from "../../../services/filesService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import "./ArticleManagerPage.css";

// Validación Zod
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
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

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

  // Paginación
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

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

      const payload = { title: data.title, body: data.body, image: imageUrl };
      await articleService.updateArticle(currentArticle.id, payload);

      setNoticias((prev) =>
        prev.map((n) => (n.id === currentArticle.id ? { ...n, ...payload } : n))
      );

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
      try {
        await articleService.deleteArticleById(id);
        setNoticias((prev) => prev.filter((n) => n.id !== id));
      } catch (err) {
        alert("Error al eliminar la noticia");
        console.error(err);
      }
      setDeletingID(null);
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
          <Button className="create-button" onClick={handleCrear} variant="contained">
            <span className="texto">Nueva Noticia</span>
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
                    <TableCell><b>Fecha</b></TableCell>
                    <TableCell align="right"><b>Acciones</b></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {noticias
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((noticia) => (
                      <TableRow className="table-row" key={noticia.id}>
                        <TableCell>{noticia.id}</TableCell>
                        <TableCell className="table-row-title">{noticia.title}</TableCell>
                        <TableCell>{noticia.date}</TableCell>
                        <TableCell align="right">
                          <IconButton
                            className="edit-button"
                            onClick={() => handleEditar(noticia.id)}
                          >
                            <Edit />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => handleEliminar(noticia.id)}
                            disabled={deletingID === noticia.id}
                          >
                            <Delete />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>

            <TablePagination
              component="div"
              count={noticias.length}
              page={page}
              onPageChange={handleChangePage}
              rowsPerPage={rowsPerPage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              labelRowsPerPage="Filas por página:"
              rowsPerPageOptions={[5, 10, 25]}
            />
          </Paper>
        )}
            <Button
      variant="outlined"
      color="primary"
      onClick={() => window.open("/noticias", "_blank")}
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
      Ver Noticias
    </Button>
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