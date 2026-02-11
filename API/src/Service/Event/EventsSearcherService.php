<?php 

namespace Src\Service\Event; 
 
use Src\Infrastructure\Repository\Event\EventRepository;

final readonly class EventsSearcherService {

    private EventRepository $repository;

    public function __construct() {
        $this->repository = new EventRepository();
    }

    public function search(): array
    {
        return $this->repository->search();
    }
}