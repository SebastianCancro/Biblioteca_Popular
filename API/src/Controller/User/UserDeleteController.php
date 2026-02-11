<?php

use Src\Middleware\AuthMiddleware;
use Src\Service\User\UserDeleterService;

final readonly class UserDeleteController {
    private UserDeleterService $service;
    private AuthMiddleware $auth;

    public function __construct() {
        // Inicializamos los servicios //
        $this->service = new UserDeleterService();
        $this->auth = new AuthMiddleware();
    }

    public function start(int $id): void
    {
        // Validar token y rol permitido //
        $this->auth->authenticate(true, ['super_adm']);

        // Eliminar el usuario según el ID recibido //
        $this->service->delete($id);

        // Respuesta JSON al frontend //
        header('Content-Type: application/json');
        echo json_encode(["message" => "Usuario eliminado correctamente"]);
        exit;
    }
}
