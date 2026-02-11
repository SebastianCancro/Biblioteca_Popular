<?php

use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Article\ArticleDeleterService;

final readonly class ArticleDeleteController {
    private ArticleDeleterService $service;
    private AuthMiddleware $auth;

    public function __construct() {
        $this->service = new ArticleDeleterService();
        $this->auth = new AuthMiddleware();
    }

    public function start(int $id): void {
        // Validar token y rol permitido solo 'admin' y 'super_adm' //
        $this->auth->authenticate(true, ['admin', 'super_adm']);

        $this->service->delete($id);

        header('Content-Type: application/json');
        echo json_encode(["message" => "Artículo eliminado correctamente"]);
        exit;
    }
}
