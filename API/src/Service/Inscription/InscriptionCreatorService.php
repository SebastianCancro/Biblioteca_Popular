<?php 

namespace Src\Service\Inscription;

use Src\Entity\Inscription\Inscription;
use Src\Infrastructure\Repository\Inscription\InscriptionRepository;

final readonly class InscriptionCreatorService {
    private InscriptionRepository $repository;

    public function __construct() {
        $this->repository = new InscriptionRepository();
    }

    public function create(string $name, string $surname, string $email, int $phone, int $idEvent): void
{
    $inscription = Inscription::create($name, $surname, $email, $phone, $idEvent);
    $this->repository->insert($inscription);
}

}