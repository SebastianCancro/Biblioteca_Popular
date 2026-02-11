<?php 

declare(strict_types=1);

namespace Src\Infrastructure\Repository\User;

use Src\Entity\User\User;

interface UserRepositoryInterface {
    public function find(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function findByEmailAndPassword(string $email, string $password): ?User;
    public function findByToken(string $token): ?User;

    public function insert(User $user): void;
    public function update(User $user): void;
    public function updateToken(User $user): void;

    public function delete(int $id): void;

    public function findAllActive(): array;
    public function findAllPending(): array;
    public function activateUser(int $userId): void;

    public function authorizeAdmin(int $userId): void; 
}
