<?php

use Src\Entity\User\Exception\UserIsNotAuthorizedException;
use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Article\ArticleCreatorService;

final readonly class ArticlePostController {
    private ArticleCreatorService $service;
    private AuthMiddleware $auth;

    public function __construct() {
        $this->service = new ArticleCreatorService();
        $this->auth = new AuthMiddleware();
    }

    public function start(): void
    {
        try {
            // Validar token y rol permitido solo 'admin' y 'super_adm' //
            $this->auth->authenticate(true, ['admin', 'super_adm']);

            // Obtener datos del POST //
            $title = ControllerUtils::getPost("title");
            $image = ControllerUtils::getPost("image");
            $body  = ControllerUtils::getPost("body");

            // Crear el nuevo artículo //
            $this->service->create($title, $image, $body);

            // Respuesta JSON //
            header('Content-Type: application/json');
            http_response_code(201);
            echo json_encode([
                "message" => "Artículo creado correctamente",
                "title"   => $title
            ]);
        }
        // Manejar errores //

        catch (UserIsNotAuthorizedException $e) {     
                header('Content-Type: application/json');
                http_response_code(401);
                echo json_encode(["error" => $e->getMessage()]);
        } 
        catch (Throwable $e) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}