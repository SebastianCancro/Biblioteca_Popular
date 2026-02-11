<?php 

use Src\Service\User\UserTokenValidatorService;

final readonly class UserVerifyController {

    private UserTokenValidatorService $service;

    public function __construct() {
        $this->service = new UserTokenValidatorService();
    }

    public function start(): void
    {
        $token = $_SERVER["HTTP_X_API_KEY"] ?? "";
        $user = $this->service->validate($token);
        
        echo json_encode([
            "id" => $user->id(),
            "name" => $user->name(),
            "email" => $user->email(),
            "token_auth_date" => $user->token_auth_date(),
            "role" => $user->role(),
            "is_Active" => $user->is_Active()
        ]);
    }
}