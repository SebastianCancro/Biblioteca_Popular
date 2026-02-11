<?php

declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\Exception\UserNotFoundException;

final readonly class UserAuthorizeAdminService
{
    private UserRepository $repository;
    private UserFinderService $finder;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder = new UserFinderService();
    }

    //Permite a un super_adm promover un usuario a admin//
    public function promoteToAdmin(int $superAdmId, int $userId): void
    {
        //Verifico que el que hace la acción sea super_adm//
        $superAdm = $this->finder->find($superAdmId);
        if ($superAdm->role() !== 'super_adm') {
            throw new \Exception("No autorizado: solo super_adm puede promover usuarios a admin.");
        }

        // Verifico que el usuario exista //
        $user = $this->finder->find($userId);
        if (!$user) {
            throw new UserNotFoundException($userId);
        }

        // Activa usuario pendiente y regenerar token si es necesario //
        if (!$user->is_active()) {
            $this->repository->activateUser($userId);
        }

        // si no tiene token, generamos uno nuevo //
        if (empty($user->token())) {
            $newToken = md5(uniqid((string)$userId, true));
            $tokenDate = (new \DateTime('+24 hours'))->format('Y-m-d H:i:s');

            $this->repository->execute(
                "UPDATE users 
                 SET token = :token,
                     token_auth_date = :token_auth_date
                 WHERE id = :id",
                [
                    "id" => $userId,
                    "token" => $newToken,
                    "token_auth_date" => $tokenDate
                ]
            );
        }

        // Cambio rol a admin //
        $this->repository->authorizeAdmin($userId);
    }
}
