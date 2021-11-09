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


// Funcion para saber cuando no hay mas servicios en la misma cita
function esUltimo(string $actual, string $proximo): bool{
    if ($actual !== $proximo) {
        return true;
    } else {
        return false;
    }
}