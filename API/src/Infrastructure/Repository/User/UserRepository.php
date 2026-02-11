<?php 

declare(strict_types=1);

namespace Src\Infrastructure\Repository\User;

use DateTime;
use Src\Infrastructure\PDO\PDOManager;
use Src\Entity\User\User;

final readonly class UserRepository extends PDOManager implements UserRepositoryInterface
{
    public function find(int $id): ?User
    {
        $query = "SELECT * FROM users WHERE id = :id";
        $result = $this->execute($query, ["id" => $id]);

        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByEmail(string $email): ?User
    {
        $query = "SELECT * FROM users WHERE email = :email";
        $result = $this->execute($query, ["email" => $email]);

        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByEmailAndPassword(string $email, string $password): ?User
    {
        $user = $this->findByEmail($email);

        if ($user && password_verify($password, $user->password())) {
            return $user;
        }

        return null;
    }

    public function findByToken(string $token): ?User
    {
        $query = "SELECT * FROM users WHERE token = :token AND :date <= token_auth_date";
        $parameters = [
            "token"=> $token,
            "date"=> date("Y-m-d H:i:s"),
        ];

        $result = $this->execute($query, $parameters);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function insert(User $user): void
    {
        $query = <<<SQL
            INSERT INTO users (name, email, password, token, role, is_active)
            VALUES (:name, :email, :password, :token, :role, :is_active)
        SQL;

        $parameters = [
            "name"=> $user->name(),
            "email"=> $user->email(),
            "password"=> $user->password(),
            "token"=> $user->token(),
            "role"=> $user->role(),
            "is_active"=> $user->is_active() ? 1 : 0,
        ];

        $this->execute($query, $parameters);
    }

    public function update(User $user): void
    {
        $query = <<<SQL
            UPDATE users
            SET name = :name,
                email = :email,
                password = :password,
                token = :token,
                token_auth_date = :token_auth_date,
                role = :role,
                is_active = :is_active
            WHERE id = :id
        SQL;

        $parameters = [
            "name"=> $user->name(),
            "email"=> $user->email(),
            "password"=> $user->password(),
            "token"=> $user->token(),
            "token_auth_date"=> $user->token_auth_date()?->format("Y-m-d H:i:s"),
            "role" => $user->role(),
            "is_active"=> $user->is_active() ? 1 : 0,
            "id"=> $user->id(),
        ];

        $this->execute($query, $parameters);
    }

    public function updateToken(User $user): void
    {
        $query = "UPDATE users SET token = :token, token_auth_date = :token_auth_date WHERE id = :id";
        $parameters = [
            "token"=> $user->token(),
            "token_auth_date"=> $user->token_auth_date()?->format("Y-m-d H:i:s"),
            "id"=> $user->id(),
        ];
        $this->execute($query, $parameters);
    }

    public function delete(int $id): void
    {
        $this->execute("DELETE FROM users WHERE id = :id", ["id" => $id]);
    }

    public function findAllActive(): array
    {
        $results = $this->execute("SELECT * FROM users WHERE is_active = 1", []);
        return array_map(fn($row) => $this->primitiveToUser($row), $results);
    }

    public function findAllPending(): array
    {
        $results = $this->execute("SELECT * FROM users WHERE is_active = 0", []);
        return array_map(fn($row) => $this->primitiveToUser($row), $results);
    }

    //Se genera un nuevo token al activar un usuario //
    public function activateUser(int $userId): void
    {
        $token = md5(uniqid((string)$userId, true));
        $tokenAuthDate = (new DateTime('+1 hour'))->format('Y-m-d H:i:s');

        $this->execute(
            "UPDATE users 
             SET is_active = 1, 
                 token = :token, 
                 token_auth_date = :token_auth_date 
             WHERE id = :id",
            [
                "id" => $userId,
                "token" => $token,
                "token_auth_date" => $tokenAuthDate
            ]
        );
    }

    //Se genera token y re-hashea contraseña si no lo estaba//
    public function authorizeAdmin(int $userId): void
    {
        $user = $this->find($userId);
        if (!$user) {
            return;
        }

        // Si la contraseña no está hasheadda se hace //
        if (!password_get_info($user->password())['algo']) {
            $hashed = password_hash($user->password(), PASSWORD_BCRYPT);
        } else {
            $hashed = $user->password();
        }

        $token = md5(uniqid((string)$userId, true));
        $tokenAuthDate = (new DateTime('+1 hour'))->format('Y-m-d H:i:s');

        $this->execute(
            "UPDATE users 
             SET role = 'admin',
                 is_active = 1,
                 password = :password,
                 token = :token,
                 token_auth_date = :token_auth_date
             WHERE id = :id",
            [
                "id" => $userId,
                "password" => $hashed,
                "token" => $token,
                "token_auth_date" => $tokenAuthDate
            ]
        );
    }

    private function primitiveToUser(?array $primitive): ?User
    {
        if (!$primitive) {
            return null;
        }

        return new User(
            (int)$primitive["id"],
            (string)$primitive["name"],
            (string)$primitive["email"],
            (string)$primitive["password"],
            $primitive["token"],
            !empty($primitive["token_auth_date"]) ? new DateTime($primitive["token_auth_date"]) : null,
            role: $primitive["role"] ?? "visitor",
            is_active: (bool)($primitive["is_active"] ?? 0)
        );
    }
}
