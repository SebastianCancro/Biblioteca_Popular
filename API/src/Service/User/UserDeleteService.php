<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\Exception\UserNotFoundException;

final readonly class UserDeleteService
{
    private UserRepository $repository;
    private UserFinderService $finder; // busco por ID para validar existencia //

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder     = new UserFinderService();
    }
    //Borra un usuario por ID.//
    public function delete(int $userId): void
    {
        // chequeo si existe//
        $user = $this->finder->find($userId);
        if (!$user) {
            throw new UserNotFoundException($userId);
        }
        $this->repository->delete($userId);
    }

    public function deleteAsSuperAdm(int $superAdmId, int $userId): void
    {
        $this->delete($userId);
    }
}
