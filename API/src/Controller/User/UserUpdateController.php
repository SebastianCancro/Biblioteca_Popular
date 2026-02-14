<?php
declare(strict_types=1);

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserUpdaterService;
use Src\Utils\ControllerUtils;

final class UserUpdateController
{
    public function start(int $id): void
    {
        header('Content-Type: application/json; charset=utf-8');

        $m = $_SERVER['REQUEST_METHOD'] ?? '';
        if (!in_array($m, ['PUT', 'PATCH'], true)) {
            header('Allow: PUT, PATCH');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        // Solo super_adm //
        $actorId = (new AuthMiddleware())->authenticate(true, ['super_adm']);
        // recojo datos //
        $fields = [];
        foreach (['name','email','password','role','is_active','apellido','dni'] as $k) {
            $v = ControllerUtils::getPost($k, false);
            $fields[$k] = $v !== null ? $v : ($_POST[$k] ?? null);
        }
        (new UserUpdaterService())->updateFromArray($id, $fields, $actorId);
        http_response_code(200);
        echo json_encode(
            ['status' => 'ok', 'message' => 'Usuario actualizado correctamente'],
            JSON_UNESCAPED_UNICODE
        );
    }
}
