<?php 

declare(strict_types = 1);

namespace Src\Infrastructure\Repository\Inscription;

use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\Inscription\Inscription;

final readonly class InscriptionRepository extends PDOManager implements InscriptionRepositoryInterface {

    

    

    public function insert(Inscription $inscription): void
    {
        $query = "INSERT INTO inscriptions (name, surname, email, phone) VALUES (:name, :surname, :email, :phone) ";

        $parameters = [
            "name" => $inscription->name(),
            "surname" => $inscription->surname(),
            "email" => $inscription->email(),
            "phone" => $inscription->phone()
        ];

        $this->execute($query, $parameters);
    }

    

    private function primitiveToInscription(?array $primitive): ?Inscription
    {
        if ($primitive === null) {
            return null;
        }

        return new Inscription(
            $primitive["id"],
            $primitive["name"],
            $primitive["surname"],
            $primitive["email"],
            $primitive["phone"] 
        );
    }
}