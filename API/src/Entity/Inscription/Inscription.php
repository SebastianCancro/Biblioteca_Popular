<?php 

namespace Src\Entity\Inscription;

final class Inscription {

    public function __construct(
        private readonly ?int $id,
        private string $name,
        private string $surname,
        private string $email,
        private int $phone,
        private ?int $id_event = null, 
        private ?string $event_title = null
    ) {
    }

    public static function create(string $name, string $surname, string $email, int $phone, ?int $id_event = null): self
    {
        return new self(null, $name, $surname, $email, $phone, $id_event, null);
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
    public function idEvent(): ?int
    {
        return $this->id_event;
    }
    public function eventTitle(): ?string 
    { 
        return $this->event_title; 
    }
}