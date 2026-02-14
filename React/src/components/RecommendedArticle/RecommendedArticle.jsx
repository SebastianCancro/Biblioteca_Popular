import "./RecommendedArticle.css";

export function RecommendedArticle({ article, onClick }) {
  return (
    <div className="recommended-item" onClick={onClick}>
      <img
        src={article.image}
        alt={article.title}
        className="recommended-thumb"
      />
      <div className="recommended-info">
        <p className="recommended-title">{article.title}</p>
        <p className="recommended-date">{article.publishedAt}</p>
      </div>
    </div>
  );
}
