<?php 

namespace Src\Entity\User;

use DateTime;

final class User
{
    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $apellido,            
        private string $dni,                 
        private string $email,
        private string $password,
        private ?string $token,
        private ?DateTime $token_auth_date,
        private string $role, // super_adm, admin, visitor //
        private bool $is_active,
        private bool $is_blocked = false
    ) {}

    // Crear un nuevo usuario //
    public static function create(
        string $name,
        string $email,
        string $password,
        string $role,
        bool $is_active = true,
        ?string $token = null,
        ?DateTime $token_auth_date = null,
        string $apellido = '',
        string $dni = ''
    ): self {
        $token ??= self::generateTokenValue();
        $token_auth_date ??= new DateTime("+1 hour");

        return new self(
            null,
            $name,
            $apellido,
            $dni,
            $email,
            password_hash($password, PASSWORD_BCRYPT),
            $token,
            $token_auth_date,
            $role,
            $is_active,
            false
        );
    }

    // Modificar datos de un usuario existente //
    public function modify(
        string $name,
        string $email,
        string $role,
        bool $is_active,
        ?string $password = null,
        ?string $apellido = null,
        ?string $dni = null
    ): void {
        $this->name = $name;
        $this->email = $email;
        $this->role = $role;
        $this->is_active = $is_active;

        if ($password !== null) {
            $this->password = password_hash($password, PASSWORD_BCRYPT);
        }
        if ($apellido !== null) {
            $this->apellido = $apellido;
        }
        if ($dni !== null) {
            $this->dni = $dni;
        }
    }

    public function generateToken(): void
    {
        $this->token = self::generateTokenValue();
        $this->token_auth_date = new DateTime("+1 hour");
    }

    public function activate(): void
    {
        $this->is_active = true;
        $this->generateToken();
    }

    public function promoteToAdmin(): void
    {
        $this->role = 'admin';
        $this->activate();
    }

    public function promoteToSuperAdm(): void
    {
        $this->role = 'super_adm';
        $this->activate();
    }

    // Getters//
    public function id(): ?int { return $this->id; }
    public function name(): string { return $this->name; }
    public function apellido(): string { return $this->apellido; }
    public function dni(): string { return $this->dni; }
    public function email(): string { return $this->email; }
    public function password(): string { return $this->password; }
    public function token(): ?string { return $this->token; }
    public function token_auth_date(): ?DateTime { return $this->token_auth_date; }
    public function role(): string { return $this->role; }
    public function is_active(): bool { return $this->is_active; }
    public function is_blocked(): bool { return $this->is_blocked; }

    private static function generateTokenValue(): string
    {
        return md5(uniqid('', true));
    }

    public function toArray(): array
    {
        return [
            "id"=> $this->id(),
            "name"=> $this->name(),
            "apellido"=> $this->apellido(),
            "dni" => $this->dni(),
            "email"=> $this->email(),
            "role"=> $this->role(),
            "is_active" => $this->is_active(),
            "is_blocked" => $this->is_blocked(),
        ];
    }
}
