<?php

declare(strict_types=1);

namespace Src\Service\Book;

use Src\Entity\Book\Book;
use Src\Entity\Book\Exception\BookNotFoundException;
use Src\Infrastructure\Repository\Book\BookRepository;

final readonly class BookFinderService
{
    private BookRepository $repository;

    public function __construct()
    {
        $this->repository = new BookRepository();
    }

    /** @throws BookNotFoundException */
    public function find(int $id): Book
    {
        $book = $this->repository->find($id);

        if ($book === null) {
            throw new BookNotFoundException($id);
        }

        return $book;
    }
}
