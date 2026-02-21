<?php 

final readonly class InscriptionRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "inscription_get",
        "url"=> "/inscription-cursos-eventos/{id}",
        "controller" => "Inscription/InscriptionGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "inscription_create",
        "url" => "/inscription-cursos-eventos",
        "controller" => "Inscription/InscriptionPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "inscriptions_get",
        "url" => "/inscription-cursos-eventos",
        "controller" => "Inscription/InscriptionsGetController.php",
        "method" => "GET"

      ],
      [
        "name" => "inscription_delete",
        "url" => "/inscription-cursos-eventos/{id}",
        "controller" => "Inscription/InscriptionDeleteController.php",
        "method" => "DELETE",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
    ];
  }
}
