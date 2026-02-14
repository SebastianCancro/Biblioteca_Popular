<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class InvalidEmailException extends Exception
{
    public function __construct(string $email = '')
    {
        $msg = $email !== '' ? "Email inválido: {$email}" : "Email inválido.";
        parent::__construct($msg);
    }
}
