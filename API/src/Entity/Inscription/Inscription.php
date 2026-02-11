<?php 

namespace Src\Entity\Inscription;

final class Inscription {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $surname,
        private string $email,
        private int $phone
    ) {
    }

    public static function create(string $name, string $surname, string $email, int $phone): self
    {
        return new self(null, $name, $surname, $email, $phone);
    }


    public function id(): ?int
    {
        return $this->id;
    }

    public function name(): string
    {
        return $this->name;
    }

    public function surname(): string
    {
        return $this->surname;
    }

    public function email(): string
    {
        return $this->email;
    }
    public function phone(): int
    {
        return $this->phone;
    }
}