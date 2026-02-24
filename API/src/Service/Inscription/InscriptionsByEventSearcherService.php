<?php 

namespace Src\Service\Inscription; 
 
use Src\Infrastructure\Repository\Inscription\InscriptionRepository;

final readonly class InscriptionsByEventSearcherService {

    private InscriptionRepository $repository;

    public function __construct() {
        $this->repository = new InscriptionRepository();
    }

    public function searchByEvent(int $id_event): array
    {
        return $this->repository->searchByEvent($id_event);
    }
}