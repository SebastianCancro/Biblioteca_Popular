<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserIsNotAuthorizedException extends Exception
{
    public function __construct(string $message = 'El usuario no se encuentra autorizado.')
    {
        parent::__construct($message);
    }
}
