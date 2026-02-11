<?php 

namespace Src\Service\Event;

use DateTime;
use Src\Entity\Event\Event;
use Src\Infrastructure\Repository\Event\EventRepository;

final readonly class EventUpdaterService {
    private EventRepository $repository;
    private EventFinderService $finder;

    public function __construct() {
        $this->repository = new EventRepository();
        $this->finder = new EventFinderService();
    }

    public function update(int $id, string $title, string $description, string $image, DateTime $end_date = null, bool $is_active): void
    {
        $event = $this->finder->find($id);

        $event->modify($title, $image, $description, $end_date, $is_active);

        $this->repository->update($event);
    }
}