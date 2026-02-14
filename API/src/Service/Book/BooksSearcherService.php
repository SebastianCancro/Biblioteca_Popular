<?php

namespace Src\Service\Book;

use Src\Infrastructure\Repository\Book\BookRepository;

final readonly class BooksSearcherService
{
    private BookRepository $repository;

    public function __construct() {
        $this->repository = new BookRepository();
    }


    public function search(
        string $titulo = "",
        string $autor = "",
        string $materia = "",
        string $editorial = "",
        ?int $anio = null,          
        ?bool $disponible = null,
        ?bool $reservada = null
    ): array {
        return $this->repository->search(
            $titulo,
            $autor,
            $materia,
            $editorial,
            $anio,                  
            $disponible,
            $reservada
        );
    }
}
