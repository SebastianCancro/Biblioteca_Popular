<?php

declare(strict_types=1);

use Src\Service\User\UserManagementService;

final class UserListActiveController
{
    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $service = new UserManagementService();
        $users = $service->getActiveUsers();

        //devolvemos un array plano con los datos de usuarios activos //
        echo json_encode(
            array_map(fn($u) => [
                "id"=> $u->id(),
                "name" => $u->name(),
                "email"=> $u->email(),
                "role"=> $u->role(),
                "is_active"=> $u->is_active(),
            ], $users)
        );
    }
}
