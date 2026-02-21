<?php

use Src\Middleware\AuthMiddleware;
use Src\Service\Inscription\InscriptionDeleterService;

final readonly class InscriptionDeleteController{
    private InscriptionDeleterService $service;
    private AuthMiddleware $auth;
    public function __construct() {
        $this->service = new InscriptionDeleterService();
        $this->auth = new AuthMiddleware();
    }

    public function start(int $id): void
    {
        $this->auth->authenticate(true, ['admin', 'super_adm']);

        $this->service->delete($id);

        header('Content-Type: application/json');
        echo json_encode(["message" => "Inscripción eliminada correctamente"]);
        exit;
    }
}