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
                    SELECT *
                    FROM events A
                    WHERE A.id = :id 
                    AND A.deleted = 0
                HEREDOC;
                    
        $parameters = [
            ":id" => $id
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
                    A.is_Active,  
                    A.deleted     
                FROM 
                    events A
                WHERE 
                    A.is_Active = 1
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

    public function searchWithCounts(bool $onlyActive = false): array
{
    $query = "
        SELECT
            A.id,
            A.title,
            A.description,
            A.image,
            A.end_date,
            A.is_Active,
            A.deleted,
            COALESCE(C.cnt, 0) AS inscriptions_count
        FROM events A
        LEFT JOIN (
            SELECT id_event, COUNT(*) AS cnt
            FROM inscriptions
            GROUP BY id_event
        ) C ON C.id_event = A.id
        WHERE A.deleted = 0
        " . ($onlyActive ? " AND A.is_Active = 1" : "") . "
        ORDER BY A.id DESC
    ";

    $rows = $this->execute($query);
    if (!is_array($rows) || !$rows) return [];

    foreach ($rows as &$r) {
        $r['inscriptions_count'] = (int) $r['inscriptions_count'];
    }
    return $rows;
}




     public function insert(Event $event): void
    {
        $query = "INSERT INTO events (title, description, image, end_date, is_Active, deleted) 
                    VALUES (:title, :description, :image, :end_date, :is_Active, :deleted) ";

        $parameters = [
            "title" => $event->title(),
            "description" => $event->description(),
            "image" => $event->image(),
            "end_date" => $event->endDate()->format('Y-m-d'),
            "is_Active"=>$event->is_Active(),
            "deleted" => $event->isDeleted() ? 1 : 0
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
                            is_Active = :is_Active,
                            deleted = :deleted
                        WHERE
                            id = :id
                    UPDATE_QUERY;

        $parameters = [
            ":id" => $event->id(),
            ":title" => $event->title(),
            ":description" => $event->description(),
            ":image" => $event->image(),
            ":end_date" => $event->endDate()->format('Y-m-d'),
            ":is_Active"=>$event->is_Active(),
            ":deleted" => $event->isDeleted() ? 1 : 0
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
            (bool) ($primitive["is_Active"] ?? 0),
            (bool) ($primitive["deleted"] ?? 0),
            );

    }
}
