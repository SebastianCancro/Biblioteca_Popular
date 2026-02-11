<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Article;

use DateTime;
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Article\Article;

final readonly class ArticleRepository extends PDOManager implements ArticleRepositoryInterface {

    public function find(int $id): ?Article 
    {
        $query = <<<HEREDOC
            SELECT *
            FROM articles A
            WHERE A.id = :id AND A.deleted = 0
        HEREDOC;
                    
        $parameters = [
            ':id' => $id
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToArticle($result[0] ?? null);
    }

       public function search(int $limit, int $offset): array
    {
        $query = <<<HEREDOC
            SELECT *
            FROM articles A
            WHERE A.deleted = 0
            ORDER BY date DESC
            LIMIT :limit OFFSET :offset
        HEREDOC;

        $bindValues = [
            ':limit'  => ['value' => $limit, 'type' => \PDO::PARAM_INT],
            ':offset' => ['value' => $offset, 'type' => \PDO::PARAM_INT]
        ];

        $results = $this->executeWithBind($query, $bindValues);

        if (!is_array($results)) {
            return [];
        }

        $articleResults = [];
        foreach ($results as $result) {
            $articleResults[] = $this->primitiveToArticle($result);
        }

        return $articleResults;
    }

    public function countArticles(): int
    {
        $query = <<<HEREDOC
            SELECT COUNT(*) as total
            FROM articles A
            WHERE A.deleted = 0
        HEREDOC;

        $results = $this->execute($query);

        return isset($results[0]['total']) ? (int) $results[0]['total'] : 0;
    }

    public function insert(Article $article): void
    {
        $query = "INSERT INTO articles (title, image, date, body) 
                  VALUES (:title, :image, :date, :body)";

        $parameters = [
            ':title' => $article->title(),
            ':image' => $article->image(),
            ':date'  => $article->date()->format('Y-m-d H:i:s'),
            ':body'  => $article->body()
        ];

        $this->execute($query, $parameters);
    }

    public function update(Article $article): void
    {
        $query = <<<UPDATE_QUERY
            UPDATE articles
            SET
                title   = :title,
                image   = :image,
                date    = :date,
                body    = :body,
                deleted = :deleted
            WHERE id = :id
        UPDATE_QUERY;

        $parameters = [
            ':title'   => $article->title(),
            ':image'   => $article->image(),
            ':body'    => $article->body(),
            ':date'    => $article->date()->format('Y-m-d H:i:s'),
            ':id'      => $article->id(),
            ':deleted' => $article->isDeleted() ? 1 : 0
        ];

        $this->execute($query, $parameters);
    }

    private function primitiveToArticle(?array $primitive): ?Article
    {
        if ($primitive === null) {
            return null;
        }

        return new Article(
            $primitive["id"],
            $primitive["title"],
            $primitive["image"],
            new DateTime($primitive["date"]),
            $primitive["body"],
            (bool) $primitive["deleted"],
        );
    }
}