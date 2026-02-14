import { useEffect, useState } from "react";
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Typography,
  Button,
} from "@mui/material";
import { Link } from "react-router-dom";
import { articleService } from "../../services/articleService";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import "./ArticlePage.css";

export const ArticlePage = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pagesCache, setPagesCache] = useState({});
  const limit = 6;

  const fetchArticles = async (currentPage = 1) => {
    setLoading(true);

    if (pagesCache[currentPage]) {
      setArticles(pagesCache[currentPage]);
      setPage(currentPage);
      setLoading(false);
      return;
    }

    try {
      const response = await articleService.getAllArticles(currentPage, limit);
      const articleArray = Array.isArray(response.data) ? response.data : [];

      setPagesCache((prev) => ({
        ...prev,
        [currentPage]: articleArray,
      }));

      setArticles(articleArray);
      setPage(response.page || 1);
      setTotalPages(response.totalPages || 1);
    } catch (error) {
      console.error("Error fetching articles:", error);
      setArticles([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchArticles(page);
  }, [page]);

  const handlePrevious = () => page > 1 && setPage(page - 1);
  const handleNext = () => page < totalPages && setPage(page + 1);

  return (
    <Container
      className="page-wrapper"
      maxWidth={false}
      disableGutters
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "70vh", 
        justifyContent: loading ? "center" : "flex-start", 
      }}
    >
      {loading ? (
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      ) : articles.length === 0 ? (
        <Typography variant="h6" align="center" mt={5}>
          No hay artículos disponibles.
        </Typography>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          <Box className="articles-grid">
            {articles.map((article) => {
              const dateStr = article.date || article.createdAt || null;
              const formattedDate = dateStr
                ? new Date(dateStr).toLocaleDateString("es-AR", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                  })
                : null;

              return (
                <Link
                  to={`/articles/${article.id || article._id}`}
                  className="article-link"
                  key={article._id ?? article.id}
                >
                  <Card className="article-card">
                    {article.image ? (
                      <CardMedia
                        component="img"
                        image={article.image.trim()}
                        alt={article.title}
                        className="article-image"
                      />
                    ) : (
                      <div className="article-image--placeholder">
                        Sin imagen
                      </div>
                    )}

                    <CardContent>
                      <Typography
                        variant="h6"
                        gutterBottom
                        textAlign="center"
                      >
                        {article.title}
                      </Typography>

                      {formattedDate && (
                        <Typography
                          variant="caption"
                          display="block"
                          className="article-date"
                          textAlign="center"
                        >
                          {formattedDate}
                        </Typography>
                      )}

                      {article.summary && (
                        <Typography
                          variant="body2"
                          className="article-summary"
                          mt={1}
                        >
                          {article.summary}
                        </Typography>
                      )}
                    </CardContent>
                  </Card>
                </Link>
              );
            })}
          </Box>

          <Box
            display="flex"
            justifyContent="center"
            mt={3}
            mb={3}
            gap={1}
            flexWrap="wrap"
            className="pagination-container"
          >
            <Button
              onClick={handlePrevious}
              disabled={page === 1}
              sx={{
                minWidth: 40,
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ArrowBackIosIcon sx={{ color: "#620707", fontSize: 20 }} />
            </Button>

            {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
              <Button
                key={p}
                variant={p === page ? "contained" : "outlined"}
                onClick={() => setPage(p)}
                className={`pagination-button ${p === page ? "active" : ""}`}
              >
                {p}
              </Button>
            ))}

            <Button
              onClick={handleNext}
              disabled={page === totalPages}
              sx={{
                minWidth: 40,
                fontWeight: "bold",
                borderRadius: 2,
                "&:hover": { backgroundColor: "#f0f0f0" },
              }}
            >
              <ArrowForwardIosIcon sx={{ color: "#620707", fontSize: 20 }} />
            </Button>
          </Box>
        </Box>
      )}
    </Container>
  );
};
