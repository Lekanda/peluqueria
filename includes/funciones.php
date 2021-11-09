<?php

function debuguear($variable) : string {
    echo "<pre>";
    var_dump($variable);
    echo "</pre>";
    exit;
}

// Escapa / Sanitizar el HTML
function s($html) : string {
    $s = htmlspecialchars($html);
    return $s;
}

// Revisa que el usuario esté logueado
function isAuth() : void {
    if(!isset($_SESSION['login'])) {
        header('Location: /');
    } 
}

// Funcion para saber si eres administrador
function isAdmin() : void {
    if(!isset($_SESSION['admin'])) {
        header('Location: /');
    }
}


// Funcion para saber cuando no hay mas servicios en la misma cita para /admin
function esUltimo(string $actual, string $proximo): bool{
    if ($actual !== $proximo) {
        return true;
    } else {
        return false;
    }
}
