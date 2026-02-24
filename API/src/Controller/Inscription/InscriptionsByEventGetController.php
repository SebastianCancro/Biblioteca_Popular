<?php

use Src\Service\Inscription\InscriptionsByEventSearcherService;

final readonly class InscriptionsByEventGetController
{
    private InscriptionsByEventSearcherService $service;

    public function __construct()
    {
        $this->service = new InscriptionsByEventSearcherService();
    }

    public function start(int $id_event): void
    {
        header('Content-Type: application/json; charset=utf-8');

        try {
            $response = $this->service->searchByEvent($id_event);
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

    foreach ($responses as $ins) {
        $result[] = [
            "id"       => $ins->id(),
            "name"     => $ins->name(),
            "surname"  => $ins->surname(),
            "email"    => $ins->email(),
            "phone"    => $ins->phone(),
            "id_event" => $ins->idEvent(),
            "event"    => $ins->eventTitle()
        ];
    }

    return $result;
}


}