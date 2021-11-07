<?php 

namespace Controllers;

use Model\Servicio;

class APIController{
    public static function index(){
        $servicios = Servicio::all();
        // La DB devuelve un array de objetos.
        // json_encode convierte el array en un string JSON.
        // echo devuelve un string JSON.
        // debuguear($servicios);
        echo json_encode($servicios);
    }


    // Metodo para guardar citas desde app.js
    public static function guardar(){
        $respuesta = [
            'datos' => $_POST
        ];

        echo json_encode($respuesta);
    }
}





