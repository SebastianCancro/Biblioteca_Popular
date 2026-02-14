<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\User;
use Src\Entity\User\Exception\UserNotFoundException;

final readonly class UserFinderService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }
    // Busca un usuario por su ID y lo devuelve. //
    public function find(int $id): User
    {
        $user = $this->repository->find($id);
        if (!$user) {
            throw new UserNotFoundException($id);
        }
        return $user;
    }
}
