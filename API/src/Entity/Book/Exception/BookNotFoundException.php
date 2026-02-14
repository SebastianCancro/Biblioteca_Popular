<?php 

namespace Src\Entity\Book\Exception;

use Exception;

final class BookNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct('No se encontró el libro con id: ' . $id);
    }
}
