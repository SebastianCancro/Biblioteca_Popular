<?php 

final readonly class InscriptionRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "inscription_create",
        "url" => "/inscription-cursos-eventos",
        "controller" => "Inscription/InscriptionPostController.php",
        "method" => "POST"
      ]
    ];
  }
}
