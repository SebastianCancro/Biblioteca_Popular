<?php
declare(strict_types=1);

namespace Src\Infrastructure\Repository\User;

use Src\Entity\User\User;

interface UserRepositoryInterface
{
    public function find(int $id): ?User;
    public function findByEmail(string $email): ?User;
    public function findByDni(string $dni): ?User;
    public function findByToken(string $token): ?User;
    public function insert(User $user): void;
    public function create(array $fields): User;
    public function update(User $user): void;
    public function updateToken(User $user): void;
    public function delete(int $id): void;
    // listados de usuarios por estado//
    public function findAllActive(): array;
    public function findAllPending(): array;
    public function findAllBlocked(): array;
    // aprobacion / activacion//
    public function authorizeAdmin(int $userId): void;
    public function activateUser(int $userId): void;
    // roles //
    public function updateRole(int $userId, string $role): void;
    // seguridad, bloqueo por intentos fallidos//
    public function resetFailedAttempts(int $userId): void;
    public function blockUser(int $userId): void;
    public function clearSoftBlockIfExpired(int $userId): void;
    public function isSoftBlocked(int $userId): bool;
    public function isHardBlocked(int $userId): bool;
    // intentos fallidos //
    public function getFailedAttempts(int $userId): int;
    public function registerFailedAttemptAtomic(
        int $userId,
        string $ip,
        int $softThreshold,
        int $hardThreshold,
        int $softMinutes
    ): void;
}
