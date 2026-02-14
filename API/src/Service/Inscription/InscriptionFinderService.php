<?php 


declare(strict_types = 1);

namespace Src\Service\Inscription;

use Src\Entity\Inscription\Inscription;
use Src\Entity\Inscription\Exception\InscriptionNotFoundException;
use Src\Infrastructure\Repository\Inscription\InscriptionRepository;

final readonly class InscriptionFinderService {

    private InscriptionRepository $inscriptionRepository;

    public function __construct() 
    {
        $this->inscriptionRepository = new InscriptionRepository();
    }

    public function find(int $id): Inscription 
    {
        $inscription = $this->inscriptionRepository->find($id);

        if ($inscription === null) {
            throw new InscriptionNotFoundException($id);
        }

        return $inscription;
    }

}
