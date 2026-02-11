<?php 

namespace Src\Entity\Event\Exception;

use Exception;

final class EventNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct('No se encontro el evento con id: '.$id);
    }
}