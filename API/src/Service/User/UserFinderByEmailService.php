<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\User;
use Src\Entity\User\Exception\UserNotFoundException;

final readonly class UserFinderByEmailService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }
    // Busca un usuario por su email y lo devuelve. //
    public function find(string $email): User
    {
        $user = $this->repository->findByEmail($email);
        if (!$user) {
            throw new UserNotFoundException($email);
        }
        return $user;
    }
}
