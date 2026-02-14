<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserAuthorizeAdminService;
// Controlador para aprobar y promover un usuario a admin //
final readonly class UserApproveController
{
    public function __construct(
        private UserAuthorizeAdminService $service = new UserAuthorizeAdminService(),
    ) {}
    public function start(int $id): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $m = $_SERVER['REQUEST_METHOD'] ?? '';
        if (!in_array($m, ['POST','PUT'], true)) {
            header('Allow: POST, PUT');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        // solo super_adm puede aprobar,promover//
        $actorId = (new AuthMiddleware())->authenticate(true, ['super_adm']);
        // aprobar y promover//
        $this->service->approveAndPromote($actorId, $id);

        http_response_code(200);
        echo json_encode([
            'status'  => 200,
            'message' => 'Usuario aprobado y promovido a admin.',
            'userId'  => $id,
        ]);
    }
}
