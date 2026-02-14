<?php 

namespace Src\Service\Inscription; 
 
use Src\Infrastructure\Repository\Inscription\InscriptionRepository;

final readonly class InscriptionsSearcherService {

    private InscriptionRepository $repository;

    public function __construct() {
        $this->repository = new InscriptionRepository();
    }

    public function search(): array
    {
        return $this->repository->search();
    }
}