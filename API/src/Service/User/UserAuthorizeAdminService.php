<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Entity\User\Exception\UserInvalidCredentialsException; // 401 si el token es inválido //
//Servicio para aprobar solicitudes: activa al usuario y lo promueve a admin.//
final readonly class UserAuthorizeAdminService
{
    private UserRepository $repository;
    private UserFinderService $finder; // buscar usuarios por ID //

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder     = new UserFinderService();
    }
    //Autorizamos como admin (activa + role=admin ).//
     public function approveAndPromote(int $actorId, int $userId): void
    {
        // Aseguro que el actor existe //
        $actor = $this->finder->find($actorId);
        if (!$actor) {
            throw new UserNotFoundException($actorId);
        }
        // Aseguro que el usuario objetivo existe//
        $user = $this->finder->find($userId);
        if (!$user) {
            throw new UserNotFoundException($userId);
        }
        //Queda activo y promovido a admin //
        $this->repository->authorizeAdmin($userId);
    }
    // Verificamos existencia del usuario objetivo y ejecutamos la promocion.//
      public function approveAndPromoteByApiKey(string $apiKey, int $userId): void
    {
        // Si el token es invalido //
        $actor = $this->repository->findByToken($apiKey);
        if (!$actor) {
            throw new UserInvalidCredentialsException();
        }
       // Aseguro que el usuario objetivo existe //
        $user = $this->finder->find($userId);
        if (!$user) {
            throw new UserNotFoundException($userId);
        }
        // Activacion //
        $this->repository->authorizeAdmin($userId);
    }
}
