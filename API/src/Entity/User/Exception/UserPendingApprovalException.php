<?php 

namespace Src\Entity\User\Exception;

use Exception;

final class UserPendingApprovalException extends Exception
{
    public function __construct(string $message = 'El usuario tiene la solicitud pendiente de aprobación por un administrador/a.')
    {
        parent::__construct($message);
    }
}
