<?php 

namespace Model;

class AdminCita extends ActiveRecord{

    protected static $tabla="citasservicios";
    protected static $columnasDB =['id','hora','cliente','email','telefono','servicio','precio'];

    public $id;
    public $hora;
    public $cliente;
    public $email;
    public $telefono;
    public $servicio;
    public $precio;    
    
    public function __construct($id,$hora,$cliente,$email,$telefono,$servicio,$precio)
    {
        $this->id = $id ?? null;
        $this->hora = $hora ?? '';
        $this->cliente = $cliente ?? '';
        $this->email = $email ?? '';
        $this->telefono = $telefono ?? '';
        $this->servicio = $servicio ?? '';
        $this->precio = $precio ?? '';
    }

}