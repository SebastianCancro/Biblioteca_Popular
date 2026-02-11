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

    public function validate(string $token): User
    {
        $user = $this->repository->findByToken($token);

        if ($user === null || !$user->is_active()) {
            throw new UserIsNotAuthorizedException();
        }

        return $user;
    }
}
