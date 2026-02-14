<?php

namespace Src\Service\Book;

use Src\Infrastructure\Repository\Book\BookRepository;
use Throwable;

final readonly class BooksUpdaterService
{
    private BookRepository $repository;

    public function __construct()
    {
        $this->repository = new BookRepository();
    }

    /**
     * Actualiza o inserta libros según el estado de la base de datos.
     * Clave principal: campo "codigo".
     */
    public function updateBooks(array $updatedBooks): array
    {
        if (!$this->validateBooks($updatedBooks)) {
            return [
                'status' => 'error',
                'message' => 'Formato de libros inválido o faltan campos obligatorios (código, título, autor)',
            ];
        }

        try {
            $this->repository->beginTransaction();

            $existingBooks = $this->repository->searchAsArray();

            $toInsert = [];
            $toUpdate = [];
            $ignoredCount = 0;
            $insertedCount = 0;
            $updatedCount = 0;

            foreach ($updatedBooks as $updatedBook) {
                $match = $this->findBookByCodigo($existingBooks, $updatedBook['codigo']);

                if ($match === null) {
                    // Si no existe insertar
                    $toInsert[] = $updatedBook;
                } elseif ($this->hasDifferences($match, $updatedBook)) {
                    // Si existe con diferencias actualizar
                    $toUpdate[] = [
                        'old' => $match,
                        'new' => $updatedBook,
                    ];
                } else {
                    // Si es idéntico ignorar
                    $ignoredCount++;
                }
            }

            if (!empty($toInsert)) {
                $insertedCount = $this->repository->insertBooks($toInsert);
            }

            if (!empty($toUpdate)) {
                foreach ($toUpdate as $pair) {
                    $this->repository->updateBook($pair['old'], $pair['new']);
                    $updatedCount++;
                }
            }

            $this->repository->commit();

            return [
                'status' => 'ok',
                'message' => 'Libros procesados correctamente',
                'insertados' => $insertedCount,
                'actualizados' => $updatedCount,
                'ignorados' => $ignoredCount,
            ];
        } catch (Throwable $e) {
            $this->repository->rollback();
            return [
                'status' => 'error',
                'message' => 'Error al actualizar libros: ' . $e->getMessage(),
            ];
        }
    }

    private function validateBooks(array $books): bool
    {
        foreach ($books as $book) {
            if (empty($book['codigo']) || empty($book['titulo']) || empty($book['autor'])) {
                return false;
            }
        }
        return true;
    }

    private function findBookByCodigo(array $existingBooks, string $codigo): ?array
    {
        foreach ($existingBooks as $existing) {
            if ($existing['codigo'] === $codigo) {
                return $existing;
            }
        }
        return null;
    }

    private function hasDifferences(array $existing, array $updated): bool
    {
        foreach ($updated as $key => $value) {
            if (!array_key_exists($key, $existing)) {
                continue;
            }

            $oldValue = is_bool($existing[$key]) ? (int)$existing[$key] : $existing[$key];
            $newValue = is_bool($value) ? (int)$value : $value;

            if ($oldValue != $newValue) {
                return true;
            }
        }
        return false;
    }
}
