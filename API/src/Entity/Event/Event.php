<?php 

namespace Src\Entity\Event;
use DateTime;

final class Event {

    public function __construct(
        private readonly ?int $id,
        private string $title,
        private string $description,
        private string $image,
        private ?DateTime $end_date,
        private bool $is_active,
        private bool $deleted
    ) {
    }

    public static function create(string $title, string $description, string $image, ?DateTime $end_date = null, bool $is_active = true): self
    {
        return new self(null, $title, $description, $image,$end_date, $is_active, false);
    }

    public function modify(string $title, string $description, string $image,?DateTime $end_date, bool $is_active =true): void
    {
        $this->title = $title;
        $this->description = $description;
        $this->image = $image;
        $this->end_date = $end_date;
        $this->is_active = $is_active;
    }


    public function id(): ?int
    {
        return $this->id;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function description(): string
    {
        return $this->description;
    }

    public function image(): string
    {
        return $this->image;
    }

    public function endDate(): ?DateTime
    {
        return $this->end_date;
    }

    public function is_active(): bool
    {
        return $this->is_active;
    }
    public function delete(): void
    {
        $this->deleted = true;
    }
    public function isDeleted(): bool
    {
        return $this->deleted;
    }
}