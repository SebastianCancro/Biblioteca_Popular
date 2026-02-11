<?php

use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Event\EventCreatorService;

final readonly class EventPostController extends AuthMiddleware {
    private EventCreatorService $service;

    public function __construct() {
        parent::__construct();
        $this->service = new EventCreatorService();
    }

public function start(): void{
    $title = ControllerUtils::getPost("title");
    $description = ControllerUtils::getPost("description");
    $image = ControllerUtils::getPost("image");

    $end_date_str = ControllerUtils::getPost("end_date");
    $end_date = $end_date_str ? new DateTime($end_date_str) : null;

    $is_active_raw = ControllerUtils::getPost("is_active");
    $is_active = $is_active_raw === "1";

    $this->service->create($title, $description, $image, $end_date, $is_active);
}


}