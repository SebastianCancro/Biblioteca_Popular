<?php 

namespace Src\Service\Inscription;

use Src\Infrastructure\Repository\Inscription\InscriptionRepository;

final readonly class InscriptionDeleterService {
    private InscriptionRepository $repository;
    private InscriptionFinderService $finder;

    public function __construct() {
        $this->repository = new InscriptionRepository();
        $this->finder = new InscriptionFinderService();
    }

    public function delete(int $id): void
    {
        $this->repository->delete($id);
    }
}