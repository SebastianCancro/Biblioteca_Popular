<?php 

final readonly class EventRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "event_get",
        "url" => "/events",
        "controller" => "Event/EventGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "events_get",
        "url" => "/events",
        "controller" => "Event/EventsGetController.php",
        "method" => "GET"
      ],
      [
        "name" => "event_post",
        "url" => "/events",
        "controller" => "Event/EventPostController.php",
        "method" => "POST"
      ],
      [
        "name" => "event_put",
        "url" => "/events",
        "controller" => "Event/EventPutController.php",
        "method" => "PUT",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ],
      [
        "name" => "event_delete",
        "url" => "/events",
        "controller" => "Event/EventDeleteController.php",
        "method" => "DELETE",
        "parameters" => [
          [
            "name" => "id",
            "type" => "int"
          ]
        ]
      ]
      
    ];
  }
}
