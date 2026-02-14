<?php

use Src\Middleware\AuthMiddleware;
use Src\Service\Event\EventDeleterService;

final readonly class EventDeleteController{
    private EventDeleterService $service;
    private AuthMiddleware $auth;
    public function __construct() {
        $this->service = new EventDeleterService();
        $this->auth = new AuthMiddleware();
    }

    public function start(int $id): void
    {
        $this->auth->authenticate(true, ['admin', 'super_adm']);

        $this->service->delete($id);

        header('Content-Type: application/json');
        echo json_encode(["message" => "Evento eliminado correctamente"]);
        exit;
    }
}