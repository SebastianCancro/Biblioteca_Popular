<?php 


declare(strict_types = 1);

namespace Src\Service\Event;

use Src\Entity\Event\Event;
use Src\Entity\Event\Exception\EventNotFoundException;
use Src\Infrastructure\Repository\Event\EventRepository;

final readonly class EventFinderService {

    private EventRepository $eventRepository;

    public function __construct() 
    {
        $this->eventRepository = new EventRepository();
    }

    public function find(int $id): Event 
    {
        $event = $this->eventRepository->find($id);

        if ($event === null) {
            throw new EventNotFoundException($id);
        }

        return $event;
    }

}
