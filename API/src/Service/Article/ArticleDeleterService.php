<?php 

namespace Src\Service\Article;

use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleDeleterService {
    private ArticleRepository $repository;
    private ArticleFinderService $finder;

    public function __construct() {
        $this->repository = new ArticleRepository();
        $this->finder = new ArticleFinderService();
    }

    public function delete(int $id): void
    {
        $article = $this->finder->find($id);

        $article->delete();

        $this->repository->update($article);
    }
}