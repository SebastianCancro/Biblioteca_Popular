<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserFinderByEmailService
{
    private UserRepository $repository;

    public function __construct()
    {
        $this->repository = new UserRepository();
    }

    public function find(string $email): ?User
    {
        return $this->repository->findByEmail($email);
    }
}
