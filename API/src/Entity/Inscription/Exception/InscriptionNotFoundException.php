<?php 

namespace Src\Entity\Inscription\Exception;

use Exception;

final class InscriptionNotFoundException extends Exception {
    public function __construct(int $id) {
        parent::__construct('No se encontro la inscripcion con id: '.$id);
    }
}