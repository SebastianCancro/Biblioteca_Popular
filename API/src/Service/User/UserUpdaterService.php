<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserUpdaterService
{
    private UserRepository $repository;
    private UserFinderService $finder;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder = new UserFinderService();
    }

    public function update(
        int $id,
        string $name,
        string $email,
        ?string $password = null,
        string $role = 'visitor',
        bool $is_active = true
    ): void {
        $user = $this->finder->find($id);
        $user->modify($name, $email, $password, $role, $is_active);
        $this->repository->update($user);
    }
}
