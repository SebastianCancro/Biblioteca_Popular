import "./HomePage.css";
import { useEffect, useState } from "react";
import { articleService } from "../../services/articleService";
import { FeaturedArticle } from "../../components/FeaturedArticle/FeaturedArticle";
import { RecommendedArticle } from "../../components/RecommendedArticle/RecommendedArticle";
import { useNavigate } from "react-router";
import Author from "../../components/Author/Author";
import Banner from "../../components/Banner/Banner";

function formatDate(dateString) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date)) return "";
  return new Intl.DateTimeFormat("es-AR", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  }).format(date);
}

export function HomePage() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  async function getData() {
    try {
      const articlesData = await articleService.getAllArticles(1, 4);
      const data = Array.isArray(articlesData)
        ? articlesData
        : articlesData.data || [];
      setArticles(data);
    } catch (error) {
      console.error("Error al traer artículos:", error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getData();
  }, []);

  if (loading) {
    return (
      <div className="homepage-loading">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }

  if (!articles.length) {
    return (
      <div className="homepage-loading">
        <p>No hay artículos disponibles.</p>
      </div>
    );
  }

  const mainArticle = articles[0];
  const recommended = articles.slice(1);

  return (
    <div className="homepage-container">
      <Banner />

      <div className="homepage-content">
        <div className="homepage-author">
          <Author />
        </div>

        <div className="homepage-news">
          <h2 className="news-title">Últimas noticias</h2>

          <div className="news-grid">
            <div
              className="main-news"
              onClick={() => navigate(`/articles/${mainArticle.id}`)}
            >
              <FeaturedArticle
                article={{
                  ...mainArticle,
                  publishedAt: formatDate(mainArticle.date),
                }}
              />
            </div>

            <div className="recommended-news">
              {recommended.map((article) => (
                <RecommendedArticle
                  key={article.id}
                  article={{
                    ...article,
                    publishedAt: formatDate(article.date),
                  }}
                  onClick={() => navigate(`/articles/${article.id}`)}
                />
              ))}
            </div>
          </div>

          <div
            className="see-all-news"
            onClick={() => navigate("/noticias")}
          >
            Ver todas las noticias
          </div>
        </div>
      </div>
    </div>
  );
}