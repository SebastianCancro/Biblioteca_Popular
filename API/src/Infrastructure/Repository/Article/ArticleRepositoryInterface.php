<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Article;

use Src\Entity\Article\Article;

interface ArticleRepositoryInterface {
    public function find(int $id): ?Article;

    /** 
     * Buscar artículos con paginación
     * 
     * @param int $limit  Cantidad de artículos a devolver
     * @param int $offset Desplazamiento para la paginación
     * @return Article[]
     */
    public function search(int $limit, int $offset): array;

    public function countArticles(): int;

    public function insert(Article $article): void;

    public function update(Article $article): void;
}
