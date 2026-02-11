<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\User;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserManagementService
{
    private UserRepository $repository;
    private UserFinderService $finder;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder = new UserFinderService();
    }
    // Devuelve todos los usuarios activos //
    public function getActiveUsers(): array
    {
        return $this->repository->findAllActive();
    }
    // Devuelve todas las solicitudes pendientes //
    public function getPendingUsers(): array
    {
        return $this->repository->findAllPending();
    }
    // Acepta un usuario pendiente (solo super_adm) //
    public function acceptUser(int $superAdmId, int $userId): void
    {
        $superAdm = $this->finder->find($superAdmId);
        if ($superAdm->role() !== 'super_adm') {
            throw new \Exception("No autorizado: solo super_adm puede aceptar usuarios.");
        }
        $user = $this->finder->find($userId);
        if ($user === null) {
            throw new UserNotFoundException($userId);
        }
        //Pasan a admin directamente //
        $this->repository->authorizeAdmin($userId);
    }

    // Elimina un usuario (solo super_adm) //
    public function deleteUser(int $superAdmId, int $userId): void
    {
        $superAdm = $this->finder->find($superAdmId);
        if ($superAdm->role() !== 'super_adm') {
            throw new \Exception("No autorizado: solo super_adm puede eliminar usuarios.");
        }
        $this->finder->find($userId);
        $this->repository->delete($userId);
    }

    // Modifica un usuario (solo super_adm) //
    public function updateUser(int $superAdmId, User $user): void
    {
        $superAdm = $this->finder->find($superAdmId);
        if ($superAdm->role() !== 'super_adm') {
            throw new \Exception("No autorizado: solo super_adm puede modificar usuarios.");
        }
        $this->finder->find($user->id());
        $this->repository->update($user);
    }
}
