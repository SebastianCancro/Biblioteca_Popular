<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Event;

use DateTime;   
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Event\Event;

final readonly class EventRepository extends PDOManager implements EventRepositoryInterface
{
     public function find(int $id): ?Event 
    {
        $query = <<<HEREDOC
                        SELECT 
                            *
                        FROM
                            events A
                        WHERE
                            A.id = :id AND A.deleted = 0
                    HEREDOC;
                    
        $parameters = [
            "id" => $id
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToEvent($result[0] ?? null);
    }
    
    public function search(): array
{
    $query = <<<HEREDOC
                SELECT 
                    A.id,
                    A.title,
                    A.description,
                    A.image,
                    A.end_date,
                    A.is_active   AS is_active,  
                    A.deleted     AS deleted     
                FROM 
                    events A
                WHERE 
                    A.is_active = 1
                AND A.deleted = 0              
                ORDER BY A.id DESC
                HEREDOC;

    $results = $this->execute($query);

    if (!is_array($results) || !$results) {
        return [];
    }

    $eventsResults = [];
    foreach ($results as $result) {
        $eventsResults[] = $this->primitiveToEvent($result);
    }

    return $eventsResults;
}


     public function insert(Event $event): void
    {
        $query = "INSERT INTO events (title, description, image, end_date, is_active) 
                    VALUES (:title, :description, :image, :end_date, :is_active) ";

        $parameters = [
            "title" => $event->title(),
            "description" => $event->description(),
            "image" => $event->image(),
            "end_date" => $event->endDate()->format('Y-m-d'),
            "is_active"=>$event->is_active()
        ];

        $this->execute($query, $parameters);
    }

    public function update(Event $event): void
    {
        $query = <<<UPDATE_QUERY
                        UPDATE
                            events
                        SET
                            title = :title,
                            description = :description,
                            image = :image,
                            end_date = :end_date,
                            is_Active = :is_active,
                            deleted = :deleted
                        WHERE
                            id = :id
                    UPDATE_QUERY;

        $parameters = [
            "id" => $event->id(),
            "title" => $event->title(),
            "description" => $event->description(),
            "image" => $event->image(),
            "end_date" => $event->endDate()->format('Y-m-d'),
            "is_active"=>$event->is_active(),
            "deleted" => $event->isDeleted() ? 1 : 0
        ];

        $this->execute($query, $parameters);
    }



    private function primitiveToEvent(?array $primitive): ?Event
    {
        if ($primitive === null) {
            return null;
        }

        return new Event(
            (int) $primitive["id"],
            (string) $primitive["title"],
            (string) $primitive["description"],
            (string) $primitive["image"],
            !empty($primitive["end_date"]) ? new DateTime($primitive["end_date"]) : null,
            (bool) ($primitive["is_active"] ?? 0),
            (bool) ($primitive["deleted"] ?? 0),
            );

    }
}
