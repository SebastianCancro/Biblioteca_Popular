<?php 

namespace Src\Entity\Book;

final class Book implements \JsonSerializable {

    public function __construct(
        private readonly ?int $id,
        private string $codigo,
        private string $materia,
        private string $titulo,
        private string $autor,
        private string $editorial,
        private string $edicion,
        private int $anio,
        private bool $disponibilidad,
        private bool $reservada
    ) {}

    public function id(): ?int { return $this->id; }
    public function codigo(): string { return $this->codigo; }
    public function materia(): string { return $this->materia; }
    public function titulo(): string { return $this->titulo; }
    public function autor(): string { return $this->autor; }
    public function editorial(): string { return $this->editorial; }
    public function edicion(): string { return $this->edicion; }
    public function anio(): int { return $this->anio; }
    public function disponibilidad(): bool { return $this->disponibilidad; }
    public function reservada(): bool { return $this->reservada; }

    
    public function jsonSerialize(): array {
        return [
            'id' => $this->id,
            'codigo' => $this->codigo,
            'materia' => $this->materia,
            'titulo' => $this->titulo,
            'autor' => $this->autor,
            'editorial' => $this->editorial,
            'edicion' => $this->edicion,
            'anio' => $this->anio,
            'disponibilidad' => $this->disponibilidad,
            'reservada' => $this->reservada
        ];
    }
}
