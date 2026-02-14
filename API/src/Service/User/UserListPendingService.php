<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;

final class UserListPendingService
{
    public function __construct(
        private readonly UserRepository $repository = new UserRepository()
    ) {}
    // Devuelve todos los usuarios pendientes de aprobacion. //
    public function __invoke(): array
    {
        return $this->repository->findAllPending();
    }
}
