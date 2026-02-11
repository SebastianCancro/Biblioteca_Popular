<?php

declare(strict_types=1);

namespace Src\Controller\User;

use Src\Service\User\UserAuthorizeAdminService;

final class UserAuthorizeAdminController
{
    public function __invoke(array $params = []): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $superAdmId = (int)($_GET['super_adm_id'] ?? 0); 
        $userId = (int)($params['id'] ?? 0);

        if ($superAdmId <= 0 || $userId <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "Parámetros inválidos"]);
            return;
        }

        try {
            $service = new UserAuthorizeAdminService();
            $service->promoteToAdmin($superAdmId, $userId);

            echo json_encode([
                "status" => "ok",
                "message" => "Usuario promovido a admin correctamente"
            ]);
        } catch (\Throwable $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
