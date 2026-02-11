<?php 

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleCreatorService {
    private ArticleRepository $repository;

    public function __construct() {
        $this->repository = new ArticleRepository();
    }

    public function create(string $title, string $image, string $body): void
    {
        $article = Article::create($title, $image, $body);
        $this->repository->insert($article);
    }
}