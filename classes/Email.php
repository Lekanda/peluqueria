<?php 

namespace Classes;

use PHPMailer\PHPMailer\PHPMailer;


class Email{

    public $nombre;
    public $email;
    public $token;


    public function __construct($nombre,$email,$token)
    {
        $this->nombre = $nombre;
        $this->email = $email;
        $this->token = $token;
    }

    

    public function enviarConfirmacion(){
        // Crear el objeto del mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';  
        $mail->SMTPAuth = true; 
        $mail->Port = 2525;
        $mail->Username = '0aa2429c90a0f5';
        $mail->Password = '3f8880e6995f75';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'App salon MVC');
        $mail->Subject = 'Confirma tu cuenta';


        // Set HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has creado tu cuenta en App Salon, solo debes confirmarla presionando el siguiente enlace</p>";
        $contenido .= "<p>Presiona aqui: <a href='http://localhost:5000/confirmar-cuenta?token=" . $this->token ."'>Confirmar Cuenta</a></p>";
        $contenido .= "<p>Sí tu no solicitaste esta cuenta, ignora el mensaje</p>";
        $contenido .= "</html>";
        $mail->Body = $contenido;

        $mail->send();

    }

    public function enviarInstrucciones (){
        // Crear el objeto del mail
        $mail = new PHPMailer();
        $mail->isSMTP();
        $mail->Host = 'smtp.mailtrap.io';  
        $mail->SMTPAuth = true; 
        $mail->Port = 2525;
        $mail->Username = '0aa2429c90a0f5';
        $mail->Password = '3f8880e6995f75';

        $mail->setFrom('cuentas@appsalon.com');
        $mail->addAddress('cuentas@appsalon.com', 'App salon MVC');
        $mail->Subject = 'Reestablece tu password';

        // Set HTML
        $mail->isHTML(true);
        $mail->CharSet = 'UTF-8';

        $contenido = "<html>";
        $contenido .= "<p><strong>Hola " . $this->nombre . "</strong> Has solicitado reestablecer tu contraseña</p>";
        $contenido .= "<p>Presiona aqui: <a href='http://localhost:5000/recuperar?token=" . $this->token ."'>Reestablece contraseña</a></p>";
        $contenido .= "<p>Sí tu no solicitaste esta cuenta, ignora el mensaje</p>";
        $contenido .= "</html>";
        $mail->Body = $contenido;

        $mail->send();

    }
}