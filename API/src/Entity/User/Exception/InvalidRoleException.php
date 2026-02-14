<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class InvalidRoleException extends Exception
{
    public function __construct(string $role)
    {
        parent::__construct("Rol inválido: {$role}");
    }
}
