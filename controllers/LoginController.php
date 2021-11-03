<?php 

namespace Controllers;

use Classes\Email;
use MVC\Router;
use Model\Usuario;


class LoginController{

    public static function login(Router $router){
        

        $router->render('auth/login',[]);
    }

    public static function logout(){
        echo 'Desde logout';
    }


    public static function olvide(Router $router){
        

        $router->render('auth/olvide-password',[
            
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





}