<?php 

use Src\Service\Inscription\InscriptionFinderService;

final readonly class InscriptionGetController {
    private InscriptionFinderService $service;

    public function __construct() {
        $this->service = new InscriptionFinderService();
    }

    public function start(int $id): void 
    {
        $event = $this->service->find($id);

        echo json_encode([
            "id" => $event->id(),
            "name" => $event->name(),
            "surname" => $event->surname(),
            "email" => $event->email(),
            "phone" => $event->phone()
        ], true);

        exit;
    }
}
