<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Entity\User\Exception\UserAlreadyExistsException;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Entity\User\Exception\InvalidEmailException;
use Src\Entity\User\Exception\InvalidRoleException;
use Src\Infrastructure\Repository\User\UserRepository;

final class UserUpdaterService
{
    // roles permitidos para la edicion //
    private const ALLOWED_ROLES = ['admin', 'super_adm'];
    private readonly UserRepository $repository;
    private readonly UserFinderService $finder;
    private readonly UserFinderByEmailService $finderByEmail;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder = new UserFinderService();
        $this->finderByEmail = new UserFinderByEmailService();
    }
    public function updateFromArray(int $id, array $in, ?int $actorId = null): void
    {
        $current = $this->finder->find($id);
        
        $name = array_key_exists('name', $in) && $in['name'] !== null
            ? (string) $in['name']
            : $current->name();

        $email = array_key_exists('email', $in) && $in['email'] !== null
            ? (string) $in['email']
            : $current->email();

        $password = null;

        $role = array_key_exists('role', $in) && $in['role'] !== null
            ? (string) $in['role']
            : $current->role();

        $is_active = $current->is_active();

        $apellido = array_key_exists('apellido', $in) && $in['apellido'] !== null
            ? (string) $in['apellido']
            : null;

        $dni = array_key_exists('dni', $in) && $in['dni'] !== null
            ? (string) $in['dni']
            : null;
        // Valido que super_adm no cambie su propio rol //
        if ($actorId !== null && $actorId === $id) {
            if (strtolower($current->role()) === 'super_adm' && strtolower($role) !== 'super_adm') {
                throw new InvalidRoleException('No podés cambiar tu propio rol si sos super_adm.');
            }
        }
        // Actualizacion //
        $this->update($id, $name, $email, $password, $role, $is_active, $apellido, $dni);
    }
    // Actualizo un usuario //
    public function update(
        int $id,
        string $name,
        string $email,
        ?string $password = null,
        string $role = 'admin',
        bool $is_active = true,
        ?string $apellido = null,
        ?string $dni = null
    ): void {
        // busco el usuario //
        $user = $this->finder->find($id);
        // valido email //
        $email = strtolower(trim($email));
        if ($email !== '' && !filter_var($email, FILTER_VALIDATE_EMAIL)) {
            throw new InvalidEmailException($email);
        }
        // valido rol //
        if (!in_array($role, self::ALLOWED_ROLES, true)) {
            throw new InvalidRoleException($role === '' ? '(vacío)' : $role);
        }
        // valido que no exista otro usuario con ese email //
        try {
            $other = $this->finderByEmail->find($email);
            if ($other->id() !== $id) {
                throw new UserAlreadyExistsException();
            }
        } catch (UserNotFoundException) {
        }
        // modifico el usuario //
        $user->modify($name, $email, $role, $is_active, null, $apellido, $dni);
      
        $this->repository->update($user);
    }
}
