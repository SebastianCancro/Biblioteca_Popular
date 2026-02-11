<?php

declare(strict_types=1);

use Src\Service\User\UserFinderService;

final class UserSearchByEmailController
{
    public function start(string $email): void
    {
        header('Content-Type: application/json; charset=utf-8');

        try {
            $service = new UserFinderService();
            $user = $service->findByEmail($email);

            if ($user === null) {
                http_response_code(404);
                echo json_encode(["error" => "No se encontró usuario con el email: $email"]);
                exit;
            }

            echo json_encode([
                "id" => $user->id(),
                "name"=> $user->name(),
                "email"=> $user->email(),
                "role"=> $user->role(),
                "is_active"=> $user->is_active(),
            ]);
            exit;

        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
            exit;
        }
    }
}
