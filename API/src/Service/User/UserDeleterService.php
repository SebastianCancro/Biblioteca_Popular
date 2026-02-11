<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserDeleterService
{
    private UserRepository $repository;
    private UserFinderService $finder;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder = new UserFinderService();
    }

    public function delete(int $id): void
    {
        $this->finder->find($id); // lanza excepción si no existe //
        $this->repository->delete($id);
    }
}
