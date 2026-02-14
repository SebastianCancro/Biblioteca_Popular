<?php

use Src\Service\Book\BookFinderService;
use Src\Entity\Book\Exception\BookNotFoundException;

final readonly class BookGetController {
    private BookFinderService $service;

    public function __construct() {
        $this->service = new BookFinderService();
    }

    public function start(): void {
        header('Content-Type: application/json; charset=utf-8');

        $id = isset($_GET['id']) ? (int)$_GET['id'] : 0;
        if ($id <= 0) {
            $uri = strtok($_SERVER['REQUEST_URI'] ?? '', '?');
            if (preg_match('#/books/(\d+)$#', $uri, $m)) {
                $id = (int)$m[1];
            }
        }
        if ($id <= 0) {
            http_response_code(400);
            echo json_encode(["error" => "ID inválido"]);
            exit;
        }

        try {
            $book = $this->service->find($id);
            echo json_encode([
                "id"             => $book->id(),
                "codigo"         => $book->codigo(),
                "materia"        => $book->materia(),
                "titulo"         => $book->titulo(),
                "autor"          => $book->autor(),
                "editorial"      => $book->editorial(),
                "edicion"        => $book->edicion(),
                "anio"           => $book->anio(),
                "disponibilidad" => $book->disponibilidad(),
                "reservada"      => $book->reservada(),
            ], JSON_UNESCAPED_UNICODE);
            exit; 
        } catch (BookNotFoundException $e) {
            http_response_code(404);
            echo json_encode(["error" => $e->getMessage()]);
            exit; 
        }
    }
}
