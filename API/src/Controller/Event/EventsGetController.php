<?php

use Src\Service\Event\EventsSearcherService;
use Src\Infrastructure\Repository\Event\EventRepository;

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
            $repo = new EventRepository();
            $response = $repo->searchWithCounts();
            echo json_encode($this->filterResponses($response), JSON_UNESCAPED_UNICODE);
        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode([
            'message' => 'Error interno',
            'error' => $e->getMessage(),
            'trace' => $e->getTraceAsString()
        ]);
        }

        exit;
    }

    private function filterResponses(array $responses): array
{
    $result = [];

    foreach ($responses as $event) {
        $result[] = [
            "id"                 => $event["id"],
            "title"              => $event["title"],
            "description"        => $event["description"],
            "image"              => $event["image"],
            "end_date"           => $event["end_date"],
            "is_active"          => (bool)$event["is_Active"],
            "deleted"            => (bool)$event["deleted"],
            "inscriptions_count" => (int)($event["inscriptions_count"] ?? 0),
        ];
    }

    return $result;
}



}