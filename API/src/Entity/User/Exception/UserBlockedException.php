<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserBlockedException extends Exception
{
    public function __construct(string $message = 'Usuario bloqueado por varios intentos fallidos.')
    {
        parent::__construct($message);
    }
}
