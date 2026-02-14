import "./HomePage.css";
import { useEffect, useState } from "react";
import { articleService } from "../../services/articleService";
import Banner from "../../components/Banner/Banner";
import { FeaturedArticle } from "../../components/FeaturedArticle/FeaturedArticle";
import { RecommendedArticle } from "../../components/RecommendedArticle/RecommendedArticle";
import { useNavigate } from "react-router";
import Author from "../../components/Author/Author";

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
      <div className="page-wrapper">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Cargando...</p>
        </div>
      </div>
    );
  }

  const mainArticle = articles[0];
  const recommended = articles.slice(1);

  return (
    <div className="page-wrapper">
      <Banner />

      <section className="bio-homenaje">
        <div className="bio-wrapper">
          <Author />
        </div>

        <div className="homenaje-bloque">
          <div className="homenaje-cuadro with-bg">
            <img
              src="/Images/Homenaje.jpg"
              alt="HomenajeBiblioteca"
              className="homenaje-bg"
            />
            <div className="homenaje-overlay">
              <h2>130 años de historias que nos unen</h2>
              <span className="fundacion">Desde 1895</span>
              <span className="firma">
                Biblioteca Popular Dr. Antonio Novaro
              </span>
            </div>
          </div>

          <div className="noticias-bajo-homenaje">
            <h2 className="section-title">Últimas noticias</h2>
            <div className="news-grid">
              <div
                className="main-news"
                onClick={() => navigate(`/articles/${mainArticle.id}`)}
                style={{ cursor: "pointer" }}
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
            <div className="see-all-news">
              <span
                onClick={() => navigate("/noticias")}
                style={{ cursor: "pointer" }}
              >
                Ver todas
              </span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


/*import "./HomePage.css";
import { useEffect, useState } from "react";
import { articleService } from "../../services/articleService";
import Banner from "../../components/Banner/Banner";
import { FeaturedArticle } from "../../components/FeaturedArticle/FeaturedArticle";
import { RecommendedArticle } from "../../components/RecommendedArticle/RecommendedArticle";
import { useNavigate } from "react-router";
import  Author  from "../../components/Author/Author";


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
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Cargando...</p>
      </div>
    );
  }
  const mainArticle = articles[0];
  const recommended = articles.slice(1);
  
  return (
     <>
      <Banner />

      <section className="bio-homenaje">
        <div className="bio-wrapper">
          <Author />
        </div>

        <div className="homenaje-bloque">
          <div className="homenaje-cuadro with-bg">
            <img src="/Images/Homenaje.jpg" alt="HomenajeBiblioteca" className="homenaje-bg" />
            <div className="homenaje-overlay">
              <h2>130 años de historias que nos unen</h2>
              <span className="fundacion">Desde 1895</span>
              <span className="firma">Biblioteca Popular Dr. Antonio Novaro</span>
            </div>
          </div>

          <div className="noticias-bajo-homenaje">
            <h2 className="section-title">Últimas noticias</h2>
            <div className="news-grid">
              <div className="main-news"
                onClick={() => navigate(`/articles/${mainArticle.id}`)}
                style={{ cursor: "pointer" }}
                >
                <FeaturedArticle
                  article={{ ...mainArticle, publishedAt: formatDate(mainArticle.date) }}
                />
              </div>
              <div className="recommended-news">
                {recommended.map((article) => (
                  <RecommendedArticle
                    key={article.id}
                    article={{ ...article, publishedAt: formatDate(article.date) }}
                    onClick={() => navigate(`/articles/${article.id}`)}
                  />
                ))}
              </div>
            </div>
            <div className="see-all-news">
              <button className="featured-button" onClick={() => navigate("/noticias")}>
                Ver todas las noticias
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
*/
   

