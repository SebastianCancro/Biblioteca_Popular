<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserNotFoundException extends Exception
{
    public function __construct(int|string $idOrEmail)
    {
        $msg = is_int($idOrEmail)
            ? "Usuario no encontrado (id: {$idOrEmail})."
            : "Usuario no encontrado (email: {$idOrEmail}).";
        parent::__construct($msg);
    }
}
