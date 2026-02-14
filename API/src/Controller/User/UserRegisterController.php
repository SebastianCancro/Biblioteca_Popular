<?php
declare(strict_types=1);

use Src\Service\User\UserCreatorService;
use Src\Entity\User\Exception\UserAlreadyExistsException;
use Src\Entity\User\Exception\InvalidEmailException;
use Src\Utils\ControllerUtils;

// Controlador para registrar un nuevo usuario //
final readonly class UserRegisterController
{
    public function __construct(
        private UserCreatorService $service = new UserCreatorService(),
    ) {}

    public function start(): void
    {
        header('Content-Type: application/json; charset=utf-8');
        if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
            header('Allow: POST');
            http_response_code(405);
            echo json_encode(['error' => 'Método no permitido']);
            return;
        }
        // Obtener datos del POST //
        $payload = [
            'name'=> trim((string)(ControllerUtils::getPost('name', false) ?? ($_POST['name'] ?? ''))),
            'apellido'=> trim((string)(ControllerUtils::getPost('apellido', false) ?? ($_POST['apellido'] ?? ''))),
            'dni'=> trim((string)(ControllerUtils::getPost('dni', false) ?? ($_POST['dni'] ?? ''))),
            'email'=> trim((string)(ControllerUtils::getPost('email', false) ?? ($_POST['email'] ?? ''))),
            'password' => (string)(ControllerUtils::getPost('password', false) ?? ($_POST['password'] ?? '')),
        ];

        try {
            // Crear usuario //
            $this->service->create($payload);

            http_response_code(201);
            echo json_encode([
                'message' => 'Usuario registrado. Pendiente de aprobación por un administrador.',
                'pending' => true,
            ], JSON_UNESCAPED_UNICODE);

        } catch (UserAlreadyExistsException) {
            http_response_code(409);
            echo json_encode(['error' => 'Ya existe un usuario con ese email.'], JSON_UNESCAPED_UNICODE);

        } catch (InvalidEmailException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);

        } catch (\InvalidArgumentException $e) {
            http_response_code(422);
            echo json_encode(['error' => $e->getMessage()], JSON_UNESCAPED_UNICODE);

        } catch (\Throwable $e) {
            http_response_code(400);
            echo json_encode([
                'error'  => 'Error al registrar.',
                'detail' => $e->getMessage()
            ], JSON_UNESCAPED_UNICODE);
        }
    }
}
