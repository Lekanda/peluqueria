<?php 

namespace Controllers;

use Classes\Email;
use MVC\Router;
use Model\Usuario;


class LoginController{

    public static function login(Router $router){
        $alertas = [];
        $auth = new Usuario;
        
        if ($_SERVER['REQUEST_METHOD'] === 'POST') {
            $auth = new Usuario($_POST);
            $alertas = $auth->validarLogin();
            if (empty($alertas)) {
                $usuario=Usuario::where('email',$auth->email);
                if($usuario){
                    // Verificar Password
                    if ($usuario->comprobarPasswordAndVerificado($auth->password)) {
                        // autenticar al usuario
                        if(!isset($_SESSION)){ 
                            session_start(); 
                        } 

                        $_SESSION['id'] = $usuario->id;
                        $_SESSION['nombre'] = $usuario->nombre . " " . $usuario->apellido;
                        $_SESSION['email'] = $usuario->email;
                        $_SESSION['login'] = true;


                        // Redireccionar a  

                        if ($usuario->admin === "1") {
                            $_SESSION['admin'] = $usuario->admin ?? null;
                            header('Location: /admin');
                        } else {
                            header('Location: /cita');
                        }
                    }
                    
                } else {
                    // Alerta de usuario incorrecto
                    Usuario::setAlerta('error','Usuario no existe');
                }
            }

        }

        $alertas = Usuario::getAlertas();

        $router->render('auth/login',[
            'alertas' => $alertas,
            'usuario' => $auth
        ]);
    }

    public static function logout(){
        echo 'Desde logout';
    }


    public static function olvide(Router $router){
        
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST' ){
            $auth = new Usuario($_POST);

            $alertas = $auth->validarEmail();

            if (empty($alertas)) {
                
            }
        }

        $router->render('auth/olvide-password',[
            'alertas' => $alertas
        ]);
    }


    public static function recuperar(){
        echo 'Desde recuperar';
    }


    public static function crear(Router $router){

        $usuario = new Usuario;

        // alertas vacias
        $alertas = [];

        if ($_SERVER['REQUEST_METHOD'] === 'POST') {

            $usuario->sincronizar($_POST);
            $alertas = $usuario->validarNuevaCuenta();

            // Revisar que alertas este vacio
            if (empty($alertas)) {
                // Revisar que el usuario no este registrado
                $resultado = $usuario->existeUsuario();

                if ($resultado->num_rows) {
                    // Existe una cuenta
                    $alertas = Usuario::getAlertas();// Usuario no abre otra instancia, coge la misma
                } else {
                    // Hashear el password
                    $usuario->hashPassword();

                    // Generar un token unico
                    $usuario->crearToken();

                    // Enviar el email para confirmar la creacion de cuenta
                    $email = new Email($usuario->nombre,$usuario->email,$usuario->token);
                    $email->enviarConfirmacion();

                    // debuguear($usuario);

                    // Crear el usuario
                    $resultado = $usuario->guardar();
                    if ($resultado) {
                        header('Location: /mensaje');
                    }

                }
            }

        }
        

        $router->render('auth/crear-cuenta',[
            'usuario' => $usuario,
            'alertas' => $alertas
        ]);
    }


    public static function mensaje(Router $router){

        $router->render('auth/mensaje');
    }


    public static function confirmar(Router $router){

        $alertas = [];

        $token = s($_GET['token']);

        $usuario = Usuario::where('token',$token);
        if (empty($usuario)) {
            // Mostrar mensaje de error
            Usuario::setAlerta('error','Token no valido');
        } else {
            // Modificar a usuario confirmado
            $usuario->confirmado = '1';
            $usuario->token = null;
            $usuario->guardar();
            Usuario::setAlerta('exito','Cuenta comprobada correctamente');
        }

        $alertas = Usuario::getAlertas();
        $router->render('auth/confirmar-cuenta',[
            'alertas' => $alertas
        ]);
    }





}