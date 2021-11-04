<?php 

namespace Controllers;

use MVC\Router;

class CitaController{
    public static function index(Router $router){

        if(!isset($_SESSION)){ 
            session_start(); 
        } 
        $nombre = ($_SESSION['nombre']);


        $router->render('cita/index',[
            'nombre' => $nombre
        ]);
    }

}