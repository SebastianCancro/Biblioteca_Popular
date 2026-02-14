<?php 

final readonly class BookRoutes {
  public static function getRoutes(): array {
    return [
      [
        "name" => "book_get",
        "url" => "/books",
        "controller" => "Book/BookGetController.php",
        "method" => "GET",
        "parameters" => [
          [
            "name" => "id" ,
            "type" => "int"
          ],
        ]
      ],
      [
        "name" => "books_update",
        "url" => "/books/update",
        "controller" => "Book/BooksUpdateController.php",
        "method" => "POST"
      ],
      [
        "name" => "books_get",
        "url" => "/books",
        "controller" => "Book/BooksGetController.php",
        "method" => "POST"
      ]
    ];
  }
}

      
    
 