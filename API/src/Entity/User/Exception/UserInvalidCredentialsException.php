<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserInvalidCredentialsException extends Exception
{
    public function __construct(string $message = 'Credenciales inválidas.')
    {
        parent::__construct($message);
    }
}
