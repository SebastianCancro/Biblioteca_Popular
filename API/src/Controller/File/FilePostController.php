<?php 

use Src\Middleware\AuthMiddleware;
use src\Utils\ControllerUtils;
use Src\Service\File\FileUploaderService;

final readonly class FilePostController {
    private FileUploaderService $service;
    private AuthMiddleware $auth;

    public function __construct() {
        $this->service = new FileUploaderService();
        $this->auth = new AuthMiddleware();
    }

    public function start(): void 
    {
        try {
            // Validar token y rol permitido solo 'admin' y 'super_adm' //
            $this->auth->authenticate(true, ['admin', 'super_adm']);

            // Obtener archivo del POST //
            $file = ControllerUtils::getFile("file");

            $name = $file["name"] ?? '';
            $fullPath = $file["full_path"] ?? '';
            $type = $file["type"] ?? '';
            $tmpName = $file["tmp_name"] ?? '';
            $size = $file["size"] ?? '';
            
            // Subir archivo //
            $uploadedFile = $this->service->upload($name, $fullPath, $type, $tmpName, $size);

             // Respuesta JSON //
            header('Content-Type: application/json');
            http_response_code(201);
            echo json_encode([
                "message" => "Archivo subido correctamente",
                "url" => $uploadedFile->uploadUrl(),
                "size" => $uploadedFile->size(),
                "type" => $uploadedFile->type(),
            ]);

        } catch (Exception $e) {
            // Manejar error //
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(["error" => $e->getMessage()]);
        }
    }
}
