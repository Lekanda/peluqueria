<?php 

require_once __DIR__ . '/../includes/app.php';

use Controllers\AdminController;
use MVC\Router;
use Controllers\APIController;
use Controllers\CitaController;
use Controllers\LoginController;

$router = new Router();

/******** Zona de Logueo, Recuperacion de Pass, Crear cuenta *********/
// Iniciar Sesion
$router->get('/',[LoginController::class, 'login']);
$router->post('/',[LoginController::class, 'login']);
$router->get('/logout',[LoginController::class, 'logout']);
$router->post('/logout',[LoginController::class, 'logout']);

// Recuperar Password si se olvida
$router->get('/olvide',[LoginController::class, 'olvide']);
$router->post('/olvide',[LoginController::class, 'olvide']);
// Pantalla para recuperar el password.
$router->get('/recuperar',[LoginController::class, 'recuperar']);
$router->post('/recuperar',[LoginController::class, 'recuperar']);

// Crear cuenta
$router->get('/crear-cuenta',[LoginController::class, 'crear']);
$router->post('/crear-cuenta',[LoginController::class, 'crear']);

// Confirmar cuenta en el mail
$router->get('/mensaje',[LoginController::class, 'mensaje']);
$router->get('/confirmar-cuenta',[LoginController::class, 'confirmar']);
/**********************************************************************/


/********************* AREA PRIVADA ************************/
$router->get('/cita',[CitaController::class, 'index']);
$router->get('/admin',[AdminController::class, 'index']);
/***********************************************************/


/********************* API CITAS ************************/
$router->get('/api/servicios',[APIController::class, 'index']);
$router->post('/api/citas',[APIController::class, 'guardar']);
/********************************************************/



// Comprueba y valida las rutas, que existan y les asigna las funciones del Controlador
$router->comprobarRutas();