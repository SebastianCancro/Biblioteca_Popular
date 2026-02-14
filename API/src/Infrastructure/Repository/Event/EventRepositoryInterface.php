<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Event;

use Src\Entity\Event\Event;

interface EventRepositoryInterface {

     public function find(int $id): ?Event;

    /** @return Event[] */
    public function search(): array;

    public function insert(Event $event): void;
    public function update(Event $event): void;
    public function searchWithCounts(): array;
}
