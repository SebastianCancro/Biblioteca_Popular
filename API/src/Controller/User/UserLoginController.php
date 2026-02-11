<?php

use Src\Service\User\UserLoginService;

final class UserLoginController
{
    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $raw = file_get_contents('php://input') ?: '{}';
        $body = json_decode($raw, true) ?? [];

        try {
            $service = new UserLoginService();
            $user = $service->login(
                $body['email'] ?? '',
                $body['password'] ?? ''
            );

            echo json_encode([
                "status" => "ok",
                "user" => [
                    "id" => $user->id(),
                    "name" => $user->name(),
                    "email" => $user->email(),
                    "role" => $user->role(),
                    "token" => $user->token()
                ]
            ]);
        } catch (\Throwable $e) {
            http_response_code(401);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
