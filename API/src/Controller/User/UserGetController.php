<?php

use Src\Service\User\UserFinderService;

final class UserGetController
{
    public function start(int $id): void
    {
        header('Content-Type: application/json; charset=utf-8');

        try {
            $service = new UserFinderService();
            $user = $service->find($id);

            echo json_encode([
                "id" => $user->id(),
                "name" => $user->name(),
                "email" => $user->email(),
                "role" => $user->role(),
                "is_active" => $user->is_active(),
                "token" => $user->token(),
                "token_auth_date" => $user->token_auth_date()?->format("Y-m-d H:i:s")
            ]);
        } catch (\Throwable $e) {
            http_response_code(404);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
