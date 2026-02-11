<?php

use Src\Service\Event\EventsSearcherService;

final readonly class EventsGetController
{
    private EventsSearcherService $service;

    public function __construct()
    {
        $this->service = new EventsSearcherService();
    }

    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');

        try {
            $response = $this->service->search();
            echo json_encode($this->filterResponses($response), JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode(['message' => 'Error interno']);
        }
        exit;
    }

    private function filterResponses(array $responses): array
{
    $result = [];

    foreach ($responses as $event) {
        $result[] = [
            "id"          => $event->id(),
            "title"       => $event->title(),
            "description" => $event->description(),
            "image"       => $event->image(),
            "end_date"    => $event->endDate()?->format('Y-m-d') ?? null,
            "is_active"   => $event->is_active(),   
            "deleted"     => $event->isDeleted(),   
        ];
    }

    return $result;
}

}