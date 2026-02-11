<?php 

namespace Src\Entity\Article;
use DateTime;

final class Article {

    public function __construct(
        private readonly ?int $id,
        private string $title,
        private string $image,
        private ?DateTime $date,
        private string $body,
        private bool $deleted
    ) {
    }

    public static function create(string $title, string $image, string $body): self
    {
        return new self(null, $title, $image,new DateTime("now"), $body, false);
    }

    public function modify(string $title, string $image, string $body): void
    {
        $this->title = $title;
        $this->image = $image;
        $this->body = $body;
    }

    public function delete(): void
    {
        $this->deleted = true;
    }

    public function id(): ?int
    {
        return $this->id;
    }

    public function title(): string
    {
        return $this->title;
    }

    public function image(): string
    {
        return $this->image;
    }

    public function body(): string
    {
        return $this->body;
    }
    public function date(): DateTime
    {
        return $this->date;
    }
    public function isDeleted(): bool
    {
        return $this->deleted;
    }
}