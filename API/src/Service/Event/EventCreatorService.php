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
    
public function create(string $title, string $description, string $image, ?DateTime $end_date): void
{
    $event = Event::create($title, $description, $image, $end_date);
    $this->repository->insert($event);
}


}