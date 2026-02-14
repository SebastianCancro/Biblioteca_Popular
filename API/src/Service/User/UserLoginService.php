<?php
declare(strict_types=1);

namespace Src\Service\User;

use Src\Infrastructure\Repository\User\UserRepository;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Entity\User\Exception\UserInvalidCredentialsException;
use Src\Entity\User\Exception\UserBlockedException;
use Src\Entity\User\Exception\UserPendingApprovalException;

final readonly class UserLoginService
{
    //Limites de intentos fallidos//
    private const MAX_ATTEMPTS_SOFT = 5; // bloqueo por tiempo //
    private const MAX_ATTEMPTS_HARD = 10; // bloqueo permanente //
    private const SOFT_BLOCK_MIN    = 15; // minutos de bloqueo por tiempo //

    private UserRepository $repository;
    private UserFinderByEmailService $finder;

    public function __construct()
    {
        $this->repository = new UserRepository();
        $this->finder= new UserFinderByEmailService();
    }
    // Login de un usuario con imail y contrseña//
    public function login(string $email, string $password, ?string $clientIp = null): array
    {
        $email    = strtolower(trim($email));
        $clientIp = $clientIp ?? '0.0.0.0';
        //Busca el usuario por email //
        try {
            $user = $this->finder->find($email);
        } catch (UserNotFoundException) {
            throw new UserInvalidCredentialsException();
        }
        //Bloqueo permanente //
        if ($user->is_blocked()) {
            throw new UserBlockedException();
        }
        //Limpio el bloqueo si el tiempo ya se vencio//
        $this->repository->clearSoftBlockIfExpired((int)$user->id());
        //Bloqueo por tiempo//
        if ($this->repository->isSoftBlocked((int)$user->id())) {
            throw new UserBlockedException();
        }
        // Usuario pendiente //
        if (!$user->is_active()) {
            throw new UserPendingApprovalException();
        }
        //Verifico contraseña//
        if (!password_verify($password, $user->password())) {
            // Registrar fallo POR IP y aplicar reglas 5/10 //
            $this->repository->registerFailedAttemptAtomic(
                (int)$user->id(),
                $clientIp,
                self::MAX_ATTEMPTS_SOFT,
                self::MAX_ATTEMPTS_HARD,
                self::SOFT_BLOCK_MIN
            );
            // Verifico bloqueos //
            if ($this->repository->isHardBlocked((int)$user->id())) {
                throw new UserBlockedException(); // bloqueo permanenete//
            }
            if ($this->repository->isSoftBlocked((int)$user->id())) {
                throw new UserBlockedException(); // bloqueo por tiempo //
            }
            throw new UserInvalidCredentialsException();
        }
        //Login exitoso resetear yu emitir token //
        $this->repository->resetFailedAttempts((int)$user->id());
        $user->generateToken();
        $this->repository->updateToken($user);
        // Devuelvo los datos //
        return [
            'status'=> 200,
            'message'=> 'Login exitoso.',
            'token'=> $user->token(),
            'user'=> [
                'id'=> $user->id(),
                'name'=> $user->name(),
                'apellido'=> $user->apellido(),
                'dni'=> $user->dni(),
                'email'=> $user->email(),
                'role'=> $user->role(),
                'token'=> $user->token(),
            ],
        ];
    }
}
