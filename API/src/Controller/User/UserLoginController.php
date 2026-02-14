<?php
declare(strict_types=1);

use Src\Service\User\UserLoginService;
use Src\Entity\User\Exception\UserBlockedException;
use Src\Entity\User\Exception\UserInvalidCredentialsException;
use Src\Entity\User\Exception\UserNotFoundException;
use Src\Entity\User\Exception\UserPendingApprovalException;

final class UserLoginController
{
    public function start(...$args)
    {
        return $this->login();
    }

    public function login()
    {
        header('Content-Type: application/json; charset=utf-8');

        $email = '';
        $password = '';

        $raw  = file_get_contents('php://input');
        $data = $raw ? json_decode($raw, true) : null;

        if (is_array($data)) {
            $email    = strtolower(trim($data['email'] ?? ''));
            $password = $data['password'] ?? '';
        } else {
            $email    = strtolower(trim($_POST['email'] ?? ''));
            $password = $_POST['password'] ?? '';
        }

        $service = new UserLoginService();

        // Obtengo la IP del usuario //
        $xff = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? '';
        $ip  = $xff ? trim(explode(',', $xff)[0]) : ($_SERVER['REMOTE_ADDR'] ?? '0.0.0.0');

        try {
            // Paso la IP a servicio //
            $payload = $service->login($email, $password, $ip);

            http_response_code(200);
            echo json_encode($payload, JSON_UNESCAPED_UNICODE);

        } catch (UserPendingApprovalException $e) {
            // Pendiente de aprobacion //
            http_response_code(401);
            echo json_encode([
                'status'  => 401,
                'code'    => 'USER_PENDING_APPROVAL',
                'message' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);

        } catch (UserBlockedException $e) {
            // Usuario bloqueado //
            http_response_code(423);
            echo json_encode([
                'status'  => 423,
                'code'    => 'USER_BLOCKED',
                'message' => $e->getMessage() ?: 'Usuario bloqueado por varios intentos fallidos.',
            ], JSON_UNESCAPED_UNICODE);

        } catch (UserInvalidCredentialsException|UserNotFoundException $e) {
            http_response_code(401);
            echo json_encode([
                'status'  => 401,
                'code'    => 'INVALID_CREDENTIALS',
                'message' => $e->getMessage(),
            ], JSON_UNESCAPED_UNICODE);

        } catch (\Throwable $e) {
            http_response_code(500);
            echo json_encode([
                'status'  => 500,
                'message' => 'Ocurrió un error inesperado.',
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
