import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, IconButton } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import "./ArticlePageDetail.css";

export const ArticlePageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await fetch(`http://localhost:9091/articles/${id}`);
        const data = await response.json();
        setArticle(data);
      } catch (error) {
        console.error("Error fetching article:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchArticle();
  }, [id]);

  if (loading) {
    return (
      <Box className="article-loading">
        <Typography variant="h6">Cargando...</Typography>
      </Box>
    );
  }

  if (!article) {
    return (
      <Box className="article-loading">
        <Typography variant="h6">Noticia no encontrada</Typography>
      </Box>
    );
  }

  const currentUrl = window.location.href;

  return (
    <Box className="article-detail-container">
      {/* Texto principal */}
      <Box className="article-detail-text">
        <Typography className="article-detail-date">
          📅 {article.date}
        </Typography>

        <Typography variant="h3" className="article-detail-title">
          {article.title}
        </Typography>

        <Typography variant="body1" className="article-detail-body">
          {article.body}
        </Typography>
      </Box>

      {/* Imagen + botón + compartir */}
      <Box className="article-detail-side">
        {article.image && (
          <Box
            component="img"
            src={article.image}
            alt={article.title}
            className="article-detail-image"
          />
        )}

        <Button
          variant="contained"
          onClick={() => navigate("/noticias")}
          className="back-button"
        >
          ← Volver a noticias
        </Button>

        <Box className="share-section">
          <Typography className="share-label">Compartí en Redes:</Typography>
          <Box className="share-icons">
            <IconButton
              component="a"
              href={`https://www.facebook.com/sharer/sharer.php?u=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon facebook"
            >
              <FacebookIcon />
            </IconButton>
            <IconButton
              component="a"
              href={`https://twitter.com/intent/tweet?url=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon twitter"
            >
              <TwitterIcon />
            </IconButton>
            <IconButton
              component="a"
              href={`https://api.whatsapp.com/send?text=${currentUrl}`}
              target="_blank"
              rel="noopener noreferrer"
              className="share-icon whatsapp"
            >
              <WhatsAppIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
