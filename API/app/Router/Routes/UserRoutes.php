<?php 

final readonly class UserRoutes {
    public static function getRoutes(): array {
        return [
            // Login, solo usuarios activos pueden loguearse //
            [
                "name" => "user_login",
                "url" => "/users/login",
                "controller" => "User/UserLoginController.php",
                "method" => "POST"
            ],

            // Registro, cualquier persona se registra, queda pendiente //
            [
                "name" => "user_register",
                "url" => "/users/register",
                "controller" => "User/UserRegisterController.php",
                "method" => "POST"
            ],

            // Lista usuarios activos //
            [
                "name" => "user_list_active",
                "url" => "/users/active",
                "controller" => "User/UserListActiveController.php",
                "method" => "GET"
            ],

            // Lista usuarios pendientes //
            [
                "name" => "user_list_pending",
                "url" => "/users/pending",
                "controller" => "User/UserListPendingController.php",
                "method" => "GET"
            ],

            // Obtener usuario por id //
            [
                "name" => "user_get",
                "url" => "/users/{id}",
                "controller" => "User/UserGetController.php",
                "method" => "GET",
                "parameters" => [
                    ["name" => "id", "type" => "int"]
                ]
            ],

            // Actualizar usuario //
            [
                "name" => "user_update",
                "url" => "/users/{id}",
                "controller" => "User/UserUpdateController.php",
                "method" => "PUT",
                "parameters" => [
                    ["name" => "id", "type" => "int"]
                ]
            ],

            // Eliminar usuario //
            [
                "name" => "user_delete",
                "url" => "/users/{id}",
                "controller" => "User/UserDeleteController.php",
                "method" => "DELETE",
                "parameters" => [
                    ["name" => "id", "type" => "int"]
                ]
            ],

            // Aprobar usuario pendiente solo super_adm //
            [
                "name" => "user_approve",
                "url" => "/users/approve/{id}", 
                "controller" => "User/UserApproveController.php",
                "method" => "PUT",
                "parameters" => [
                    ["name" => "id", "type" => "int"] 
                ]
            ],

            // Buscar usuario por email //
            [
                "name" => "user_search_by_email",
                "url" => "/users/search/{email}",
                "controller" => "User/UserSearchByEmailController.php",
                "method" => "GET",
                "parameters" => [
                    ["name" => "email", "type" => "string"]
                ]
            ],

            // Promover usuario a admin //
            [
                "name" => "user_promote_admin",
                "url" => "/users/promote/{id}",
                "controller" => "User/UserAuthorizeAdminController.php",
                "method" => "PUT",
                "parameters" => [
                    ["name" => "id", "type" => "int"]
                ]
            ],
        ];
    }
}
