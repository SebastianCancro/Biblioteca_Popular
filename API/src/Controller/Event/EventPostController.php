<?php

use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Event\EventCreatorService;

final readonly class EventPostController{
    private EventCreatorService $service;
    private AuthMiddleware $auth;
    public function __construct() {
        $this->service = new EventCreatorService();
        $this->auth = new AuthMiddleware();
    }

    public function start(): void{
            try {
                
                $this->auth->authenticate(true, ['admin', 'super_adm']);

            
                $title = ControllerUtils::getPost("title");
                $description = ControllerUtils::getPost("description");
                $image  = ControllerUtils::getPost("image");
                $endDateString = ControllerUtils::getPost("end_date");
                $endDate = null;

                if (!empty($endDateString)) {
                    try {
                $endDate = new \DateTime($endDateString);
                    } catch (\Exception $e) {
                http_response_code(400);
                echo json_encode(["error" => "Formato de fecha inválido para 'end_date'."]);
                exit;
                }
                    }

            
                $this->service->create($title, $description, $image, $endDate);

                header('Content-Type: application/json');
                http_response_code(201);
                echo json_encode([
                    "message" => "Evento creado correctamente",
                    "title"   => $title
                ]);
            } catch (Exception $e) {
                // Manejar error //
                header('Content-Type: application/json');
                http_response_code(500);
                echo json_encode(["error" => $e->getMessage()]);
            }
     exit;
    }
}
