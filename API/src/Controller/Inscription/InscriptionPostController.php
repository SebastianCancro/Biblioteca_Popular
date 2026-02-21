<?php

use Src\Utils\ControllerUtils;
use Src\Service\Inscription\InscriptionCreatorService;

final readonly class InscriptionPostController {
    private InscriptionCreatorService $service;

    public function __construct() {
        $this->service = new InscriptionCreatorService();
    }

    public function start(): void
    {
        $payload = [
            'name'=> trim((string)(ControllerUtils::getPost('name', false) ?? ($_POST['name'] ?? ''))),
            'surname'=> trim((string)(ControllerUtils::getPost('surname', false) ?? ($_POST['surname'] ?? ''))),
            'email'=> trim((string)(ControllerUtils::getPost('email', false) ?? ($_POST['email'] ?? ''))),
            'phone'=> trim((string)(ControllerUtils::getPost('phone', false) ?? ($_POST['phone'] ?? ''))),
            'id_event' => (string)(ControllerUtils::getPost('id_event', false) ?? ($_POST['id_event'] ?? '')),
        ];
        try {
            
        $this->service->create($payload);

        header('Content-Type: application/json');
        http_response_code(201);
        echo json_encode([
            "message" => "Inscripcion creada correctamente",
            "event_id" => $payload['id_event']
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