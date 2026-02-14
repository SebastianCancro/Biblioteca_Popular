<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Entity\User\Exception\UserIsNotAuthorizedException;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserTokenValidatorService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }
    // Valida el token de un usuario y devuelve el usuario asociado si es valido. //
    public function validate(string $token): User
    {
        $user = $this->repository->findByToken($token);
        // Verificar si el usuario existe y su estado //
        if ($user === null || !$user->is_active() || $user->is_blocked()) {
            throw new UserIsNotAuthorizedException();
        }

        return $user;
    }
}
