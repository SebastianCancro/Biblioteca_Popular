<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserFinderService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    //Buscar por id //
    public function find(int $id): User
    {
        $user = $this->repository->find($id);

        if ($user === null) {
            throw new UserNotFoundException($id);
        }

        return $user;
    }

    //Buscar por email //
    public function findByEmail(string $email): ?User
    {
        return $this->repository->findByEmail($email);
    }
}
