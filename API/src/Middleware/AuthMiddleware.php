<?php

declare(strict_types=1);

namespace Src\Middleware;

use Src\Service\User\UserTokenValidatorService;
use Exception;

final class AuthMiddleware
{
    private UserTokenValidatorService $validator;

    public function __construct()
    {
        $this->validator = new UserTokenValidatorService();
    }
    public function authenticate(bool $required = true, array $roles = []): int
    {
        // busca el token que viene del header //
        $token = $_SERVER['HTTP_X_API_KEY'] ?? null;

        // si el endpoint pide token y no hay, tira error //
        if ($required && !$token) {
            throw new Exception("Token requerido para acceder a este recurso.");
        }

        // si el endpoint es público y no vino token, dejamos seguir como visitante) //
        if (!$required && !$token) {
            return 0;
        }

        // valida el token //
        $user = $this->validator->validate($token);

        // si no encuentra usuario o el token está vencido, lanza error //
        if (!$user) {
            throw new Exception("Token inválido o expirado.");
        }

        // si el usuario todavía no fue activado (pendiente de aprobación) //
        if (!$user->is_active()) {
            throw new Exception("Usuario inactivo. Debe ser aprobado por un administrador.");
        }

        // si se pasaron roles y el usuario no está en la lista, tira error //
        if (!empty($roles) && !in_array($user->role(), $roles, true)) {
            throw new Exception("Acceso denegado: rol no autorizado ({$user->role()}).");
        }

        // si todo ok devuelve el id del usuario logueado //
        return $user->id();
    }
}
