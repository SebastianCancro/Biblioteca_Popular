<?php 

namespace Src\Service\Article;

use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleUpdaterService {
    private ArticleRepository $repository;
    private ArticleFinderService $finder;

    public function __construct() {
        $this->repository = new ArticleRepository();
        $this->finder = new ArticleFinderService();
    }

    public function update(int $id, string $title, string $image, string $body): void
    {
        $article = $this->finder->find($id);

        $article->modify($title, $image, $body);

        $this->repository->update($article);
    }
}