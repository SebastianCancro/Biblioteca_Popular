<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserFinderService;
use Src\Entity\User\Exception\UserNotFoundException;
// Controlador para buscar un usuario por email //
final class UserSearchByEmailController
{
    public function start(string $email): void
    {
        header('Content-Type: application/json; charset=utf-8');
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
            header('Allow: GET');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        (new AuthMiddleware())->authenticate(true, ['admin','super_adm']);
       // Normalizar email //
        $email = strtolower(trim(urldecode($email)));
        // Buscar usuario //
        $svc = new UserFinderService();
        // Responde //
        try {
            $u = $svc->findByEmail($email);
            http_response_code(200);
            echo json_encode([
                'id'=> $u->id(),
                'name'=> $u->name(),
                'apellido'=> method_exists($u, 'apellido') ? $u->apellido() : null,
                'dni'=> method_exists($u, 'dni') ? $u->dni() : null,
                'email'=> $u->email(),
                'role'=> $u->role(),
                'is_active'=> method_exists($u, 'is_active') ? $u->is_active() : null,
            ], JSON_UNESCAPED_UNICODE);
        } catch (UserNotFoundException) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    }
}
