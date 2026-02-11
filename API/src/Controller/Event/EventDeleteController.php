<?php

use Src\Middleware\AuthMiddleware;
use Src\Service\Event\EventDeleterService;

final readonly class EventDeleteController extends AuthMiddleware {
    private EventDeleterService $service;

    public function __construct() {
        parent::__construct();
        $this->service = new EventDeleterService();
    }

    public function start(int $id): void
    {
        $this->service->delete($id);
    }
}