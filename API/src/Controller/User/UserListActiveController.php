<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserListActiveService;
// Controlador para listar todos los usuarios activos //
final class UserListActiveController
{
    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
            header('Allow: GET');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }

        (new AuthMiddleware())->authenticate(true, ['super_adm']);

        $users = (new UserListActiveService())();

        $out = array_map(static fn($u) => [
            'id'=> $u->id(),
            'name' => $u->name(),
            'apellido'=> method_exists($u, 'apellido') ? $u->apellido() : null,
            'dni'=> method_exists($u, 'dni') ? $u->dni() : null,
            'email'=> $u->email(),
            'role'=> $u->role(),
            'is_active'=> method_exists($u, 'is_active') ? $u->is_active() : null,
        ], $users);

        http_response_code(200);
        echo json_encode($out, JSON_UNESCAPED_UNICODE);
    }
}
