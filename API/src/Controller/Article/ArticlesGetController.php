<?php 

use Src\Service\Article\ArticlesSearcherService;

final readonly class ArticlesGetController {

    private ArticlesSearcherService $service;

    public function __construct() {
        $this->service = new ArticlesSearcherService();
    }

    public function start(): void 
    {
        // Parámetros de paginación //
        $page = isset($_GET['page']) ? (int)$_GET['page'] : 1;
        $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 6; 
        $offset = ($page - 1) * $limit;

        $response = $this->service->search($limit, $offset); 

        // Verifica por si acaso el tipo de dato //
        if (!is_array($response)) {
            $response = [];
        }

        $filtered = $this->filterResponses($response);

        //Limpiamos los datos para evitar errores con json_encode //
        $cleanedArticles = array_map(function($article) {
            foreach ($article as $key => $value) {
                if (is_object($value) && !($value instanceof \DateTime)) {
                    $article[$key] = null;
                }
                if (is_resource($value)) {
                    $article[$key] = null;
                }
            }
            return $article;
        }, $filtered);

        // Total de artículos y cálculo de páginas //
        $total = $this->service->countArticles();
        $totalPages = ceil($total / $limit);

        // respuesta final con paginación //
        $result = [
            "data" => $cleanedArticles,
            "page" => $page,
            "limit" => $limit,
            "total" => $total,
            "totalPages" => $totalPages
        ];

        // Convertimos a JSON //
        $json = json_encode($result);

        if ($json === false) {
            var_dump(json_last_error_msg(), $result);
            exit;
        }

        echo $json;
        exit;
    }

    private function filterResponses(array $responses): array
    {
        $result = [];

        foreach ($responses as $response) {
            $result[] = [
                "id" => $response->id(),
                "title" => $response->title(),
                "image" => $response->image() ?: null,
                "body" => $response->body(),
                "date" => $response->date() instanceof \DateTime 
                          ? $response->date()->format('Y-m-d H:i:s') 
                          : null
            ];
        }

        return $result;
    }
}
