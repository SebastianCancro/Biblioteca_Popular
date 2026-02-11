<?php 


declare(strict_types = 1);

namespace Src\Service\Article;

use Src\Entity\Article\Article;
use Src\Entity\Article\Exception\ArticleNotFoundException;
use Src\Infrastructure\Repository\Article\ArticleRepository;

final readonly class ArticleFinderService {

    private ArticleRepository $articleRepository;

    public function __construct() 
    {
        $this->articleRepository = new ArticleRepository();
    }

    public function find(int $id): Article 
    {
        $article = $this->articleRepository->find($id);

        if ($article === null) {
            throw new ArticleNotFoundException($id);
        }

        return $article;
    }

}
