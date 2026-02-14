<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserAlreadyExistsException extends Exception
{
    public function __construct(string $message = 'El email ingresado ya se encuentra en uso.')
    {
        parent::__construct($message);
    }
}
