<?php

use Src\Service\User\UserCreatorService;

final class UserRegisterController
{
    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $raw = file_get_contents('php://input') ?: '{}';
        $body = json_decode($raw, true) ?? [];

        try {
            $service = new UserCreatorService();
            $service->create(
                $body['name'] ?? '',
                $body['email'] ?? '',
                $body['password'] ?? '',
                'visitor', // todos arrancan como visitor //
                false // quedan pendientes de aprobación por un super_adm //
            );

            echo json_encode([
                "status"=> "ok",
                "message" => "Usuario registrado, pendiente de aprobación"
            ]);
        } catch (\Throwable $e) {
            http_response_code(400);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
