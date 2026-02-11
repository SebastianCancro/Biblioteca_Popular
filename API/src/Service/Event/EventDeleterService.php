<?php 

namespace Src\Service\Event;

use Src\Infrastructure\Repository\Event\EventRepository;

final readonly class EventDeleterService {
    private EventRepository $repository;
    private EventFinderService $finder;

    public function __construct() {
        $this->repository = new EventRepository();
        $this->finder = new EventFinderService();
    }

    public function delete(int $id): void
    {
        $event = $this->finder->find($id);

        $event->delete();

        $this->repository->update($event);
    }
}