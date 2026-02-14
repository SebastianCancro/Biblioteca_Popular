import "./FeaturedArticle.css";

export function FeaturedArticle({ article }) {
  return (
    <div className="featured-article">
      <div className="featured-image-wrapper">
        <img
          src={article.image}
          alt={article.title}
          className="featured-image"
        />
        <div className="featured-overlay" />
      </div>

      <div className="featured-content">
        <h3 className="featured-title">{article.title}</h3>
        <p className="featured-date">{article.publishedAt}</p>
      </div>
    </div>
  );
}
