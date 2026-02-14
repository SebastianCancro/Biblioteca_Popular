<?php 

include_once "Route.php";
include_once "Router.php";

function startRouter(): Router 
{
    $routes = [];

    include_once "Routes/DomainRoutes.php";
    $routes = array_merge($routes, DomainRoutes::getRoutes());

    include_once "Routes/UserRoutes.php";
    $routes = array_merge($routes, UserRoutes::getRoutes());

    include_once "Routes/FileRoutes.php";
    $routes = array_merge($routes, FileRoutes::getRoutes());
    
    include_once "Routes/ArticleRoutes.php";
    $routes = array_merge($routes, ArticleRoutes::getRoutes());

    include_once "Routes/InscriptionRoutes.php";
    $routes = array_merge($routes, InscriptionRoutes::getRoutes());
    
    include_once "Routes/EventRoutes.php";
    $routes = array_merge($routes, EventRoutes::getRoutes());

    include_once "Routes/BookRoutes.php";
    $routes = array_merge($routes, BookRoutes::getRoutes());

    $routesClass = [];
    foreach ($routes as $route) {
        $routesClass[] = Route::fromArray($route);
    }

    return new Router($routesClass);
}