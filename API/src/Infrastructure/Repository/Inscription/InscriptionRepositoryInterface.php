<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Inscription;    

use Src\Entity\Inscription\Inscription;

interface InscriptionRepositoryInterface {

    public function insert(Inscription $inscription): void;
    public function search(): array;
    public function delete(int $id): void;
    public function find(int $id): ?Inscription ;
    public function searchByEvent(int $id_event): array;
    public function exists(string $email, int $id_event): bool;
}