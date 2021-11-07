<?php 

namespace Controllers;

use Model\Cita;
use Model\Servicio;
use Model\CitaServicio;

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
        // Almacena la cita y devuelve el id
        $cita = new Cita($_POST);
        $resultado = $cita->guardar();

        $id = $resultado['id'];// Id de la cita creada

        // Almacena la cita y el servicio
        $idServicios = explode(",", $_POST['servicios']);
        // Iteramos egun el numero  de servicios elegidos y le ponemos la misma citaId
        foreach($idServicios as $idServicio){
            $args = [
                'citaId' => $id,
                'servicioId' => $idServicio
            ];
            $citaServicio = new CitaServicio($args); // Creamos el objeto para tabla 'citasservicios'(Pivote)
            $citaServicio->guardar(); // Guardamos en tabla 'citasservicios'
        }
        echo json_encode(['resultado' => $resultado]);
    }
}





