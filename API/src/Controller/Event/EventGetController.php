<?php 

use Src\Service\Event\EventFinderService;

final readonly class EventGetController {
    private EventFinderService $service;

    public function __construct() {
        $this->service = new EventFinderService();
    }

    public function start(int $id): void 
    {
        $event = $this->service->find($id);

        echo json_encode([
            "id" => $event->id(),
            "title" => $event->title(),
            "description" => $event->description(),
            "image" => $event->image(),
            "end_date" => $event->endDate()->format('Y-m-d')
        ], true);

        exit;
    }
}
