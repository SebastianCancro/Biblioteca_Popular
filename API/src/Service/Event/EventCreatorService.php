<?php 

namespace Src\Service\Event;

use DateTime;
use Src\Entity\Event\Event;
use Src\Infrastructure\Repository\Event\EventRepository;

final readonly class EventCreatorService {
    private EventRepository $repository;

    public function __construct() {
        $this->repository = new EventRepository();
    }
    
public function create(string $title, string $description, string $image, ?DateTime $end_date = null, bool $is_active = true): void
{
    $event = Event::create($title, $description, $image, $end_date, $is_active);
    $this->repository->insert($event);
}


}