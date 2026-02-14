<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserFinderService;
// Controlador para verificar datos del usuario logueado //
final readonly class UserVerifyController
{
    public function __construct(
        private UserFinderService $finder = new UserFinderService(),
    ) {}

    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'GET') {
            header('Allow: GET');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        //Cualquiera logueado//
        $userId = (new AuthMiddleware())->authenticate(true, []);
        // Obtengo datos del usuario //
        $u = $this->finder->find($userId);
        // Responde //
        http_response_code(200);
        echo json_encode([
            'id' => $u->id(),
            'name' => $u->name(),
            'email'=> $u->email(),
            'token_auth_date'=> $u->token_auth_date()?->format('Y-m-d H:i:s'),
            'role'=> $u->role(),
            'is_active'=> $u->is_active(),
        ], JSON_UNESCAPED_UNICODE);
    }
}
