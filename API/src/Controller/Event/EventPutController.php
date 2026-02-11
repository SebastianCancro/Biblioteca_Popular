<?php

use Src\Middleware\AuthMiddleware;
use Src\Utils\ControllerUtils;
use Src\Service\Event\EventUpdaterService;

final readonly class EventPutController extends AuthMiddleware {
    private EventUpdaterService $service;

    public function __construct() {
        parent::__construct();
        $this->service = new EventUpdaterService();
    }

    public function start(int $id): void
{
    $title = ControllerUtils::getPost("title");
    $description = ControllerUtils::getPost("description");
    $image = ControllerUtils::getPost("image");

    $end_date_str = ControllerUtils::getPost("end_date");
    $end_date = $end_date_str ? new DateTime($end_date_str) : null;

    $is_active_raw = ControllerUtils::getPost("is_active");
    $is_active = $is_active_raw === "1";

    $this->service->update($id, $title, $description, $image, $end_date, $is_active);
}

}