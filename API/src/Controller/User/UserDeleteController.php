<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserDeleteService;
use Src\Entity\User\Exception\UserNotFoundException;
// Controlador para eliminar un usuario //
final readonly class UserDeleteController
{
    public function __construct(
        private UserDeleteService $service = new UserDeleteService(),
    ) {}

    public function start(int $id): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $m = $_SERVER['REQUEST_METHOD'] ?? '';
        if (!in_array($m, ['DELETE','POST'], true)) {
            header('Allow: DELETE, POST');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        //verificar permisos//
        (new AuthMiddleware())->authenticate(true, ['super_adm']);
        try {
            $this->service->delete($id);
            http_response_code(200);
            echo json_encode(['status' => 200, 'message' => 'Usuario eliminado.', 'userId' => $id]);
        } catch (UserNotFoundException) {
            http_response_code(404);
            echo json_encode(['error' => 'Usuario no encontrado']);
        }
    }
}
