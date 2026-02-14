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
        $query  = "SELECT * FROM users WHERE id = :id LIMIT 1";
        $result = $this->execute($query, ['id' => $id]);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByEmail(string $email): ?User
    {
        $query  = "SELECT * FROM users WHERE LOWER(email) = :email LIMIT 1";
        $params = ['email' => strtolower(trim($email))];
        $result = $this->execute($query, $params);
        return $this->primitiveToUser($result[0] ?? null);
    }

    public function findByDni(string $dni): ?User
    {
        $query = "SELECT * FROM users WHERE dni = :dni LIMIT 1";
        $rows  = $this->execute($query, ['dni' => trim($dni)]);
        return $this->primitiveToUser($rows[0] ?? null);
    }

    public function findByToken(string $token): ?User
    {
        $query = "SELECT * FROM users
                  WHERE token = :token
                    AND :now <= token_auth_date
                    AND is_active = 1
                    AND (is_blocked = 0 OR is_blocked IS NULL)
                  LIMIT 1";

        $params = [
            'token' => $token,
            'now'   => date('Y-m-d H:i:s'),
        ];

        $result = $this->execute($query, $params);
        return $this->primitiveToUser($result[0] ?? null);
    }
    public function insert(User $user): void
    {
        $query = <<<SQL
            INSERT INTO users (
                name, apellido, dni, email, password, token, role,
                is_active, is_blocked, token_auth_date, failed_attempts
            )
            VALUES (
                :name, :apellido, :dni, :email, :password, :token, :role,
                :is_active, :is_blocked, :token_auth_date, :failed_attempts
            )
        SQL;

        $params = [
            'name' => $user->name(),
            'apellido' => $user->apellido(),
            'dni'=> $user->dni(),
            'email'=> $user->email(),
            'password'=> $user->password(),
            'token'=> $user->token(),
            'role'=> $user->role(),
            'is_active'=> $user->is_active() ? 1 : 0,
            'is_blocked'=> $user->is_blocked() ? 1 : 0,
            'token_auth_date'=> $user->token_auth_date()?->format('Y-m-d H:i:s'),
            'failed_attempts'=> 0,
        ];

        $this->execute($query, $params);
    }
    public function create(array $fields): User
    {
        $role = $fields['role'] ?? 'visitor';

        $sql = "INSERT INTO users (name, apellido, dni, email, password, role, is_active, is_blocked)
                VALUES (:name, :apellido, :dni, :email, :password, :role, :is_active, :is_blocked)";

        $this->execute($sql, [
            'name' => $fields['name'],
            'apellido'=> $fields['apellido'],
            'dni' => $fields['dni'],
            'email' => $fields['email'],
            'password'=> $fields['password'],
            'role'=> $role,
            'is_active'=> (int)($fields['is_active'] ?? 0),
            'is_blocked'=> (int)($fields['is_blocked'] ?? 0),
        ]);

        $user = $this->findByEmail($fields['email']);
        if (!$user) {
            throw new \RuntimeException('No se pudo recuperar el usuario recién creado.');
        }
        return $user;
    }
    public function update(User $user): void
    {
        $query = <<<SQL
            UPDATE users
            SET name = :name,
                apellido = :apellido,
                dni = :dni,
                email = :email,
                password = :password,
                token = :token,
                token_auth_date = :token_auth_date,
                role = :role,
                is_active = :is_active,
                is_blocked = :is_blocked
            WHERE id = :id
        SQL;

        $params = [
            'name' => $user->name(),
            'apellido'=> $user->apellido(),
            'dni'=> $user->dni(),
            'email'=> $user->email(),
            'password'=> $user->password(),
            'token'=> $user->token(),
            'token_auth_date' => $user->token_auth_date()?->format('Y-m-d H:i:s'),
            'role'=> $user->role(),
            'is_active'=> $user->is_active() ? 1 : 0,
            'is_blocked'=> $user->is_blocked() ? 1 : 0,
            'id'=> $user->id(),
        ];

        $this->execute($query, $params);
    }
    public function updateToken(User $user): void
    {
        $query = "UPDATE users
                  SET token = :token, token_auth_date = :token_auth_date
                  WHERE id = :id";

        $this->execute($query, [
            'token'=> $user->token(),
            'token_auth_date' => $user->token_auth_date()?->format('Y-m-d H:i:s'),
            'id'=> $user->id(),
        ]);
    }
    public function delete(int $id): void
    {
        $this->execute('DELETE FROM users WHERE id = :id', ['id'=> $id]);
    }
    public function findAllActive(): array
    {
        $rows = $this->execute(
            "SELECT * FROM users
             WHERE is_active = 1
               AND (is_blocked = 0 OR is_blocked IS NULL)"
        );
        return array_map(fn ($r) => $this->primitiveToUser($r), $rows);
    }
    public function findAllPending(): array
    {
        $rows = $this->execute("SELECT * FROM users WHERE is_active = 0");
        return array_map(fn ($r) => $this->primitiveToUser($r), $rows);
    }
    public function findAllBlocked(): array
    {
        $rows = $this->execute("SELECT * FROM users WHERE is_blocked = 1");
        return array_map(fn ($r) => $this->primitiveToUser($r), $rows);
    }
    public function activateUser(int $userId): void
    {
        $user = $this->find($userId);
        if (!$user) {
            return;
        }

        $user->activate();

        $this->execute(
            "UPDATE users
             SET is_active = 1,
                 is_blocked = 0,
                 failed_attempts = 0,
                 token = :token,
                 token_auth_date = :token_auth_date
             WHERE id = :id",
            [
                'id'=> $userId,
                'token'=> $user->token(),
                'token_auth_date'=> $user->token_auth_date()?->format('Y-m-d H:i:s'),
            ]
        );
    }
    public function authorizeAdmin(int $userId): void
    {
        $user = $this->find($userId);
        if (!$user) {
            return;
        }

        $user->promoteToAdmin();

        $this->execute(
            "UPDATE users
             SET role = 'admin',
                 is_active = 1,
                 is_blocked = 0,
                 failed_attempts = 0,
                 password = :password,
                 token = :token,
                 token_auth_date = :token_auth_date
             WHERE id = :id",
            [
                'id'=> $userId,
                'password'=> $user->password(),
                'token'=> $user->token(),
                'token_auth_date'=> $user->token_auth_date()?->format('Y-m-d H:i:s'),
            ]
        );
    }
    public function updateRole(int $userId, string $role): void
    {
        $this->execute(
            "UPDATE users SET role = :role WHERE id = :id",
            ['id' => $userId, 'role' => $role]
        );
    }
    public function incrementFailedAttempts(int $userId): void
    {
        $this->execute(
            "UPDATE users SET failed_attempts = failed_attempts + 1 WHERE id = :id",
            ['id' => $userId]
        );
    }
    public function resetFailedAttempts(int $userId): void
    {
        $this->execute(
            "UPDATE users
             SET failed_attempts = 0,
                 failed_ip = NULL,
                 soft_block_until = NULL
             WHERE id = :id",
            ['id' => $userId]
        );
    }
    public function getFailedAttempts(int $userId): int
    {
        $rows = $this->execute(
            "SELECT failed_attempts FROM users WHERE id = :id",
            ['id' => $userId]
        );
        return !empty($rows) ? (int)$rows[0]['failed_attempts'] : 0;
    }

    public function blockUser(int $userId): void
    {
        $this->execute(
            "UPDATE users SET is_blocked = 1 WHERE id = :id",
            ['id' => $userId]
        );
    }
    public function clearSoftBlockIfExpired(int $userId): void
    {
        $this->execute(
            "UPDATE users
             SET soft_block_until = NULL
             WHERE id = :id
               AND soft_block_until IS NOT NULL
               AND NOW() >= soft_block_until",
            ['id' => $userId]
        );
    }
    public function isSoftBlocked(int $userId): bool
    {
        $rows = $this->execute(
            "SELECT soft_block_until FROM users WHERE id = :id LIMIT 1",
            ['id' => $userId]
        );

        if (!$rows || empty($rows[0]['soft_block_until'])) {
            return false;
        }

        return (new \DateTimeImmutable($rows[0]['soft_block_until'])) > new \DateTimeImmutable('now');
    }
    public function isHardBlocked(int $userId): bool
    {
        $rows = $this->execute(
            "SELECT is_blocked FROM users WHERE id = :id LIMIT 1",
            ['id' => $userId]
        );
        return (bool)($rows[0]['is_blocked'] ?? 0);
    }
    public function registerFailedAttemptAtomic(
        int $userId,
        string $ip,
        int $softThreshold,
        int $hardThreshold,
        int $softMinutes
    ): void {
        $query = <<<SQL
            UPDATE users
            SET
              failed_attempts = IF(failed_ip = :ip, failed_attempts + 1, 1),
              failed_ip = :ip,
              soft_block_until = CASE
                WHEN MOD(IF(failed_ip = :ip, failed_attempts + 1, 1), :soft) = 0
                  THEN DATE_ADD(NOW(), INTERVAL :mins MINUTE)
                ELSE soft_block_until
              END,
              is_blocked = CASE
                WHEN IF(failed_ip = :ip, failed_attempts + 1, 1) >= :hard
                  THEN 1
                ELSE is_blocked
              END
            WHERE id = :id
            LIMIT 1
        SQL;

        $this->execute($query, [
            'ip'=> $ip,
            'soft'=> $softThreshold,
            'hard'=> $hardThreshold,
            'mins'=> $softMinutes,
            'id'=> $userId,
        ]);
    }
    private function primitiveToUser(?array $primitive): ?User
    {
        if (!$primitive) {
            return null;
        }

        return new User(
            (int)$primitive['id'],
            (string)$primitive['name'],
            (string)($primitive['apellido'] ?? ''),
            (string)($primitive['dni'] ?? ''),
            (string)$primitive['email'],
            (string)$primitive['password'],
            $primitive['token'],
            !empty($primitive['token_auth_date'])
                ? new DateTime($primitive['token_auth_date'])
                : null,
            $primitive['role'] ?? 'visitor',
            (bool)($primitive['is_active'] ?? 0),
            (bool)($primitive['is_blocked'] ?? 0)
        );
    }
}
