<?php

declare(strict_types=1);

namespace Src\Infrastructure\Repository\Book;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Book\Book;
use Src\Entity\Book\Exception\BookNotFoundException;

final readonly class BookRepository extends PDOManager implements BookRepositoryInterface
{
    public function find(int $id): ?Book
    {
        $query = "SELECT * FROM books WHERE id = :id";
        $parameters = ["id" => $id];

        $result = $this->execute($query, $parameters);

        if (empty($result)) {
            throw new BookNotFoundException($id);
        }

        return $this->primitiveToBook($result[0]);
    }

    public function search(
        ?string $codigo = null,
        ?string $titulo = null,
        ?string $autor = null,
        ?string $materia = null,
        ?string $editorial = null,
        ?int $anio = null,
        ?bool $disponibilidad = null,
        ?bool $reservada = null
    ): array {
        $query = "SELECT * FROM books WHERE 1=1";
        $params = [];

        if ($codigo !== null && $codigo !== '') {
            $query .= " AND codigo LIKE :codigo";
            $params["codigo"] = "%$codigo%";
        }

        if ($titulo !== null && $titulo !== '') {
            $query .= " AND titulo LIKE :titulo";
            $params["titulo"] = "%$titulo%";
        }

        if ($autor !== null && $autor !== '') {
            $query .= " AND autor LIKE :autor";
            $params["autor"] = "%$autor%";
        }

        if ($materia !== null && $materia !== '') {
            $query .= " AND materia LIKE :materia";
            $params["materia"] = "%$materia%";
        }

        if ($editorial !== null && $editorial !== '') {
            $query .= " AND editorial LIKE :editorial";
            $params["editorial"] = "%$editorial%";
        }

        if ($anio !== null) {
            $query .= " AND anio = :anio";
            $params["anio"] = $anio;
        }

        if ($disponibilidad !== null) {
            $query .= " AND disponibilidad = :disponibilidad";
            $params["disponibilidad"] = $disponibilidad ? 1 : 0;
        }

        if ($reservada !== null) {
            $query .= " AND reservada = :reservada";
            $params["reservada"] = $reservada ? 1 : 0;
        }

        $results = $this->execute($query, $params);

        $bookResults = [];
        foreach ($results as $result) {
            $bookResults[] = $this->primitiveToBook($result);
        }

        return $bookResults;
    }
    public function searchAsArray(): array
    {
        $query = "SELECT * FROM books";
        return $this->execute($query, []);
    }

    public function beginTransaction(): void
    {
        $this->getConnection()->beginTransaction();
    }

    public function commit(): void
    {
        $this->getConnection()->commit();
    }

    public function rollback(): void
    {
        $this->getConnection()->rollBack();
    }

    public function insertBooks(array $books): int
    {
        $query = "INSERT INTO books (codigo, materia, titulo, autor, editorial, edicion, anio, disponibilidad, reservada)
                  VALUES (:codigo, :materia, :titulo, :autor, :editorial, :edicion, :anio, :disponibilidad, :reservada)";

        $insertedCount = 0;

        foreach ($books as $book) {
            $parameters = [
                "codigo"        => $book['codigo'] ?? null,
                "materia"       => $book['materia'] ?? null,
                "titulo"        => $book['titulo'] ?? null,
                "autor"         => $book['autor'] ?? null,
                "editorial"     => $book['editorial'] ?? null,
                "edicion"       => $book['edicion'] ?? null,
                "anio"          => $book['anio'] ?? null,
                "disponibilidad"=> isset($book['disponibilidad']) ? (int)$book['disponibilidad'] : 1,
                "reservada"     => isset($book['reservada']) ? (int)$book['reservada'] : 0
            ];

            $this->execute($query, $parameters);
            $insertedCount++;
        }

        return $insertedCount;
    }
    public function updateBook(array $oldBook, array $newBook): bool
    {
        $query = "UPDATE books
                  SET materia = :materia,
                      titulo = :titulo,
                      autor = :autor,
                      editorial = :editorial,
                      edicion = :edicion,
                      anio = :anio,
                      disponibilidad = :disponibilidad,
                      reservada = :reservada
                  WHERE codigo = :codigo";

        $params = [
            "codigo"        => $oldBook['codigo'],
            "materia"       => $newBook['materia'] ?? $oldBook['materia'],
            "titulo"        => $newBook['titulo'] ?? $oldBook['titulo'],
            "autor"         => $newBook['autor'] ?? $oldBook['autor'],
            "editorial"     => $newBook['editorial'] ?? $oldBook['editorial'],
            "edicion"       => $newBook['edicion'] ?? $oldBook['edicion'],
            "anio"          => $newBook['anio'] ?? $oldBook['anio'],
            "disponibilidad"=> isset($newBook['disponibilidad']) ? (int)$newBook['disponibilidad'] : (int)$oldBook['disponibilidad'],
            "reservada"     => isset($newBook['reservada']) ? (int)$newBook['reservada'] : (int)$oldBook['reservada'],
        ];

        $this->execute($query, $params);
        return true;
    }

    public function clearAllBooks(): void
    {
        $query = "DELETE FROM books";
        $this->execute($query, []);
    }

    private function primitiveToBook(?array $primitive): ?Book
    {
        if ($primitive === null) {
            return null;
        }

        return new Book(
            $primitive["id"],
            $primitive["codigo"],
            $primitive["materia"],
            $primitive["titulo"],
            $primitive["autor"],
            $primitive["editorial"],
            $primitive["edicion"],
            (int)$primitive["anio"],
            (bool)$primitive["disponibilidad"],
            (bool)$primitive["reservada"]
        );
    }
}
