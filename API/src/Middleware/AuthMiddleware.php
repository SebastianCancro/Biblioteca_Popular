<?php
declare(strict_types=1);

namespace Src\Middleware;

use Src\Service\User\UserTokenValidatorService;
use Src\Entity\User\Exception\UserInvalidCredentialsException; // 401
use Src\Entity\User\Exception\UserPendingApprovalException; // 403
use Src\Entity\User\Exception\UserIsNotAuthorizedException;// 403
use Src\Entity\User\Exception\UserBlockedException; // 403

final class AuthMiddleware
{
    private UserTokenValidatorService $validator;

    public function __construct()
    {
        $this->validator = new UserTokenValidatorService();
    }
    public function authenticate(bool $required = true, array $roles = []): int
    {
        $token = $_SERVER['HTTP_X_API_KEY'] ?? null;

        // Ruta publica: si no hay token y no es requerido, dejamos pasar como invitado (id=0) //
        if (!$required && !$token) {
            return 0;
        }
        // Ruta protegida, falta token //
        if ($required && !$token) {
            throw new UserInvalidCredentialsException('Falta X-API-KEY.');
        }

        // Valida token, obtener usuario //
        $user = $this->validator->validate((string)$token);
        if (!$user) {
            throw new UserInvalidCredentialsException('Token inválido o expirado.');
        }
        // Estado de cuenta //
        if ($user->is_blocked()) {
            // usa el mensaje por defecto unificado//
            throw new UserBlockedException(); // Usuario bloqueado por varios intentos fallidos //
        }
        if (!$user->is_active()) {
            throw new UserPendingApprovalException('Usuario inactivo. Debe ser aprobado por un administrador.');
        }
         // Autorizacion por rol //
        if (!empty($roles) && !in_array($user->role(), $roles, true)) {
            throw new UserIsNotAuthorizedException('Acceso denegado: rol no autorizado.');
        }

        return (int) $user->id();
    }
}
