<?php 

namespace Src\Service\User;

use Src\Entity\User\Exception\UserAlreadyExistsException;
use Src\Entity\User\User;
use Src\Infrastructure\Repository\User\UserRepository;

final readonly class UserCreatorService {
    private UserRepository $repository;
    private UserFinderByEmailService $userFinderByEmailService;

    public function __construct() {
        $this->repository = new UserRepository();
        $this->userFinderByEmailService = new UserFinderByEmailService();
    }

    //Crea un nuevo usuario como pendiente (is_active = false por defecto)//
    //Queda a la espera de que un super_adm lo apruebe //
    public function create(
        string $name, 
        string $email, 
        string $password,
        string $role = 'visitor' 
    ): void {
        //Verificar si ya existe un usuario con el mismo correo//
        $user = $this->userFinderByEmailService->find($email);

        if (!empty($user)) {
            throw new UserAlreadyExistsException($email);
        }
        // Usuario pendiente por defecto //
        $user = User::create($name, $email, $password, $role, false);

        // Guardar en base de datos //
        $this->repository->insert($user);
    }
}
