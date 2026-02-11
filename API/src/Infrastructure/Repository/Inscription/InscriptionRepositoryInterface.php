<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Inscription;    

use Src\Entity\Inscription\Inscription;

interface InscriptionRepositoryInterface {



    public function insert(Inscription $inscription): void;

}