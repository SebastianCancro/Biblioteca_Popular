<?php

use Src\Utils\ControllerUtils;
use Src\Service\Book\BooksSearcherService;

final readonly class BooksGetController {
    private BooksSearcherService $service;

    public function __construct() {
        $this->service = new BooksSearcherService();
    }

    public function start(): void {
        header('Content-Type: application/json; charset=utf-8');

        $titulo    = ControllerUtils::getPost("titulo", false, "");
        $autor     = ControllerUtils::getPost("autor", false, "");
        $materia   = ControllerUtils::getPost("materia", false, "");
        $editorial = ControllerUtils::getPost("editorial", false, "");

        
        $anioRaw = ControllerUtils::getPost("anio", false, null);
        $anio = $anioRaw !== null && $anioRaw !== "" ? (int)$anioRaw : null;

        
        $disponibleRaw = ControllerUtils::getPost("disponible", false, null);
        $disponible = in_array($disponibleRaw, [1, "1", true, "true"], true) ? true :
                      (in_array($disponibleRaw, [0, "0", false, "false"], true) ? false : null);

        $reservadaRaw = ControllerUtils::getPost("reservada", false, null);
        $reservada = in_array($reservadaRaw, [1, "1", true, "true"], true) ? true :
                     (in_array($reservadaRaw, [0, "0", false, "false"], true) ? false : null);

        $books = $this->service->search(
            $titulo,
            $autor,
            $materia,
            $editorial,
            $anio,
            $disponible,
            $reservada
        );

        

        echo json_encode($books, JSON_UNESCAPED_UNICODE);
    }
}
