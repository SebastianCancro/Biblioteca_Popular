<?php

use Src\Service\User\UserManagementService;
use Src\Middleware\AuthMiddleware;

final class UserApproveController
{
    public function start(int $id): void
    {
        header("Content-Type: application/json; charset=utf-8");

        try {
        //valida el token y devuelve el ID del super_adm logueado //
            $auth = new AuthMiddleware();
            $superAdmId = $auth->authenticate();

            $service = new UserManagementService();
            $service->acceptUser($superAdmId, $id);

            echo json_encode([
                "status" => "ok",
                "message" => "Usuario aprobado correctamente"
            ]);
        } catch (\Throwable $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
