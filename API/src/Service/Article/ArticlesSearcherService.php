<?php 

namespace Src\Service\Article;

use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticlesSearcherService {

    private ArticleRepository $repository;

    public function __construct() {
        $this->repository = new ArticleRepository();
    }

    public function search(int $limit, int $offset): array
    {
        return $this->repository->search($limit, $offset);
    }

    public function countArticles(): int
    {
        return $this->repository->countArticles();
    }
}
