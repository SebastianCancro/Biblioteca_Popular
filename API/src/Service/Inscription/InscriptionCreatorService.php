<?php
declare(strict_types=1);

namespace Src\Service\Inscription;

use Src\Infrastructure\Repository\Inscription\InscriptionRepository;
use Src\Entity\Inscription\Inscription;
use Src\Entity\Inscription\Exception\InscriptionAlreadyExistsException;
use Src\Entity\Inscription\Exception\InvalidEmailException;

final readonly class InscriptionCreatorService
{
    private InscriptionRepository $repository;

    public function __construct()
    {
        $this->repository = new InscriptionRepository();
    }
    // Creo una nueva inscripcion. //
    public function create(array $data): Inscription
    {
        $name = trim((string)($data['name'] ?? ''));
        $surname = trim((string)($data['surname'] ?? ''));
        $email = strtolower(trim((string)($data['email'] ?? '')));
        $phone = (int)($data['phone'] ?? 0);
        $id_event = (int)($data['id_event'] ?? '');

        // Validaciones basicas //
        if ($name === '') {
            throw new \InvalidArgumentException('El nombre es obligatorio');
        }
        if ($surname === '') {
            throw new \InvalidArgumentException('El apellido es obligatorio');
        }
        if ($phone === 0) {
            throw new \InvalidArgumentException('El teléfono es obligatorio');
        }
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            // le paso el mail para que la exception lo pueda mostrar//
            throw new \InvalidArgumentException('El email no es válido');
        }
       // Verifico la inscripcion ya existe //
        if ($this->repository->exists($email, $id_event)) {
            throw new \InvalidArgumentException('Ya está inscripto a este evento');
        }
        try {
            $inscription = Inscription::create($name, $surname, $email, $phone, $id_event);
            $this->repository->insert($inscription);
            return $inscription;
        } catch (\Throwable $e) {
            if (
                ($e instanceof \PDOException && $e->getCode() === '23000')
                || str_contains($e->getMessage(), 'Duplicate entry')
                || str_contains($e->getMessage(), 'UNIQUE')
                || str_contains($e->getMessage(), 'unique')
            ) {
                throw new \InvalidArgumentException('Ya está inscripto a este evento');
            }
            throw $e;
        }
    }
}
