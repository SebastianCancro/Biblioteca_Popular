<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserTokenGeneratorService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }
    // Genera un nuevo token para el usuario y lo actualiza en el repositorio. //
    public function generate(User $user): User
    {
        $user->generateToken();
        $this->repository->update($user);
        return $user;
    }
}

