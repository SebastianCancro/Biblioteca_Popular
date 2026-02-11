<?php

use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Article\ArticleUpdaterService;

final readonly class ArticlePutController {
    private ArticleUpdaterService $service;
    private AuthMiddleware $auth;

    public function __construct() {
        // Inicializamos los servicios //
        $this->service = new ArticleUpdaterService();
        $this->auth = new AuthMiddleware();
    }

    public function start(int $id): void
    {
        try {
            //validar token y rol permitido //
            $this->auth->authenticate(true, ['admin', 'super_adm']);

            // Obtener datos JSON del body//
            $title = ControllerUtils::getPost("title");
            $image = ControllerUtils::getPost("image");
            $body  = ControllerUtils::getPost("body");

            //Actualizar el artículo según el id recibido //
            $this->service->update($id, $title, $image, $body);

            //Respuesta JSON //
            header('Content-Type: application/json');
            http_response_code(200);
            echo json_encode(["message" => "Artículo actualizado correctamente"]);
        } catch (Exception $e) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }

        exit;
    }
}
