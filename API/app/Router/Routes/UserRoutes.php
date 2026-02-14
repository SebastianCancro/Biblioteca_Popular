<?php 

declare(strict_types=1);

final readonly class UserRoutes
{
    public static function getRoutes(): array
    {
        return [
            // Login (solo usuarios activos pueden loguearse) //
            [
                'name'=> 'user_login',
                'url' => '/users/login',
                'controller'=> 'User/UserLoginController.php',
                'method'=> 'POST',
            ],

            // Registro (queda pendiente)//
            [
                'name'=> 'user_register',
                'url'=> '/users/register',
                'controller'=> 'User/UserRegisterController.php',
                'method'=> 'POST',
            ],

            // Listas //
            [
                'name'=> 'user_list_active',
                'url' => '/users/active',
                'controller'=> 'User/UserListActiveController.php',
                'method'=> 'GET',
            ],
            [
                'name' => 'user_list_pending',
                'url'=> '/users/pending',
                'controller' => 'User/UserListPendingController.php',
                'method'=> 'GET',
            ],
            [
                'name'=> 'user_list_blocked',
                'url'=> '/users/blocked',
                'controller' => 'User/UserListBlockedController.php',
                'method'=> 'GET',
            ],

            // Buscar por email //
            [
                'name'=> 'user_search_by_email',
                'url'=> '/users/search/{email}',
                'controller' => 'User/UserSearchByEmailController.php',
                'method'=> 'GET',
                'parameters' => [
                    ['name' => 'email', 'type' => 'string'],
                ],
            ],

            // Obtener por id //
            [
                'name' => 'user_get',
                'url' => '/users/{id}',
                'controller' => 'User/UserGetController.php',
                'method'=> 'GET',
                'parameters'=> [
                    ['name'=> 'id', 'type' => 'int'],
                ],
            ],
            // Actualizar //
            [
                'name'=> 'user_update',
                'url'=> '/users/{id}',
                'controller' => 'User/UserUpdateController.php',
                'method'=> 'PUT',
                'parameters' => [
                    ['name' => 'id', 'type' => 'int'],
                ],
            ],

            // Eliminar//
            [
                'name' => 'user_delete',
                'url'=> '/users/{id}',
                'controller' => 'User/UserDeleteController.php',
                'method' => 'DELETE',
                'parameters' => [
                    ['name' => 'id', 'type' => 'int'],
                ],
            ],

            // Aprobar (visitor -> admin + activar) //
            [
                'name'=> 'user_approve',
                'url' => '/users/approve/{id}',
                'controller' => 'User/UserApproveController.php',
                'method' => 'PUT',
                'parameters' => [
                    ['name' => 'id', 'type' => 'int'],
                ],
            ],

            // Verificar token //
            [
                'name'=> 'user_verify',
                'url' => '/users/verify',
                'controller' => 'User/UserVerifyController.php',
                'method'=> 'GET',
            ],
        ];
    }
}
