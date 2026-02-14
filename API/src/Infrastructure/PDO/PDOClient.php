<?php 

namespace Src\Infrastructure\PDO;

use PDO;
use PDOException;

final class PDOClient {

    private static array $activeClients = [];

    public function connect(): PDO
    {
        $client = $this->client();

        if ($client === null) {
            $client = $this->connectClient();
        }

        return $client;
    }

    private function client(): ?PDO
    {
        return self::$activeClients[$_ENV['DATABASE_USER']] ?? null;
    }

    private function connectClient(): PDO
    {
        try {
            $conn = new PDO(
                $this->generateUrl(),                     
                $_ENV['DATABASE_USER'],
                $_ENV['DATABASE_PASSWORD'],
                [
                    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
                    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
                ]
            );

            $conn->exec("SET NAMES utf8mb4");
            $conn->exec("SET CHARACTER SET utf8mb4");
            $conn->exec("SET SESSION collation_connection = utf8mb4_general_ci");

            self::$activeClients[$_ENV['DATABASE_USER']] = $conn;
            return $conn;

        } catch (PDOException $e) {
            echo "Hubo un error en la base de datos ".$e->getMessage();
            exit();
        }
    }

    private function generateUrl(): string
    {
        return sprintf(
            '%s:host=%s;dbname=%s;charset=utf8mb4',
            $_ENV['DATABASE_DRIVER'],
            sprintf('%s:%s', $_ENV['DATABASE_HOST'], $_ENV['DATABASE_PORT']),
            $_ENV['DATABASE_NAME']
        );
    }
}
