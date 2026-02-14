<?php

declare(strict_types=1);

namespace Src\Infrastructure\Repository\Book;

use Src\Entity\Book\Book;

interface BookRepositoryInterface
{
    public function find(int $id): ?Book;

    /** @return Book[] */
    public function search(
        ?string $codigo = null,
        ?string $titulo = null,
        ?string $autor = null,
        ?string $materia = null,
        ?string $editorial = null,
        ?int $anio = null,
        ?bool $disponibilidad = null,
        ?bool $reservada = null
    ): array;
    public function beginTransaction(): void;

    public function commit(): void;
    
    public function rollback(): void;

    public function insertBooks(array $books): int;

    public function clearAllBooks(): void;
}
