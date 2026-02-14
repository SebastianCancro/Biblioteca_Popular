<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;

final class UserListBlockedService
{
    public function __construct(
        private readonly UserRepository $repository = new UserRepository()
    ) {}
    // Devuelve todos los usuarios bloqueados. //
    public function __invoke(): array
    {
        return $this->repository->findAllBlocked();
    }
}
