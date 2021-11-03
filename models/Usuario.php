<?php 

namespace Model;

class Usuario extends ActiveRecord{
    // Base de datos
    protected static $tabla = 'usuarios';

    protected static $columnasDB = ['id','nombre','apellido','email','password','telefono','admin','confirmado','token'];

    public $id;
    public $nombre;
    public $apellido;
    public $email;
    public $password;
    public $telefono;
    public $admin;
    public $confirmado;
    public $token;

    public function __construct($args=[])
    {
        $this->id = $args['id'] ?? null;
        $this->nombre = $args['nombre'] ?? '';
        $this->apellido = $args['apellido'] ?? '';
        $this->email = $args['email'] ?? '';
        $this->password = $args['password'] ?? '';
        $this->telefono = $args['telefono'] ?? '';
        $this->admin = $args['admin'] ?? null;
        $this->confirmado = $args['confirmado'] ?? null;
        $this->token = $args['token'] ?? '';
    }

    // validar
    public function validarNuevaCuenta(){
        if (!$this->nombre){
            self::$alertas['error'][] = 'El nombre es obligatorio';
        }
        if (!$this->apellido){
            self::$alertas['error'][] = 'El apellido es obligatorio';
        }
        if (!$this->email){
            self::$alertas['error'][] = 'El email  es obligatorio';
        }
        if (!$this->telefono){
            self::$alertas['error'][] = 'El telefono  es obligatorio';
        }
        if (!$this->password){
            self::$alertas['error'][] = 'El password  es obligatorio';
        }
        if (strlen($this->password) < 6) {
            self::$alertas['error'][] = 'El password  6 letras/numeros minimo';
        }
        /******************Ajuste mio para password mas fuerte***********************/
        // $passwordString = $this->toString($this->password);
        
        // if(preg_match('`[a-z]`',$passwordString)){
        //     echo 'matched';
        // }else{
        //     echo 'not matched';
        // }


        // $uppercase = preg_match('@[A-Z]@', $passwordString);
        // $lowercase = preg_match('@[a-z]@', $passwordString);
        // $number    = preg_match('@[0-9]@', $passwordString);

        // if(!$uppercase || !$lowercase || !$number || strlen($passwordString) < 8) {
        //     // tell the user something went wrong
        //     self::$alertas['error'][] = 'Password 8 digitos, 1 letra may y una minus obligatoria';
        // }

        return self::$alertas;
    }

    // public function toString($pass){
    //     return $pass;
    // }
}