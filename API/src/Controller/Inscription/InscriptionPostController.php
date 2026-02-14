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
        $name = ControllerUtils::getPost("name");
        $surname = ControllerUtils::getPost("surname");
        $email = ControllerUtils::getPost("email");
        $phone = ControllerUtils::getPost("phone");
        $idEvent = ControllerUtils::getPost("id_event");

        $this->service->create($name, $surname, $email, $phone, (int) $idEvent);


    }
}