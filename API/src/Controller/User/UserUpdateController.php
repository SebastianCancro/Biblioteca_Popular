<?php

use Src\Service\User\UserManagementService;
use Src\Middleware\AuthMiddleware;
use Src\Entity\User\User;

final class UserUpdateController
{
    public function start(int $id): void
    {
        header("Content-Type: application/json; charset=utf-8");

        $raw = file_get_contents("php://input") ?: "{}";
        $body = json_decode($raw, true) ?? [];

        try {
            $auth = new AuthMiddleware();
            $superAdmId = $auth->authenticate();

            $service = new UserManagementService();

            $user = new User(
                $id,
                $body["name"] ?? "",
                $body["email"] ?? "",
                $body["password"] ?? "",
                null,
                null,
                $body["role"] ?? "visitor",
                (bool)($body["is_active"] ?? false)
            );

            $service->updateUser($superAdmId, $user);

            echo json_encode([
                "status" => "ok",
                "message" => "Usuario actualizado correctamente"
            ]);
        } catch (\Throwable $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
