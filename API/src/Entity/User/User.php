<?php 

namespace Src\Entity\User;

use DateTime;

final class User {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $email,
        private string $password,
        private ?string $token,
        private ?DateTime $token_auth_date,
        private string $role,      // super_adm, admin, visitor //
        private bool $is_active    
    ) {
    }

    // Método para crear un nuevo usuario //
    public static function create(
        string $name,
        string $email,
        string $password,
        string $role,
        bool $is_active = true,
        ?string $token = null,
        ?DateTime $token_auth_date = null
    ): self {
        return new self(
            null,
            $name,
            $email,
            password_hash($password, PASSWORD_BCRYPT),
            $token,
            $token_auth_date,
            $role,
            $is_active
        );
    }

    // Método para modificar datos de un usuario existente//
    public function modify(
        string $name,
        string $email,
        string $role,
        bool $is_active,
        ?string $password = null
    ): void {
        $this->name = $name;
        $this->email = $email;
        $this->role = $role;
        $this->is_active = $is_active;

        if ($password !== null) {
            $this->password = password_hash($password, PASSWORD_BCRYPT);
        }
    }

    // Getters //
    public function id(): ?int
    {
        return $this->id;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function email(): string
    {
        return $this->email;
    }

    public function password(): string
    {
        return $this->password;
    }

    public function token(): ?string
    {
        return $this->token;
    }

    public function token_auth_date(): ?DateTime
    {
        return $this->token_auth_date;
    }

    // Generar un token de sesión //
    public function generateToken(): void
    {
        $this->token = md5($this->email . $this->id . rand(1000, 9999) . date("YmdHis"));
        $this->token_auth_date = new DateTime("+1 hours");
    }

    // Rol y estado //
    public function role(): string
    {
        return $this->role;
    }

    public function is_active(): bool
    {
        return $this->is_active;
    }
}
