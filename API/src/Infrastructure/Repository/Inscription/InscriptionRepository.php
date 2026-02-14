<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Inscription;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Inscription\Inscription;

final readonly class InscriptionRepository extends PDOManager implements InscriptionRepositoryInterface {

    public function find(int $id): ?Inscription 
    {
        $query = <<<HEREDOC
                    SELECT 
                      *
                    FROM 
                    inscriptions A
                    WHERE 
                    A.id = :id 
                HEREDOC;
                    
        $parameters = [
            ":id" => $id
        ];

        $result = $this->execute($query, $parameters);
        
        return $this->primitiveToInscription($result[0] ?? null);
    }
    
    public function search(): array
{
    $query = <<<SQL
        SELECT 
            A.id,
            A.name,
            A.surname,
            A.email,
            A.phone,
            A.id_event,
            E.title AS event_title
        FROM inscriptions A
        LEFT JOIN events E ON E.id = A.id_event
        WHERE E.deleted = 0
        ORDER BY A.id DESC
    SQL;

    $results = $this->execute($query);

    if (!is_array($results) || !$results) return [];

    $out = [];
    foreach ($results as $row) {
        $out[] = $this->primitiveToInscription($row);
    }
    return $out;
}


    public function insert(Inscription $inscription): void
{
    $query = "INSERT INTO inscriptions (name, surname, email, phone, id_event)
              VALUES (:name, :surname, :email, :phone, :id_event)";

    $parameters = [
        "name"     => $inscription->name(),
        "surname"  => $inscription->surname(),
        "email"    => $inscription->email(),
        "phone"    => $inscription->phone(),
        "id_event" => $inscription->idEvent()
    ];

    $this->execute($query, $parameters);
}


    

    private function primitiveToInscription(?array $p): ?Inscription
{
    if ($p === null) return null;

    return new Inscription(
        isset($p["id"]) ? (int)$p["id"] : null,
        (string)$p["name"],
        (string)$p["surname"],
        (string)$p["email"],
        (int)$p["phone"],
        isset($p["id_event"]) ? (int)$p["id_event"] : null,
        isset($p["event_title"]) ? (string)$p["event_title"] : null
    );
}

}